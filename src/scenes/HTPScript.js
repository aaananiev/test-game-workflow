let script = {
	main : {
		spiritName: 'HTPComponent',
		orbital: {x:667, y: 395},
		scripts:{
			fancyFadeIn: 'r#0%a#1,d#300;'
		},
		interractionLayer: {
			shout: 'infoClose',
			effect: 'fancyFadeIn',
			color: 0x000,
			alpha: 0.45
			// textureName: 
		}
	},
	quarks : {
		infoDOM:{ 
			alpha: 0,
			effects: {
				onExit: 'cushionOut',
				onEnter: 'cushionIn',
			},
		},
		back: {
			align:'C',
			groupName: 'infoDOM',
			textureName: 'htpBackground',
			hitArea: [-532, -319, -550, -310, -558, -299, -558, 292, -557, 312, -544, 331, -534, 334, 530, 331, 546, 327, 554, 312, 556, 291, 554, -292, 549, -306, 544, -312, 536, -318],
			preventInteractionPropagandation: true
		}
	},
	components:{
		'infoClose' : {
			type: 'Button',
			groupName: 'infoDOM',
			script:{
				main : {
					align:'C',
					spiritName : 'infoTrigger',
					orbital: {x:538 - 60 - 19, y:-305 - 60  + 75},
					interaction: true,
					scripts: {
						// onClick: 'r#0%rc#-180,se#0.95,d#0;r#0,se#1,d#100;w#250', //'r#0%rd#-3600,d#0;rd#0,d#200'
						// onHover: 'r#0%rc#0,d#0;se#1.05,d#100',
						// onHoverOut: 'r#0%rc#0,d#0;se#1,d#100'
					},
					effects: {
						idle: 'pulse'
					},
					shoutOut: true
				},
				quarks : {
					button: {
						hitArea:[68, 6, 68, 61, 63, 69, 6, 69, 2, 63, 1, 8, 5, 2, 64, 2],
						textureName: 'htpButton',
						onInteraction : {
							onHover: {
								shout: 'stopIdleTicker',
							},
							onHoverOut: {
								shout: 'restartIdleTicker',
							},
							onClick: {
								shout: 'restartIdleTicker',
							}
						}
					}
				},
				special: {
					main: {
						onClick: {
							shout: 'infoClose'
						}
					}
				}
			}
		}
	}
};

export default script;
