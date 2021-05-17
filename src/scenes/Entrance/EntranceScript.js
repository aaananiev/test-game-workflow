let script = {
	main : {
		spiritName: 'EntranceExtended',
		orbital: {x:0, y: 0},
		interractionLayer: {
			color: 0x000,
			alpha: 0.001
		}
	},
	quarks : {

		DOM: {
			interactive: false,
			zIndex: 200,
			effects: {
				onEnter :'%a#1,d#1;ec#introAnimation'
			},
		},

		spark:{
			groupName: 'DOM',
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

		rainbow: {
			align: 'C',
			zIndex: 100,
			groupName: 'DOM',
			textureName: 'welcomeR',
			alpha: 0.75,
			orbital: {x: 667, y: 375  }
		},

		jackpot: {
			align: 'C',
			zIndex: 2400,
			groupName: 'DOM',
			textureName: "Top_Prize.png",
			alpha: 0,
			orbital: {x: 668, y: 107 }
		},

		button: {
			interactive: false,
			align: 'C',
			groupName: 'DOM',
			textureName: 'Play.png',
			zIndex: 100,
			hitArea: [-131, 29, -132, -21, -123, -37, 122, -36, 131, -20, 133, 30, 120, 43, -120, 43],
			alpha: 0,
			orbital: {x: 667, y: 614},
			idle: {
				script : 'rd#0%se#1.05,d#800;w#50,se#1,d#800',
				ignoreIdleControlFrom: ['menu'],
			},
			onInteraction: {
				onceClick: {
					interactive: false,
					interactiveChildren: false,
					shout: 'playButtonClick',
					zIndex: 3000
				},
				onHover: {
					disableCTA: true,
					script: '%se#1.05,d#100'

				},
				onHoverOut: {
					disableCTA: false,
					shout: 'playBttnHoverOut'
				}
			},
			globalListeners: {
				'gameLoaded': {
					disableCTA: false
				},
				'showInfo': {
					disableCTA: true,
				},
				'infoClose': {
					disableCTA: false
				},
				'gameStarted': {
					disableCTA: false
				},
			}
		}
	},

	components:{
		'enterButton' : {
			type: 'Button',
			groupName: 'DOM',
			script:{
				main : {
					orbital: {x: 0, y: 0},
				},
				quarks : {
				},
			}
		}
	}
};

export default script;