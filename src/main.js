// temporary fix for pixi-projection due to lack of pixi5 support.
if(process.env.MODE !== 'production' || process.env.MWS_ORDER_66) {
	window.PIXI = PIXI || {};
	window.PIXI.TransformStatic = PIXI.Transform; 
	window.PIXI.WebGLRenderer = window.PIXI.Renderer;
}

require('pixi-spine');
PIXI.particles = require('pixi-particles');

import { install } from '@pixi/unsafe-eval';
// Apply the patch to PIXI
install(PIXI);

let MWS = require('mws');
let components = require('mws.components');

window.mws = MWS;
window.components = components;
// we add game custom component
window.components.EntranceScreen = require('./scenes/Entrance/Entrance.js').Entrance;
window.components.logo = require('./scenes/Logo/Logo.js').Logo;
window.components.EgressScreen = require('./scenes/Egress/Egress.js').Egress;
window.components.game1 = require('./scenes/game1/Game1.js').Game1;
window.components.game2 = require('./scenes/game2/Game2.js').Game2;
window.components.game3 = require('./scenes/game3/Game3.js').Game3;
window.components.mul = require('./scenes/multiplier/multiplier.js').multiplierScene;

require('./Helpers.js');
let ApiLogic = require('./Api.js');
import scenario from './scenario.js';
import customIdle from './scenes/customIdle.js';
import Cloth from './scenes/Cloth.js';

var meshRegister = [];
var mesh;
var canvas;

let cloth;


let opts = {
  gravity: 150,
  friction: 0.99,
  bounce: 0.15,
  pointsX: 12,
  pointsY: 11,
  renderCloth: true,
  pinCorners: true,
};

window.addEventListener('load', () => {
	// in order to force first interruption we need to be on focus !!!
	window.focus();
	// we retrieve config values before scenario is loaded
	mws.Api.rawConfig();
	let assets = MWS.Memory.retrive('assets');
	if(!!assets) {
		assets.push({id: "scenarioFile", src: scenario.scenarioFileName()});
		MWS.Memory.push('assets', assets, true, true); 
	}

	let game = new MWS.Game();
	game.isCompleted = false;
	game.lockTime = 1200;

	mws.Utils.delayedExecution(() => {
		game.app.view.style.opacity = 1;
	},75);

	window.game = game;
	game.customIdle = new customIdle();
	game.scenario = scenario;
	game.onEnterPresented(() => {
		//Initiate the API
		let seed = +mws.Memory.retrive('seed') || mws.Utils.getRandomInt(0,Math.pow(10,10));
		let tier = +mws.Memory.retrive('tier');
		if (isNaN(tier) || tier < 0) {
			tier = null;
		}
		let gameMode = mws.Memory.retrive('mode');

		game.api = new mws.Api(seed,tier,gameMode);
		game.api.scenario = scenario;
		game.api.retriveRawConfig();
		game.api.initSettings();

		let tl = new MWS.Elementary({align:'BC',parent:game.layers.game, type:3, name: 'pattern', interactive: false, otherOptions: { width: 1334, height: 750}});
		tl.zIndex = 2;
		tl.alpha = 0;

		game.layers.colouring.interactive = false;
		game.layers.colouring.interactiveChildren = false;

		game.layers.flags.interactive = false;
		game.layers.flags.interactiveChildren = false;

		game.components.Settings.visible = false;
		game.components.Settings.alpha = 0;

		game.totalClickObject = new mws.simpleCountEmiter(19, 'completedGame');

		if (mws.Utils.oneFromURL('debug') === 'true') {
			window.hitCreator = mws.DevHelpers.MakePolygonDrawer();
		}

		let texture = PIXI.utils.TextureCache['images/fl.png'];
		let texture2 = PIXI.utils.TextureCache['images/fl2.png'];
		let texture3 = PIXI.utils.TextureCache['images/fl3.png'];

		var cloth = new Cloth(opts.pointsX-1, opts.pointsY-1, !opts.pinCorners);

		let flagPoints = [
			{x:30, y:64},
			{x:860, y:25},
			{x:190, y:44},
			{x:1025, y:44},
			{x:354, y:25},
			{x:1185, y:64},
		];

		let flagTexture = [
			texture,
			texture,
			texture2,
			texture2,
			texture3,		
			texture3		
		]

		let flagContainer = new MWS.Elementary();
		game.layers.flags.add(flagContainer);
		flagContainer.x = 57;
		flagContainer.y = 45;

		let flagPosition = 0;
		for(let i = 0; i < flagPoints.length; i++) {
			let flag = new PIXI.SimplePlane(flagTexture[i], opts.pointsX, opts.points);
			flag.pivot.x = 53.5;
			flag.pivot.y = 54.5;
			flag.rotation = -7 * Math.PI / 180;
			if (i % 2) {
				flag.rotation = flag.rotation * -1;
			}
			flag.x = flagPoints[i].x;
			flag.y = flagPoints[i].y;
			flagContainer.add(flag);
			cloth.addMesh(flag);
		}

		game.winLine = new TimelineMax();
		game.winLine.paused(true);
		// game.winLine.delay(0 + this.pulseCount * (this.singleIdle + this.idleAniamtion) * game);
		game.winLine.repeatDelay(1000);
		game.winLine.repeat(-1);
		game.winLine.add('begining', "+=0");

		mws.EventBus.addListeners({
			'playButtonClick': () => {
				let tween7 = new MWS.Effect({
					'target': tl,
					'script': 'd#750%a#1,d#550',
					'isPaused': false
				});
				mws.Manager.setIdleTickerInterval(3000);
				mws.EventBus.emit('restartIdleTicker');
				mws.EventBus.emit('gameStarted');
			},
			'exitWelcomeScreen':  function() {
				mws.EventBus.emit('gameEnter');
			},
			'completedGame': function(){
				mws.Utils.delayedExecution(() => {
					mws.EventBus.emit('showFinish');
				}, 2500)
			}
		}, this);
	});
});