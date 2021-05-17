let zip = require("./simpleZip");
let config = require('./package.json');

(async () => {
  await zip("./releases/"+config.gameFolder+"_"+config.version, "./releases/"+config.gameFolder+"_"+config.version+".zip");
})();