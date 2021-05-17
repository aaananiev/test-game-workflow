'use strict';

var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}

function WebpackShellPlugin(options) {
  var defaultOptions = {
    onBuildStart: [],
    onBuildEnd: []
  };
  this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function(compiler) {
  const options = this.options;
  compiler.hooks.compilation.tap('WebpackShellPlugin', (compilation) => {
    if(options.onBuildStart.length){
        options.onBuildStart.forEach(script => exec(script, puts));
    }
  });

  compiler.hooks.emit.tapAsync('WebpackShellPlugin', (compilation, callback) => {
    if(options.onBuildEnd.length){
        options.onBuildEnd.forEach(script => exec(script, puts));
    }
    callback();
  });
};

module.exports = WebpackShellPlugin;