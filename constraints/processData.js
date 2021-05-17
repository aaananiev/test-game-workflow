/**
 * This script is responsible for processing raw data and generating the constraints results
 */

const fs = require('fs');
const readline = require('readline');
let magici = 0;
let wrong = [];
let magici2 = 0;
let magici3 = 0;
///// CONFIGURATION ///////////////////////////////////////////////////////////////////////////////

const INPUT_FILE = './rawData.jsonl';
const OUTPUT_FILE = './results.json';

///////////////////////////////////////////////////////////////////////////////////////////////////

const inputFile = fs.createReadStream(INPUT_FILE);
const lineReader = readline.createInterface({
    input: inputFile
});

const count = str => (str.match(/[aeiou]/gi) || []).length;
const count2 = str => (str.match(/[7]/gi) || []).length;

const check1 = str => ( (str.match(/[doubler]/gi) || []).length == 7);
const check2 = str => ( (str.match(/[locker]/gi) || []).length == 6);
const check3 = str => ( (str.match(/[prize]/gi) || []).length == 5);
const check4 = str => ( (str.match(/[7]/gi) || []).length == 4);



console.log('processing constraints data -> ' + INPUT_FILE);

var linesProcessed = 0;
var results = {};

function range(start, stop, step) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
}

lineReader.on('line', function (line) 
{
    if (linesProcessed % 10000 == 0) {
        console.log('linesProcessed: ' + linesProcessed);
    }

    line = JSON.parse(line);
    
    runConstraints(line.tier, line.ticket);
    
    linesProcessed++;
});

lineReader.on('close', function (line) 
{
    console.log( magici + ' <-> ' + magici2);
    console.log( ' last bonus letter <-> ' + magici3);
    console.log( JSON.stringify(wrong));
    console.log('linesProcessed: ' + linesProcessed);
    console.log('processing finished');

    results.ticketsProcessed = linesProcessed;

    fs.writeFile(OUTPUT_FILE, JSON.stringify(results), 'utf8', () => { console.log('results written to disk -> ' + OUTPUT_FILE); } );  
});

/**
 * These are the main constraints tests
 */
