let script = {
	main : {
		align: 'C',
		spiritName: 'game3Extended',
		scale: 0,
		orbital: {x: 898, y: 220},
		interractionLayer: {
			color: 0x000,
			alpha: 0.001
		}
	},
	quarks : {
		back:{
			zIndex: 100,
			groupName: 'DOM',
			textureName: 'g3',
			alpha: 1,
		},

		DOM: {
			interactive: false,
			zIndex: 200,
			effects: {
				onEnter :'%a#1,d#1;ec#introAnimation'
			}
		},

		symbolHolder:{
			groupName: 'DOM',
			zIndex: 10,
			orbital: {x:102, y:-47 + 102},
		},

		symbol: {
			interactive: false,
			interactiveChildren: false,
			align: 'C',
			groupName: 'symbolHolder',
			textureName: "dummy",
			zIndex: 49,
			alpha: 1,
			iterationOptions: {
				props: [
					{x:11,y:10},
					{x:168,y:10},
					{x:11,y:144},
					{x:168,y:144}
				]
			}
		},


		blobs:{
			interactive: false,
			interactiveChildren: false,
			align:'C',
			zIndex: 50,
			groupName: 'symbolHolder',
			textureName: "grayBlob",
			tint: 0xffffcc,
			alpha: 0.55,
			scale: 0,
			iterationOptions: {
				props: [
					{x:10,y:11},
					{x:167,y:11},
					{x:10,y:145},
					{x:167,y:145}
				]
			}
		},


		cover: {
			align: 'C',
			groupName: 'symbolHolder',
			textureName: "rainbow.png",
			alpha: 1,
			hitArea: [-46, -7, -43, -36, -28, -45, -7, -33, 10, -11, 18, 11, 22, 19, 27, 27, 32, 19, 44, 19, 63, 25, 61, 34, 44, 40, 29, 42, 13, 40, 7, 38, -0, 42, -15, 42, -29, 43, -36, 34, -42, 31, -27, 28, -17, 24, -24, 5, -32, 2, -43, 4, -56, 3, -66, 1],
			iterationOptions: {
				props: [
					{x:10,y:0},
					{x:167,y:0},
					{x:10,y:134},
					{x:167,y:134}
				]
			}
		},

		buttonHolder:{
			groupName: 'DOM',
			zIndex: 20,
			orbital: {x:48 + 62, y:-47 + 136 + 27},
		},

		buttons:{
			align: 'C',
			groupName: 'buttonHolder',
			textureName: "Prize.png",
			hitArea: [-10, -15, -31, -14, -44, -16, -49, -10, -50, 10, -46, 18, 42, 19, 50, 12, 52, -8, 44, -14],
			alpha: 1,
			iterationOptions: {
				props: [
					{x:0,y:0},
					{x:157,y:0},
					{x:0,y:136},
					{x:157,y:136}
				]
			}
		},

		buttonValue: {
			align:'TL',
			groupName: 'buttonHolder',
			type: 7,
			orbital: {x:0, y: 0},
			text: '',
			font: "53px mainFont",
			letterSpacing: -8.8,
			// textAlign: 'center',
			iterationOptions: {
				props: [
					{x:0 -20,y:-9},
					{x:159 - 20,y:-9},
					{x:0 - 20,y:134 - 6},
					{x:159 - 20,y:134 - 6}
				]
			}
		},

		instruction: {
			groupName: 'DOM',
			orbital: {x:-21, y:416 - 160},
			textureName: "G3_Copy.png"
		}

	}
};

export default script;