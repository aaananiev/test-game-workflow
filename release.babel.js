const WebpackShellPlugin = require('./WebpackShellPlugin');
var path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

let config = require('./package.json');

module.exports = (env, options) => {

  var releaseFolder =  __dirname + '/releases/' + config.gameFolder + '_' + config.version;
  return {
    context: __dirname,
    entry: {
      app: './release.js',
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        verbose:  true,
        dry:      false,
        cleanOnceBeforeBuildPatterns: [
          releaseFolder,
          releaseFolder + '.zip',
          releaseFolder + '/build/app.js',
          releaseFolder + '/build/game.json',
          __dirname + '/dist/app.js',
        ]
      }),
      new CopyWebpackPlugin(
      {
        patterns:[
          {context: __dirname + '/dist/', from: __dirname + '/dist/**/*', to: releaseFolder + '/build/'+config.gameFolder+ '-release', toType: 'dir', globOptions: {ignore: ['*.map', '*.LICENSE']}, force: true},
          {context: __dirname + '/src/', from:'./**/*', to: releaseFolder + '/source/' , toType: 'dir'},
          {context: __dirname + '/docs/',from: './**/*', to: releaseFolder, toType: 'dir'}
        ],
        options: { concurrency: 50 }
      }),
      new WebpackShellPlugin({onBuildStart:['echo "Webpack Release"'], onBuildEnd:['rm ./dist/app.js & node zip-build.js', 'rm ./src/package.json', 'rm ./src/manifest.json']})
    ]
  };
}