function runConstraints(tierId, ticket)
{

    // The word grid must contain a min. of 20 and max. of 23 words
    var counterId = 'numWordsPerTicket';

    addProperty(results, counterId);
    addProperty(results[counterId], 'total');
    
    initCounterObject(results[counterId], tierId, [19,20,21,22,23,24]);
    incrementCounter(results[counterId][tierId], ticket.boards[0]["words"].length);
    incrementCounter(results[counterId].total, ticket.boards[0]["words"].length);

    let hasBonus = ticket.boards[0]["matched"].indexOf('bonus') != -1;

    let all = ticket.boards[1].turns.join();


    addProperty(results, 'matched');
    addProperty(results.matched, 'total');
    initCounterObject(results.matched, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    incrementCounter(results.matched[tierId], ticket.boards[0]["matched"].length);
    incrementCounter(results.matched.total, ticket.boards[0]["matched"].length);

    if(ticket.boards[0]["matched"].length == 0){
        console.log(ticket);
        process.exit(1);
    }


    // Word lengths can range from 3 to 8 letters
    var counterId = 'numWordSizePerTicket';
    addProperty(results, counterId);
    addProperty(results[counterId], 'total');
    
    //- The word BONUS must appear on every grid
    var counterId2 = 'bonusPerTicket';
    addProperty(results, counterId2);
    addProperty(results[counterId2], 'total');

    initCounterObject(results[counterId2], tierId, [0,1,2]);
    // no chance for two bonus words in the grid ?!
    incrementCounter(results[counterId2][tierId], 1);

    let regEX = new RegExp('['+ticket.boards[0]["letters"]+']', 'igm');
    let cnt = 0;
    let zz = {
            'a':0,
            'b':0,
            'c':0,
            'd':0,
            'e':0,
            'f':0,
            'g':0,
            'h':0,
            'i':0,
            'j':0,
            'k':0,
            'l':0,
            'm':0,
            'n':0,
            'o':0,
            'p':0,
            'q':0,
            'r':0,
            's':0,
            't':0,
            'u':0,
            'v':0,
            'w':0,
            'x':0,
            'y':0,
            'z':0};


    addProperty(results, 'numWord3PerTicket');
    addProperty(results.numWord3PerTicket, 'total');

    addProperty(results, 'numWord4PerTicket');
    addProperty(results.numWord4PerTicket, 'total');

    addProperty(results, 'numWord5PerTicket');
    addProperty(results.numWord5PerTicket, 'total');

    addProperty(results, 'numWord6PerTicket');
    addProperty(results.numWord6PerTicket, 'total');

    addProperty(results, 'numWord7PerTicket');
    addProperty(results.numWord7PerTicket, 'total');

    addProperty(results, 'numWord8PerTicket');
    addProperty(results.numWord8PerTicket, 'total');

    addProperty(results, 'numWord7n8PerTicket');
    addProperty(results.numWord7n8PerTicket, 'total');

    let mySize = {
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
    };
    for(let word of ticket.boards[0]["words"]) {

        let z = word.w.replace(regEX, '');
        if(z.length === 1){
            cnt++;
            zz[z]++;
        }
        // initCounterObject(results[counterId], tierId, [0,1,2,3,4,5,6,7]);
        initCounterObject(results[counterId], tierId, [2,3,4,5,6,7,8,9]);
        incrementCounter(results[counterId][tierId], word.w.length);
        incrementCounter(results[counterId].total, word.w.length); //??

        mySize[word.w.length]++;
    }

    initCounterObject(results.numWord3PerTicket, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
    incrementCounter(results.numWord3PerTicket[tierId], mySize[3]);
    incrementCounter(results.numWord3PerTicket.total, mySize[3]);

    initCounterObject(results.numWord4PerTicket, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
    incrementCounter(results.numWord4PerTicket[tierId], mySize[4]);
    incrementCounter(results.numWord4PerTicket.total, mySize[4]);


    initCounterObject(results.numWord5PerTicket, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
    incrementCounter(results.numWord5PerTicket[tierId], mySize[5]);
    incrementCounter(results.numWord5PerTicket.total, mySize[5]);

    initCounterObject(results.numWord6PerTicket, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
    incrementCounter(results.numWord6PerTicket[tierId], mySize[6]);
    incrementCounter(results.numWord6PerTicket.total, mySize[6]);

    initCounterObject(results.numWord7PerTicket, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
    incrementCounter(results.numWord7PerTicket[tierId], mySize[7]);
    incrementCounter(results.numWord7PerTicket.total, mySize[7]);

    initCounterObject(results.numWord8PerTicket, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
    incrementCounter(results.numWord8PerTicket[tierId], mySize[8]);
    incrementCounter(results.numWord8PerTicket.total, mySize[8]);

    initCounterObject(results.numWord7n8PerTicket, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
    incrementCounter(results.numWord7n8PerTicket[tierId], mySize[8] + mySize[7]);


    addProperty(results, 'almostFilled');
    addProperty(results.almostFilled, 'total');
    initCounterObject(results.almostFilled, tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
    incrementCounter(results.almostFilled[tierId], cnt);
    incrementCounter(results.almostFilled.total, cnt);

    // - There must be a min. of 3 vowels revealed in any completed game
    var counterId = 'vowelsPerTicket';
    addProperty(results, counterId);
    addProperty(results[counterId], 'total');
    initCounterObject(results[counterId], tierId, [0,1,2,3,4,5]);
    incrementCounter(results[counterId][tierId], count(ticket.boards[0]["letters"]));
    incrementCounter(results[counterId].total, count(ticket.boards[0]["letters"]));
    

    // count instances of each symbol on screen
    var counterId = 'letterIdsPerTier';
    addProperty(results, counterId);
    addProperty(results[counterId], 'total');
    const mainAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let mm = 0;
    addProperty(results, 'almostFilledPerLetters');




    let lastBLetter = [];

    lastBLetter.push(ticket.boards[0]["letters"].indexOf('b'));
    lastBLetter.push(ticket.boards[0]["letters"].indexOf('o'));
    lastBLetter.push(ticket.boards[0]["letters"].indexOf('n'));
    lastBLetter.push(ticket.boards[0]["letters"].indexOf('u'));
    lastBLetter.push(ticket.boards[0]["letters"].indexOf('s'));

    lastBLetter.sort(function(a, b) {if( a > b){ return 1; }else{ return -1} });
    let lbb = lastBLetter.pop();
    if( lbb > 16 ) {
        magici3++;
    }

    for(let char of mainAlphabet) {
        addProperty(results.letterIdsPerTier, char);
        initCounterObject(results[counterId], char, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);

        addProperty(results.almostFilledPerLetters, char+''+tierId);
        initCounterObject(results.almostFilledPerLetters, char+''+tierId, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
        setPropCounter(results.almostFilledPerLetters[char+''+tierId], "1");
        setPropCounter(results.almostFilledPerLetters[char+''+tierId], "2");
        setPropCounter(results.almostFilledPerLetters[char+''+tierId], "3");
        setPropCounter(results.almostFilledPerLetters[char+''+tierId], "4");
        setPropCounter(results.almostFilledPerLetters[char+''+tierId], "5");
        setPropCounter(results.almostFilledPerLetters[char+''+tierId], "6");
        setPropCounter(results.almostFilledPerLetters[char+''+tierId], "7");
        setPropCounter(results.almostFilledPerLetters[char+''+tierId], "8");

        let index = ticket.boards[0]["letters"].indexOf(char);
        if( index != -1) {
            incrementCounter(results[counterId][char], index + 1);
            incrementCounter(results[counterId].total, index + 1);

        }else{
            if(zz[char] > 0) {
                incrementCounter(results.almostFilledPerLetters[char+''+tierId], zz[char]);
            }
        }
    }

    // bonus game
    //----



    // star count 
    var counterId = 'stars';
    addProperty(results, counterId);
    addNumeric(results, 'totalWin');
    addNumeric(results, 'totalLose');

    addProperty(results, 'onWin');
    addNumeric(results.onWin, 'hasBonus');
    addProperty(results, 'onLose');
    addNumeric(results.onLose, 'hasBonus');


    addNumeric(results.onWin, 'doubler');
    addNumeric(results.onLose, 'doubler');

    addNumeric(results.onWin, 'locker');
    addNumeric(results.onLose, 'locker');

    addNumeric(results.onWin, 'prize');
    addNumeric(results.onLose, 'prize');

    addNumeric(results.onWin, 'letter');
    addNumeric(results.onLose, 'letter');

    addNumeric(results.onWin, 'total');
    addNumeric(results.onLose, 'total');

    addProperty(results[counterId], 'total');


    initCounterObject(results[counterId], 'doubler', [0,1,2,3,4,5]);
    initCounterObject(results[counterId], 'locker', [0,1,2,3,4,5]);
    initCounterObject(results[counterId], 'prize', [0,1,2,3,4,5]);
    initCounterObject(results[counterId], 'letter', [0,1,2,3,4,5]);


    if(ticket.prizeTotal !="U") {
        incrementCounter(results, 'totalWin');
        if(hasBonus){
            incrementCounter(results.onWin, 'hasBonus');
        }
    }else{
        incrementCounter(results, 'totalLose');
        if(hasBonus){
            incrementCounter(results.onLose, 'hasBonus');
        }
    }


    if(hasBonus) {
        if(check1(all)) {
            incrementCounter(results[counterId]['doubler'], count2(all));
            if(ticket.prizeTotal !="U") {
                incrementCounter(results.onWin, 'doubler');
                incrementCounter(results.onWin, 'total');
            } else {
                incrementCounter(results.onLose, 'doubler');
                incrementCounter(results.onLose, 'total');
            }
        }
        if(check2(all)) {
            incrementCounter(results[counterId]['locker'], count2(all));
            if(ticket.prizeTotal !="U") {
                incrementCounter(results.onWin, 'locker');
                incrementCounter(results.onWin, 'total');
            } else {
                incrementCounter(results.onLose, 'locker');
                incrementCounter(results.onLose, 'total');
            }
        }
        if(check3(all)) {
            incrementCounter(results[counterId]['prize'], count2(all));
            if(ticket.prizeTotal !="U") {
                incrementCounter(results.onWin, 'prize');
                incrementCounter(results.onWin, 'total');
            } else {
                incrementCounter(results.onLose, 'prize');
                incrementCounter(results.onLose, 'total');
            }
        }

        if(check4(all)) {

            if(ticket.boards[0]["letters"].length != 19){
                magici2++;
                wrong.push(ticket.boards[0]["letters"]);

            }

            incrementCounter(results[counterId]['letter'], count2(all));
            if(ticket.prizeTotal !="U") {
                incrementCounter(results.onWin, 'letter');
                incrementCounter(results.onWin, 'total');
            }else{
                incrementCounter(results.onLose, 'letter');
                incrementCounter(results.onLose, 'total');
            }
        }

        incrementCounter(results[counterId].total, count2(all));

    }
    
    


    var counterId = 'winOnPanel';
    addProperty(results, counterId);
    let panels = [0,1,2,3,4];
    let line = '';

    addProperty(results, 'panelStars');
    addProperty(results.panelStars, 'total');
    initCounterObject(results.panelStars, tierId, [0,1,2,3,4,5]);

    if (hasBonus) {
        for (let panel of panels) {
            incrementCounter(results.panelStars[tierId], count2(ticket.boards[1].turns[panel].join()));
            incrementCounter(results.panelStars.total, count2(ticket.boards[1].turns[panel].join()));
        }
    }

    for(let panel of panels) {
        addNumeric(results[counterId], panel);
        line = line.concat(ticket.boards[1].turns[panel]);
        if(hasBonus === true && (check1(line) || check2(line) || check3(line) || check4(line))){
            incrementCounter(results[counterId], panel);
            break;
        }
    }




}

/**
 * Adds property to object if it does not exist
 */
function addProperty(obj, name)
{
    if (!obj.hasOwnProperty(name)) {
        obj[name] = {};
    }
}

function addNumeric(obj, name)
{
    if (!obj.hasOwnProperty(name)) {
        obj[name] = 0;
    }
}

/**
 * This function creates a counter sub-object from a set of predetermined keys
 * Initial values for all keys are set to 0
 * 
 * @param {object} parent - parent object name
 * @param {string} name - child object name
 * @param {*} keysArray - array of objects to use as keys e.g. [1,2,3,'foo']
 */
function initCounterObject(parent, name, keysArray) 
{
    if (parent && parent.hasOwnProperty(name)) return;

    let obj = {};
    for (const key of keysArray) {
        obj[key] = 0;
    }
    parent[name] = obj;
}

/** 
 * Increments name in counter object
 * Creates name with 0 value if not found
 */
function incrementCounter(counter, name) 
{
    setPropCounter(counter, name);
    counter[name]++;
}

function setPropCounter(counter, name) 
{
    if (!counter.hasOwnProperty(name)) {
        counter[name] = 0;
    }
}


