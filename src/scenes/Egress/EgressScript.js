let script = {
	main : {
		spiritName: 'Egress',
		orbital: {x:274 + 405, y: 410 - 51 - 242 -3},
		scripts:{
			fancyFadeIn: 'r#0%a#1,d#300;'
		},
		interractionLayer: {
			shout: 'egressClick',
			effect: 'fancyFadeIn',
			color: 0x000,
			alpha: 0.35
		},

		variable: {
			name: 'egressClip',
			memory: 'egressClip',
			watchMemory: true,
			value: 'default'
		}
	},
	quarks : {
		DOM:{ 
			zIndex: 120,
			alpha: 0,
			effects: {
				onExit: 'cushionOut',
				onEnter: 'cushionIn'
			},
		},

		sparkHolder:{
			groupName: 'DOM',
			zIndex: 1000,
			orbital: {x: -336, y: -133},
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
				]
			}
		},
		back: {
			align:'C',
			groupName: 'DOM',
			orbital: {x: -10, y: 0},
			zIndex: 10,
			textureName:'finishPanel',
			preventInteractionPropagandation: true,
		},

		front: {
			align:'C',
			zIndex: 10,
			groupName: 'DOM',
			textureName: "Better.png",
			orbital: {x:-9, y:0},
			preventInteractionPropagandation: true,
			memory: [{
				watch: [
					{field:'mode', value:'TRIAL', cond:'e'},
					{field:'isWinning', value:true , cond:'e'}
				],
				textureName: "Thanks.png"
			},{
				watch: [
					{field:'mode', value:'TRIAL', cond:'ne'},
					{field:'isWinning', value:true , cond:'e'}
				],
				textureName: "Congratulations.png"
			},{
				watch: [
					{field:'mode', value:'TRIAL', cond:'e'},
					{field:'isWinning', value:false , cond:'e'}
				],
				textureName: "Thanks.png"
			},{
				watch: [
					{field:'mode', value:'TRIAL', cond:'ne'},
					{field:'isWinning', value:false , cond:'e'}
				],
				textureName: "Better.png"
			}]
		},

		egressSparkles: {
			interactive: false,
			alpha: 0,
			width: 67,
			height: 67,
			textureName: 'sparkle',
			iterationOptions: {
				props: '.'.repeat(10).split('').map(a=>{return {x: 0, y: 0}})
			},
		},

		prize: {
			align:'TL',
			zIndex: 10,
			groupName: 'DOM',
			orbital: {x: -4, y: 9},
			text: '', 
			letterSpacing: -9,
			font: "100px finish-fnt"
		},
		overlay: {
			interactive: false,
			groupName: 'DOM',
			zIndex: 100,
			textureName: 'dummy',
			orbital: {x: -335, y: -285},
			tint: 0x291B00,
			width: 2000,
			height: 2000,
			alpha: 0.001,
			globalListeners: {
			}
		},
		'gameElements': {
			zIndex: 100,
			alpha: 0
		}
	},
	components:{
		'egressButton' : {
			type: 'Button',
			zIndex: 150,
			groupName: 'DOM',
			script:{
				main : {
					spiritName : 'egressTrigger',
					orbital: {x:-8, y:115},
					interaction: true,
					scripts: {
						onClick: '%se#0.95,d#200',						
					},
					shoutOut: true
				},
				quarks : {
					button: {
						align:'C',
						textureName: "PLI_StP_Asset_36.png",
						type: 6,
						interactive: false,
						hitArea:  [123, -24, 122, 27, 113, 39, -116, 37, -125, 29, -124, -24, -114, -34, 113, -34],
						interactiveChildren:false,
						effects: {
							onEnter: '%w#1;ec#finishButtonShown',
						},
						globalListeners: {
                            'showInfo': { disableCTA: true},
                            'infoClose': { disableCTA: false},
                            'gameEnter': { disableCTA: true},
                            'introAnimationEnd': { 
                            	disableCTA: false,
                            	interactive: true,
								interactiveChildren:true,
                            }

                        },
                        idle: {
							script : 'rd#0%se#1.05,d#800;w#50,se#1,d#800',
							ignoreIdleControlFrom: ['menu']
						},
						onInteraction: {
							onHover: {
								disableCTA: true,
								script: 'r#0%se#1.05,d#75',
								shout: 'finishBtnHovered'
							},
							onHoverOut: {
								script: 'r#0%se#1.0,d#75',
								disableCTA: false,
								shout: 'restartIdleTicker'
							},
							onClick: {
								script: 'r#0%se#0.9,d#70;se#1,d#70',
								shout: 'gameFinished',
								sound: 'spc_game_3_reveal_v1'
							}
						},
					}
				}
			}
		}
	}
};

export default script;
