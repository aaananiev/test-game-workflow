let config = require('./package.json');
let manifestObj = {};
let generationDate = new Date();

manifestObj.name = config.name;
manifestObj.version = config.version
manifestObj.date = generationDate.toUTCString();
manifestObj.authors = ["Mobile Wave Solutions Ltd."];
manifestObj.copyright = "(c) Camelot Global, all rights reserved";

console.log(JSON.stringify(manifestObj, null, "\t"));
