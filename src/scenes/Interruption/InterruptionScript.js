let script = {
	main : {
		orbital: {x:0, y: 0},
		interractionLayer: {
			color: 0x000,
			alpha: 0.6
		}
	},
	quarks : {
		DOM: {}
	},
	components:{
		'interruptionClose' : {
			type: 'Button',
			groupName: 'DOM',
			script:{
				main : {
					spiritName : 'interruptionTrigger',
					orbital: {x:666, y:377},
					isHoverable: false,
				},
				quarks : {
					button: {
						align:'C',
						textureName: 'interruptionsButton',
						hitArea: [-97, -41, 95, -41, 107, -32, 107, 32, 95, 43, -97, 43, -108, 28, -108, -28],
						scale: 1
					}
				},
				special: {
					main: {
						onClick: {
							shout: 'interruptionClose'
						},
					}
				}
			}
		}
	}
};

export default script;
