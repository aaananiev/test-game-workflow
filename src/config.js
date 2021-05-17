const config = {
	"general": {
		basePath: "",
		"name": "St Patricks Celebration",
		"version": "1.0.1",
		"antialias": true,
		// "backgroundColor": "0x1099bb",
		"backgroundColor": "0xe0e0e0",
		"timeScale": 1000,
		"viewName": "#game-canvas",
		"resizeToName" : "body",
		"defaultLanguage": "en",
		"layers":[
			{name:'back', zIndex: 1},
			{name:'backDecor', zIndex: 21},
			{name:'backMain', zIndex: 41},
			// {name:'midMain', zIndex: 61},
			// {name:'topMain', zIndex: 81},
			{name:'frontDecor', zIndex: 101},
			{name:'game', zIndex: 99},
			{name:'flags', zIndex: 110},
			{name:'colouring', zIndex: 111},
			{name:'tooltip', zIndex: 121},
			{name:'top', zIndex: 99999},
		],
		hasLoadingScreen: true,
		//array n -> 1..n
		// {
		//	name: 'component name from mws.components'
		// 	addOn: 'stateName on which to add' -> default is gameLoaded [optional]
		//  toLayer : add component to layer named ...
		// 	zindex: zindex of the component in the layer ( uses pixi.js 5 basic zIndex )
		// 	script: localVersion of scene script ( if missing component will use its default ) [optional]
		//	// -> location -> location of the file
		//	// overwrite -> flag to describe which part of the script should be overwritten ( if partial simlpe component will try to merge local with default version )
		//  options -> additional options for the component [optional]
		// }


		"components": [
			{name: 'game1', options: {toLayer: 'game', zIndex:100}},
			{name: 'game2', options: {toLayer: 'game', zIndex:100}},
			{name: 'game3', options: {toLayer: 'game', zIndex:100}},
			{name: 'mul', options: {toLayer: 'game', zIndex:100}},
			{name: 'OrientationOverlay', options: {toLayer: 'top', zIndex:10000}, script: 'scenes/Orientation/OrientationScript.js'},
			{name: 'Interruption', options: {toLayer: 'top', zIndex:9999}, script: 'scenes/Interruption/InterruptionScript.js'},
			{name: 'Settings', options: {hasAutoplay: false, toLayer: 'tooltip', zIndex:35}},
			{name: 'Info', options: {zIndex: 15, toLayer: 'tooltip'}, script: 'scenes/HTPScript.js'},
			{name: 'logo', options: {toLayer: 'colouring', zIndex:10000}},
			{name: 'EntranceScreen', options: {toLayer: 'frontDecor', zIndex:10000}},
			{name: 'EgressScreen', options: {toLayer: 'tooltip', zIndex:10}},
		],

	},

	"device": {
		"redrawEvent": false,
		// posible values [(p)ortrait,(l)anscape, (a)ny]
		"playOrientation": "l",
		"stageDimensions": {
			"w": 1334,
			"h": 750
		},
		// optional if every device uses the same stageDimensions
		// (p)hone, (t)ablet, (d)estop
		// if device uses global dimensions it could be skiped
		"stageDimensionsPerOrientation": {
			"l": { "w": 1334, "h": 750 },
			"p": { "w": 1334, "h": 750 }
		},
		// optional if every device uses the same play orientation
		// (p)hone, (t)ablet, (d)estop
		// if device uses global orientation it could be skiped
		"orientationPerDevice": {
			"p": "l",
			"t": "a",
			"d": "l"
		},
		"interruption": "MOBILE",
		"restrains": {
			"p": "l",
			"l": "p"
		}
	},

	"currency": {
		countryCode: 'EUR',
		thousand: ',',
		decimal: '.',
		precision: 0,
		pattern: 'cv'
	},

	"audioOptions": {
		"usePerGameMute": false,
		"autoBFX": {
			event: "gameLoaded",
			melody: "background"
		},
		"backgroundFX": {
			"volume": 0.2,
			"source": [
				"sounds/bg.mp3",
				"sounds/bg.ogg"
			],
			"map": {
				"background" : [0, 23667]
			}
		},

		"soundFX" : {
			"volume": 1,
			"source": [
				"sounds/sounds.mp3",
				"sounds/sounds.ogg"
			],
			"map": {
				"info_close": [0, 1000],
				"menu_close": [2000, 1000],
				"menu_open": [4000, 1000],
				"spc_big_win_v1": [6000, 9000],
				"spc_cash_count_LOOP_v1": [16000, 7445],
				"spc_game_1_reveal_v1": [25000, 2000],
				"spc_game_1_reveal_v2": [28000, 2000],
				"spc_game_1_reveal_v3": [31000, 2000],
				"spc_game_1_reveal_v4": [34000, 2000],
				"spc_game_1_win_v1": [37000, 2000],
				"spc_game_2_reveal_v1": [40000, 3000],
				"spc_game_2_reveal_v2": [44000, 3000],
				"spc_game_2_winning_num_v1": [48000, 3000],
				"spc_game_2_winning_num_v2": [52000, 3000],
				"spc_game_3_reveal_v1": [56000, 2000],
				"spc_game_3_reveal_v2": [59000, 2000],
				"spc_multiplier_reveal_x1_v1": [62000, 2000],
				"spc_multiplier_reveal_x3_v1": [65000, 3000],
				"spc_no_win_v1": [69000, 6000],
				"spc_win_v1": [76000, 6000]
			}
		}
	},

	"communication": {
		"postMessageOrigin" : "*",
		"requestType": "application/json;charset=UTF-8"
	},


	"assets": [
		{"id": 'gameJSON', "src": './game.json'},
		{"id": 'loaderFont', "src": 'images/fnt-export.fnt'},
		{"id": 'f.png', "src": 'images/f.png'},
		//------
		{"id": 'wood', "src": 'images/back.jpg', options: {"toLayer":"back"}},
		{"id": 'screenSky', "src": 'images/sky.jpg', options: {"toLayer":"back"}},
		{"id": 'screenG', "src": 'images/grass.png', options: {"toLayer":"back"}},
		{"id": 'screenF', "src": 'images/flags.png', options: {"toLayer":"flags", zIndex: 2}},

		{"id": 'flagGreen', "src": 'images/fl.png'},
		{"id": 'flagWhite', "src": 'images/fl2.png'},
		{"id": 'flagOrange', "src": 'images/fl3.png'},

		{"id": 'welcomeR', "src": 'images/BG_Rainbow.png'},
		{"id": 'welcomeL', "src": 'images/Logo.png'},
		{"id": 'pattern', "src": 'images/patern.png'},
		{"id": 'gameIcons', "src": 'images/icons.json'},
		{"id": 'htpBackground', "src": 'images/HTP_Panel.png'},

		{"id": 'finishFont', "src": 'images/finish-fnt.fnt'},
		{"id": 'gf1', "src": 'images/gf-export.fnt'},
		{"id": 'mainFont', "src": 'images/mainFont.fnt'},
		{"id": 'mainFont2', "src": 'images/mainFont2.fnt'},
		{"id": 'gf2', "src": 'images/gf2-export.fnt'},
		{"id": 'buttons', "src": 'images/buttons.json'},
		{"id": 'texts', "src": 'images/texts.json'},
		{"id": 'settings', "src": 'images/settings.json'},
		{"id": 'interruptionsButton', "src": 'images/resume_button.png'},
		{"id": "orientationOverlay", "src": "images/orientation_overlay.png"},


		{"id": 'finishPanel', "src": 'images/PLI_StP_Asset_37.png'},
		{"id": 'clover', "src": 'images/clover.png'},
		{"id": 'clover2', "src": 'images/clover2.png'},
		{"id": 'blob', "src": 'images/blob.png'},
		{"id": 'glow', "src": 'images/glow.png'},
		{"id": 'grayBlob', "src": 'images/grayBlob.png'},
		{"id": 'g1', "src": 'images/slice1.png'},
		{"id": 'g2', "src": 'images/slice2.png'},
		{"id": 'g3', "src": 'images/slice3.png'},
		{"id": 'htpButton', "src": 'images/HTP_X.png'},
		{"id": 'sparkle', "src": 'images/sparkle.png'},
		{"id": 'dot', "src": 'images/dot.png'}
	]
};

export default config;
