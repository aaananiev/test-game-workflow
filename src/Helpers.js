// WARNING: Make sure you are not overriding the existing methods or if this is
// intended then make sure you know what you are doing
import {Effect,Interactions,EventBus} from 'mws';
let ExtendedUtils = {
	// Extension methods here:
	// example: function(){
	// 	console.log('The utils have been extended')
	// }
	getIntroPanel(delay){
		let string = `'d#${delay}%pd#:300,d#1;pi#:300,se#1.15,d#150;se#1,d#100'`;
		console.log(string);
		return string;
	},

	getNewClovers({
		parent = null,
		startColor = '#000',
		endColor = '#000',
		imagePool = ['clover','dot'], 
		emitPointX = 0, 
		emitPointY = 0

	} = {}){
		return {
			parent:parent,
			type: 8,
			particleImages: imagePool, 
			emitterConfig:{
				"alpha": {"start": 0.11,"end": 0.84},
				"scale": {"start": 0.001,"end": 1,"minimumScaleMultiplier": 0.001},
				"color": { "end": startColor, "start": endColor },
				"speed": { "start": 30, "end": 1, "minimumSpeedMultiplier": 10},
				"acceleration": { "x": 0, "y": 0},
				"maxSpeed": 0,
				"startRotation": { "min": 0, "max": 360},
				"noRotation": false,
				"rotationSpeed": { "min": 0, "max": 200 },
				"lifetime": {"min": 0.001,"max": 1 },
				"blendMode": "normal",
				"frequency": 0.001,
				"emitterLifetime": 0.75,
				"maxParticles": 50,
				"pos": {
					"x": emitPointX,
					"y":emitPointY
				},
				"addAtBack": false,
				"spawnType": "burst",
				"particlesPerWave": 1,
				"particleSpacing": 0,
				"angleStart": 0.01
			}
		}
	},

	/**
	 *This method adds blink animation on random position from given polygon path
	 * @method moveElements
	 * @param {Array} path - polygon path given as hitArea - array of points
	 * @param {Array} sparkle - element to add the animation on.
	 */
	addSparkleBlinkAnimation(path, sparkle){	
		//initial position
		let startPointIndex = Math.floor(Math.random()*((path.length/2)-1));
		let x = this.randomIntFromInterval(path[startPointIndex*2], path[(startPointIndex*2) + 2]);
		let y = this.randomIntFromInterval(path[(startPointIndex*2) + 1], path[(startPointIndex*2) + 3]);
		sparkle.x = x;
		sparkle.y = y;
		let delay = this.randomIntFromInterval(100, 1500)
		let tl = new TimelineMax({repeat: -1, delay: delay});
		tl.to(sparkle, 50, {alpha: 1, rotation: 0, scale: 0.8})
		.to(sparkle, 500, {rotation: 0.4, scale: 1})
		.to(sparkle, 500, {rotation: 0.8, scale: 0.8, alpha: 0})
		.call(()=>{
			let startPointIndex = Math.floor(Math.random()*((path.length/2)-1));
			let x = this.randomIntFromInterval(path[startPointIndex*2], path[(startPointIndex*2) + 2]);
			let y = this.randomIntFromInterval(path[(startPointIndex*2) + 1], path[(startPointIndex*2) + 3]);

			sparkle.x = x;
			sparkle.y = y;
		});
		sparkle.animation = tl;
	}



};
// WARNING: DO NOT CHANGE THE CODE AFTER THIS LINE
if (mws.Utils) {
	Object.assign(mws.Utils,ExtendedUtils);
}
let exportedUtils = mws.Utils;
export {
	exportedUtils as Utils
}