let script = {
	main : {
		align:'C',
		scale: 0,
		spiritName: 'multiplierScene',
		orbital: {
			x: 898 + 186,
			y: 220 + 385
		},
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
			}
		},

		glow: {
			align:'C',
			groupName: 'DOM',
			textureName: "glow",
			alpha: 0,
			zIndex: 8
		},

		multi: {
			align:'C',
			groupName: 'DOM',
			textureName: "x1.png",
			alpha: 1,
			zIndex: 10
		},

		particleSmall: {
			alpha: 1,
			interactive: false,
			interactiveChildren: false,
			particleImages: ['clover', 'sparkle', 'dot'],
			zIndex: 9,
			groupName: 'DOM',

			// Emitter configuration, edit this to change the look
			// of the emitter
			emitterConfig: {
				"alpha": {
					"start": 1,
					"end": 0.5
				},
				"scale": {
					"start": 0.1,
					"end": 0.59,
					"minimumScaleMultiplier": 2.5
				},
				"color": {
					"start": "#83a693",
					"end": "#66ff00"
				},
				"speed": {
					"start": 200,
					"end": 1,
					"minimumSpeedMultiplier": 1
				},
				"acceleration": {
					"x": 0,
					"y": 0
				},
				"maxSpeed": 0,
				"startRotation": {
					"min": 0,
					"max": 360
				},
				"noRotation": false,
				"rotationSpeed": {
					"min": 0,
					"max": 200
				},
				"lifetime": {
					"min": 0.1,
					"max": 0.7
				},
				"blendMode": "screen",
				"frequency": 0.01,
				"emitterLifetime": 1,
				"maxParticles": 100,
				"pos": {
					"x": -150,
					"y": -20
				},
				"addAtBack": false,
				"spawnType": "rect",
				"spawnRect": {
					"x": 0,
					"y": 0,
					"w": 300,
					"h": 40
				}
			}
		},

		particleSmall2: {
			alpha: 0.35,
			interactive: false,
			interactiveChildren: false,
			particleImages: ['clover', 'sparkle', 'dot'],
			zIndex: 9,
			groupName: 'DOM',

			// Emitter configuration, edit this to change the look
			// of the emitter
			emitterConfig: {
				"alpha": {
					"start": 1,
					"end": 0.5
				},
				"scale": {
					"start": 0.1,
					"end": 0.59,
					"minimumScaleMultiplier": 2.5
				},
				"color": {
					"start": "#83a693",
					"end": "#66ff00"
				},
				"speed": {
					"start": 200,
					"end": 1,
					"minimumSpeedMultiplier": 1
				},
				"acceleration": {
					"x": 0,
					"y": 0
				},
				"maxSpeed": 0,
				"startRotation": {
					"min": 0,
					"max": 360
				},
				"noRotation": false,
				"rotationSpeed": {
					"min": 0,
					"max": 200
				},
				"lifetime": {
					"min": 0.1,
					"max": 0.7
				},
				"blendMode": "normal",
				"frequency": 0.01,
				"emitterLifetime": 1,
				"maxParticles": 100,
				"pos": {
					"x": -150,
					"y": -20
				},
				"addAtBack": false,
				"spawnType": "rect",
				"spawnRect": {
					"x": 0,
					"y": 0,
					"w": 300,
					"h": 40
				}
			}
		},

		cover: {
			align:'C',
			groupName: 'DOM',
			hitArea: [-170, -26, -169, 31, -164, 46, -149, 50, 156, 51, 172, 36, 171, -27, 161, -41, -159, -41],
			textureName: "Tripler.png",
			alpha: 1,
			zIndex: 10
		},

		instruction: {
			align:'C',
			zIndex: 9,
			groupName: 'DOM',
			orbital: {x:0, y:92},
			textureName: "Tripler_Copy.png"
		}

	}
};

export default script;