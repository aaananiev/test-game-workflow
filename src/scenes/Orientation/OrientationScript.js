let script = {
	main : {
		spiritName: 'Orientation',
		orbital: {x:0, y: 0},
		interractionLayer: {
			color: 0xebebeb,
			alpha: 1
		}
	},
	quarks : {
		orientationOverlay: {
			interactive:true,
			interactiveChildren:true,
			preventInteractionPropagandation:true,
			align: 'C',
			textureName:'orientationOverlay',
			orbital: {x: 667, y: 375},
			scale: 3.14
		}
	}
};

export default script;
