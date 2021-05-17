/**
 * This script is responsible for generating raw ticket data and validating each result
 * Once the data has been generated run constraints.js to process it
 
 * Note that this script must be run with esm i.e. 'node -r esm collectData.js'
 * This allows us to import ES6 modules from the game but may have consequences passing scope
 */

const fs = require('fs');
const crypto = require ('crypto');

///// CONFIGURATION ///////////////////////////////////////////////////////////////////////////////

const NUM_TIERS = 21;
const SEEDS_PER_TIER = 10000;
const OUTPUT_FILE = './rawData.jsonl';

///// MWS ENVIRONMENT /////////////////////////////////////////////////////////////////////////////
GLOBAL.mws = {};

import random from 'mws/primitives/Random.js';
mws.Random = random;
import EventBus from 'mws/primitives/Emitter.js';
import Memory from 'mws/primitives/Memory.js';

import scenario from '../src/scenario.js';
mws.Memory = Memory;
// import {, Random, EventBus} from 'mws';

///////////////////////////////////////////////////////////////////////////////////////////////////

processData();

/**
 * The main test loop
 */
function processData() 
{
    var rawData = fs.createWriteStream(OUTPUT_FILE);

    console.log('Collecting and validating data - numTiers: ' + NUM_TIERS + ' runsPerTier: ' + SEEDS_PER_TIER);

    for (var tierId = 0; tierId < NUM_TIERS; tierId++) 
    {
        console.log('processing tier: ' + tierId);
        Memory.push('tier', tierId, true, true);
        for (var i = 0; i < SEEDS_PER_TIER; i++) 
        {
            // generate a random seed and reset the randomizer
            var seed = randomSeed();
            random.setSeed(seed);
            Memory.push('seed', seed, true, true); 
            let asset = require('../src/'+scenario.scenarioFileName());
            Memory.push('loaded_scenarioFile', asset, true, true); 
            scenario.processScenario();
            var entry = JSON.stringify({
                tier: tierId,
                run: i + 1,
                seed: seed,
                ticket: scenario.scenario
            });
            rawData.write(entry + '\n');
            scenario.scenario = null;
        }
    }

    console.log('data collection finished');
    rawData.end( () => {console.log('rawData written to disk: ' + OUTPUT_FILE);} );
}

/**
 * generates a random 32bit Integer using the crypto module
 */
function randomSeed() 
{
    var buffer = crypto.randomBytes(4);
    var hex = buffer.toString('hex');
    var int32 = parseInt(hex, 16);
    return int32;
}
