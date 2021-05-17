let script = {
	main : {
		align:'C',
		spiritName: 'game1Extended',
		orbital: {x: 106, y: 220},
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
			textureName: 'g1',
			alpha: 1,
		},

		DOM: {
			interactive: false,
			zIndex: 200,
			effects: {
				onEnter :'%a#1,d#1;ec#introAnimation'
			}
		},

		sparkHolder:{
			groupName: 'DOM',
			orbital: {x: - 7, y: -34.5},
			scale:0.93,
			zIndex: 100
		},

		spark:{
			groupName: 'sparkHolder',
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
					{x:0,y:0},
					{x:0,y:0},
					{x:0,y:0},
					{x:0,y:0},
				]
			}
		},

		symbolHolder:{
			groupName: 'DOM',
			orbital: {x:-6+ 102 - 9, y:-30 + 102 -12},
			scale:0.93,
			zIndex: 20
		},

		hatSpace: {
			groupName: 'symbolHolder',
			zIndex: 50,
			iterationOptions: {
				props: [
					{x:0,y:0},
					{x:166,y:0},
					{x:0,y:111},
					{x:166,y:111},
					{x:0,y:222},
					{x:166,y:222},
					{x:0,y:334},
					{x:166,y:334}
				]
			}
		},

		symbolValue: {
			interactive: false,
			interactiveChildren: false,
			align:'TL',
			zIndex: 10,
			type: 7,
			orbital: {x:-20, y: 0},
			text: '', 
			font: "70.5px mainFont",
			letterSpacing: -8.55,
			pivotY: -15,
			iterationOptions: {
				props: [
					{parent:'hatSpace'},
					{parent:'hatSpace1'},
					{parent:'hatSpace2'},
					{parent:'hatSpace3'},
					{parent:'hatSpace4'},
					{parent:'hatSpace5'},
					{parent:'hatSpace6'},
					{parent:'hatSpace7'},
				]
			}
		},

	
		cover: {
			align:'C',
			zIndex: 50,
			textureName: "hat.png",
			alpha: 1,
			orbital: {x:0, y: 0},
			hitArea:  [-40, -27, -21, 22, -42, 35, -17, 41, 27, 33, 56, 16, 68, 2, 42, 4, 29, -47, 7, -49, -23, -42],
			iterationOptions: {
				props: [
					{parent:'hatSpace'},
					{parent:'hatSpace1'},
					{parent:'hatSpace2'},
					{parent:'hatSpace3'},
					{parent:'hatSpace4'},
					{parent:'hatSpace5'},
					{parent:'hatSpace6'},
					{parent:'hatSpace7'}
				]
			}
		},

		blobs:{
			interactive: false,
			interactiveChildren: false,
			align:'C',
			zIndex: 50,
			groupName: 'symbolHolder',
			textureName: "blob",
			alpha: 1,
			scale: 0,
			iterationOptions: {
				props: [
					{parent:'hatSpace'},
					{parent:'hatSpace1'},
					{parent:'hatSpace2'},
					{parent:'hatSpace3'},
					{parent:'hatSpace4'},
					{parent:'hatSpace5'},
					{parent:'hatSpace6'},
					{parent:'hatSpace7'}
				]
			}
		},

		instruction: {
			groupName: 'DOM',
			orbital: {x:20, y:416},
			textureName: "G1_Copy.png"
		}


	}
};

export default script;