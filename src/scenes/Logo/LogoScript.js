let script = {
	main : {
		interactive: false,
		interactiveChildren: false,
		align:'C',
		spiritName: 'logoExtended',
		interractionLayer: {
			color: 0x000,
			alpha: 0.001
		}
	},
	quarks : {

		DOM:{},

		cover:{
			groupName: 'DOM',
			align:'C',
			orbital: {x:667, y: 375},
			interactive: false,
			interactiveChildren: false,
			textureName: "welcomeL",
			alpha: 1,
			zIndex: 10,
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
				]
			}
		},

		particle: {
			groupName: 'DOM',
			interactive: false,
			interactiveChildren: false,
			alpha: 1,
			orbital:{x: 200, y: 350},
			interactive: false,
			interactiveChildren: false,
			particleImages: ['sparkle'],
			zIndex: 9,
			// Emitter configuration, edit this to change the look
			// of the emitter
			emitterConfig: {
				"alpha": {"start": 0.8,"end": 0.1},
				"scale": {"start": 0.05,"end": 0.25,"minimumScaleMultiplier": 8},
				"color": {"start": "#faffbd","end": "#ffffff"},
				"speed": {"start": 250,"end": 250,"minimumSpeedMultiplier": 0.5},
				"acceleration": {"x": 0,"y": 0},
				"maxSpeed": 0,
				"startRotation": {"min": 0,"max": 0},
				"noRotation": false,
				"rotationSpeed": {"min": 100,"max": 100},
				"lifetime": {"min": 1,"max": 0.5},
				"blendMode": "add",
				"frequency": 0.001,
				"emitterLifetime": 0.1,
				"maxParticles": 10,
				"pos": {"x": 0,"y": 0},
				"addAtBack": false,
				"spawnType": "burst",
				"particlesPerWave": 1,
				"particleSpacing": 0,
				"angleStart": 0
			}
		}
	}
};

export default script;