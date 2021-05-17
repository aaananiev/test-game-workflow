let config = require('./package.json');
let manifestObj = {};
let generationDate = new Date();

manifestObj.name = config.name;
manifestObj.gameFolder = config.gameFolder;
manifestObj.version = config.version;
manifestObj.main = "";
manifestObj.description = config.description;
manifestObj.scripts = {
	"test": "echo \"Error: no test specified\" && exit 1"
};
manifestObj.authors = ["Mobile Wave Solutions Ltd."];
manifestObj.copyright = "(c) Camelot Global, all rights reserved";
manifestObj.config = {};
manifestObj.config.gameName = manifestObj.name;
manifestObj.config.gameDescription = manifestObj.description;
manifestObj.config.gameVersion = manifestObj.version;
manifestObj.config.url = "www.mobilewaves.com";
manifestObj.config["gitlab-repository"] = "git@gitlab.camelot.global:ctp-iwg-frontend/cashword-bonanza.git";
manifestObj.config.languages = ["en"]

console.log(JSON.stringify(manifestObj, null, "\t"));
