const WebpackShellPlugin = require('./WebpackShellPlugin');
var path = require("path");
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let projectContext = __dirname + '/src';
// blah - we cannot use dynamic path :(
import cfg from './src/config.js';
let config = require('./package.json');

if(!!cfg.general && !!cfg.general.components){
  let componentsDetails = cfg.general.components;
  for( let i in componentsDetails) {
     if (componentsDetails.hasOwnProperty(i)) {
      let component = cfg.general.components[i];
      // in order to load our custom scripts we use require ( at the moment there is no way to use dynamic imports in ES6 )
      if(!!component.script) {
        cfg.general.components[i].loadedScript = require(projectContext+'/'+component.script).default;
      }
     }
  }
}

module.exports = (env, options) => {
  let currentMode = options.mode || 'development';

  let isProduction = false;
  if(currentMode != 'development'){
    isProduction = true;
  }

  let language = '';

  let executeOrder66 = false;
  if(env && 'order' in env) {
    executeOrder66 = env.order == 66;
  }
  if(env && 'lang' in env) {
    language = env.lang || '';
  }
  let outputPath = __dirname + '/dist/'; // + config.gameFolder + '-release'
  var releaseFolder =  __dirname + '/releases/' + config.gameFolder + '_' + config.version;

  if(language != '') {
    outputPath = outputPath + '-' + language;
  }


  let plugins = [];

  // clean specific tasks
  plugins.push(new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        verbose:  true,
        dry:      false,
        cleanOnceBeforeBuildPatterns: [
          outputPath,
          releaseFolder + '/build/app.js',
          __dirname + '/dist/app.js',
          __dirname + '/dist/game.json',
        ]
  }));

  // global instance of PIXI js ( v5 does not have it but most of the plugins requires it)
  plugins.push( new webpack.ProvidePlugin({
    PIXI: 'pixi.js-legacy'
  }));

  // enviroment variables
  plugins.push( new webpack.EnvironmentPlugin({
    CFG_DATA: cfg,
    MWS_VERSION: '1',
    MODE: currentMode,
    gameLANG: language,
    MWS_ORDER_66: executeOrder66
  }));

  // adds live reload
  plugins.push(new LiveReloadPlugin({
    protocol: 'hhtp',
    port: '35729',
    hostname: '127.0.0.1'
  }));

 let moduleRules = {
    rules: [{
      test: /\.js$/,
      // exclude: /(node_modules|bower_components)((?!\/mws).*)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ["@babel/plugin-transform-modules-commonjs"]
        }
      }
    }]
  };

  if(isProduction) {
    moduleRules.rules[0].use.options.plugins.push("transform-remove-console");
  }


  // copy assets
  plugins.push( new CopyWebpackPlugin({
      patterns:[
        {from: 'images/**/*', to: './', globOptions:{ignore: ['images/lang/**/*']}},
        {from: 'scenarios/**/*', to: './'},
        // {from: 'images/lang/' + language + '/**/*', to: './', transformPath(targePath, absolutePath) {
        //     let newPath = targePath.replace(`lang\\${language}\\`, '');
        //     newPath = newPath.replace(`lang\/${language}\/`, '');
        //     return newPath;
        // }, force: true},
        {from: 'sounds/**/*', to: './'},
        {from: 'styles/**/*', to: './'},
        // {from: 'i18n/**/*', to: './'},
        {from: 'game.json'},
        // {from: 'manifest.json'}
        {from: 'manifest.json', noErrorOnMissing: true}
  ], options: { concurrency: 50 }}));

  plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
      bundleName: config.gameFolder+'.min.js',
      inject: false,
      filename: 'body.html',
      template: __dirname+'/tpl/body.html'
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      title: config.gameFolder,
      filename: 'head.html',
      inject: false,
      template: __dirname+'/tpl/head.html'
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      production: isProduction,
      bundleName: config.gameFolder+'.min.js',
      filename: 'index.html',
      inject: false,
      template: __dirname+'/tpl/index.html'
  }));

  // adds shell plugin
  if(env && env.release=='true'){
    plugins.push(new WebpackShellPlugin({
      onBuildStart:['echo "Webpack Start"', 'node manifest.js > ./src/manifest.json'],
      onBuildEnd:['node package.js > ./src/package.json', 'webpack -p --config release.babel.js']}));
  }

  return {
    mode: currentMode,
    context: projectContext, // `__dirname` is root of project and `/src` is source
    devtool: 'cheap-module-source-map',
    node: {
      // prevent webpack from injecting useless setImmediate polyfill because Vue
      // source contains it (although only uses it if it's native).
      setImmediate: false,
      // prevent webpack from injecting mocks to Node native modules
      // that does not make sense for the client
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
      // prevent webpack from injecting eval / new Function through global polyfill
      global: false
    },
    entry: {
      app: './main.js',
    },
    output: {
      path: outputPath, // `/dist` is the destination
      filename: config.gameFolder+'.min.js', // bundle created by webpack it will contain all our app logic. we will link to this .js file from our html page.
    },
    module: moduleRules,
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            mangle: true,
            warnings: false,
            drop_console: true,
          },
          include: /\.js$/,
          sourceMap: true,
          extractComments: 'all'
        })
      ]
    },
    plugins: plugins,
    resolve: {
      modules: [path.resolve('./node_modules'), path.resolve('./src')],
      extensions: ['.json', '.js', '.jsx']
    }
  };
}