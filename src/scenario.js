import Memory from 'mws/primitives/Memory.js';
import Utils from 'mws/primitives/Utils.js';
import Random from 'mws/primitives/Random.js';
import EventBus from 'mws/primitives/Emitter.js';
import reference from './reference.js';


class Scenario {
	constructor() {
		this.assetId = 'loaded_scenarioFile'
		this.scenario = null;
		EventBus.on('loadProgress', () => {
			this.processScenario();
		}, this);

		EventBus.once('gameLoaded', () => {
			EventBus.off('loadProgress', this)
			Memory.push(this.assetId, null, true, true);
		});
	}

	processScenario() {
		let systemTier = Memory.retrive('tier');
		let systemSeed = Memory.retrive('seed');
		// load only first instance of scenario
		if(!this.scenario && Memory.exist(this.assetId)) {
			let all = Memory.retrive(this.assetId);
			if(!!all && !(all instanceof Array)) {
				all = all.data;
			}
			{
				var scenarioIndex = Utils.clamp(systemSeed,0,all.length - 1);
				this.scenario = all[scenarioIndex];
				if (!this.scenario) {
					throw Error('Scenario not found!');
				}else{
					EventBus.emit('scenarioLoaded');
				}
			}
		}
	}

	scenarioFileName() {
		let systemTier = Memory.retrive('tier');
		let systemSeed = Memory.retrive('seed');
		if (!reference[systemTier]) {
			systemTier = -1;
		}
		var tierFileIndex = Utils.clamp(systemSeed,0,reference[systemTier]-1);

		return `scenarios/tier${systemTier}x${tierFileIndex}.json`;
	}

	totalValue() {
		let reward = this.scenario.prizeTotal;
		if (reward > 0 ) {
			return reward;
		} else {
			return -1;
		}
	}

	getBoard(index) {
		if(!isNaN(index)){
			return this.scenario.layout[index];
		} else{
			return this.scenario.layout;
		}
	}

	game1(){
		let data = this.getBoard(0)[0];
		return data;
	}

	game2(){
		let data = this.getBoard(1);
		return data;
	}

	game3(){
		let data = this.getBoard(2);
		return data;
	}

	triplier(){
		return this.scenario.hasTripler;
	}

}

let scenarioManager = new Scenario();

export default scenarioManager;