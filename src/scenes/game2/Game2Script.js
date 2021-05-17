let script = {
	main : {
		align:'C',
		spiritName: 'game2Extended',
		orbital:{ x: 484, y: 220},
		scale: 0,
		interractionLayer: {
			color: 0x000,
			alpha: 0.001
		}
	},
	quarks : {
		back:{
			interactive: false,
			interactiveChildren: false,
			zIndex: 100,
			groupName: 'DOM',
			textureName: 'g2',
			alpha: 1,
		},
		DOM: {
			interactive: false,
			zIndex: 200,
			effects: {
				onEnter :'%a#1,d#1;ec#introAnimation'
			}
		},
		targetHolder:{
			groupName: 'DOM',
			zIndex:9,
			orbital: {x:102, y:-17 + 102},
		},
		targetHolder2:{
			interactive: false,
			interactiveChildren: false,
			groupName: 'DOM',
			zIndex:9,
			orbital: {x:2, y:-17},
		},
		targetHolder3:{
			interactive: false,
			interactiveChildren: false,
			groupName: 'DOM',
			zIndex:9,
			orbital: {x:162, y:-17},
		},

		targetCover:{
			align: 'C',
			groupName: 'targetHolder',
			textureName: "horseshoe.png",
			zIndex: 40,
			hitArea: [-27, -42, -33, -24, -45, 1, -35, 25, -12, 39, -14, 40, 13, 39, 14, 39, 38, 23, 41, 4, 34, -21, 29, -43, 18, -43, -2, -43, -16, -43],
			alpha: 1,
			iterationOptions: {
				props: [
					{x:2,y:0},
					{x:162,y:0},
				]
			}
		},

		spark:{
			groupName: 'targetHolder2',
			align:'C',
			interactive: false,
			interactiveChildren: false,
			textureName: "sparkle",
			alpha: 1,
			zIndex: 1000,
			scale: 0,
			iterationOptions: {
				props: [
					{x:0,y:0},
					{x:0,y:0},
					{x:0,y:0},
					{x:0,y:0},
				]
			}
		},

		sparkAdd:{
			groupName: 'targetHolder3',
			align:'C',
			interactive: false,
			interactiveChildren: false,
			textureName: "sparkle",
			alpha: 1,
			zIndex: 1000,
			scale: 0,
			iterationOptions: {
				props: [
					{x:0,y:0},
					{x:0,y:0},
					{x:0,y:0},
					{x:0,y:0},
				]
			}
		},

		targetValue: {
			align:'TL',
			pivotY: 24,
			pivotX: 33.5,
			groupName: 'targetHolder',
			zIndex: 10,
			type: 7,
			orbital: {x:0, y: 0},
			text: '',
			font: "95px gf2-export",
			letterSpacing: - 67,
			iterationOptions: {
				props: [
					{orbital: {x:10,y:0}},
					{orbital: {x:170,y:0}},
				]
			}
		},

		blobsTarget:{
			interactive: false,
			interactiveChildren: false,
			align:'C',
			zIndex: 50,
			groupName: 'targetHolder',
			textureName: "grayBlob",
			tint: 0xffffcc,
			alpha: 0.55,
			scale: 0,
			iterationOptions: {
				props: [
					{x:2,y:5},
					{x:162,y:5},
				]
			}
		},

		symbolHolder:{
			groupName: 'DOM',
			zIndex: 10,
			orbital: {x:103, y:203},
		},

		buttonHolder:{
			groupName: 'DOM',
			zIndex:9,
			orbital: {x:37 + 62, y:234 + 27},
		},

		buttons:{
			align:"C",
			zIndex: 10,
			groupName: 'buttonHolder',
			textureName: "Prize.png",
			hitArea: [-10, -15, -31, -14, -44, -16, -49, -10, -50, 10, -46, 18, 42, 19, 50, 12, 52, -8, 44, -14],
			alpha: 1,
			iterationOptions: {
				props: [
					{x:7,y:5},
					{x:162,y:5},
					{x:7,y:135},
					{x:162,y:135}
				]
			}
		},

		buttonValue: {
			align:'TL',
			groupName: 'buttonHolder',
			type: 7,
			zIndex: 9,
			orbital: {x:0, y: 0},
			text: '',
			pivotX: 8.8,
			pivotY: 26.5 ,
			font: "53px mainFont",
			letterSpacing: -8.8,
			// textAlign: 'center',
			iterationOptions: {
				props: [
					{x:-12 + 8, y:0 + 26.5},
					{x:144 + 8, y:0 + 26.5},
					{x:-12 + 8, y:126 + 26.5},
					{x:144 + 8, y:126 + 26.5}
				]
			}
		},

		cover:{
			align:"C",
			groupName: 'symbolHolder',
			textureName: "pot.png",
			hitArea:[40, -26, 41, -9, 43, 10, 56, 25, 42, 32, 33, 38, 25, 43, 10, 43, 1, 47, -13, 42, -23, 37, -36, 36, -46, 27, -54, 22, -55, 7, -44, 3, -46, -11, -38, -18, -38, -26, -38, -33, -29, -37, -2, -43, 15, -40, 23, -41],
			alpha: 1,
			iterationOptions: {
				props: [
					{x:7,y:5},
					{x:162,y:5},
					{x:7,y:135},
					{x:162,y:135}
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
					{x:7,y:5},
					{x:162,y:5},
					{x:7,y:135},
					{x:162,y:135}
				]
			}
		},

		symbolValue: {
			interactive: false,
			interactiveChildren: false,
			align:'TL',
			zIndex: 10,
			groupName: 'symbolHolder',
			pivotY: 24,
			pivotX: 33.5,
			type: 7,
			orbital: {x:0, y: 0},
			text: '',
			font: "95px gf2-export",
			letterSpacing: -67,
			iterationOptions: {
				props: [
					{x:10, y: 6},
					{x:166, y: 6},
					{x:10, y: 137},
					{x:166, y: 137}
				]
			}
		},
		instruction: {
			interactive: false,
			interactiveChildren: false,
			groupName: 'DOM',
			zIndex: 5,
			orbital: {x:4, y:420},
			textureName: "G2_Copy.png"
		},

		winningNumbers: {
			interactive: false,
			interactiveChildren: false,
			groupName: 'DOM',
			orbital: {x:59, y:2},
			textureName: "PLI_StP_Asset 8.png",
			zIndex: 5

		},
		YourNumbers:{
			interactive: false,
			interactiveChildren: false,
			groupName: 'DOM',
			orbital: {x:59, y:128},
			textureName: "PLI_StP_Asset 9.png",
			zIndex: 5
		},

	}
};

export default script;