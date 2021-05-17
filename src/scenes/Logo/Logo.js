import {Utils, LayoutScript, Interactions, Manager, Effect, EventBus, Layer, Elementary} from 'mws';
import script from './LogoScript.js';
class Logo extends Layer{
	constructor(parent) {
		super(parent);

		
		this.bookKeeper = new LayoutScript(script, this);

		let sparkElements = [
			this.bookKeeper.spark,
			this.bookKeeper.spark1,
			this.bookKeeper.spark2,
			this.bookKeeper.spark3,
			this.bookKeeper.spark4,
		];
		let index = 0;
		let sparkler = [{"x":651,"y":465},{"x":591,"y":257},{"x":752,"y":544},{"x":290,"y":536},{"x":298,"y":368},{"x":350,"y":429},{"x":798,"y":268},{"x":615,"y":492},{"x":338,"y":307},{"x":348,"y":531},{"x":322,"y":307},{"x":977,"y":519},{"x":1049,"y":434},{"x":844,"y":288},{"x":874,"y":465},{"x":959,"y":344},{"x":821,"y":265},{"x":899,"y":475},{"x":407,"y":431},{"x":264,"y":464},{"x":926,"y":247},{"x":642,"y":462},{"x":550,"y":276},{"x":683,"y":250},{"x":956,"y":558},{"x":876,"y":286},{"x":573,"y":308},{"x":367,"y":490},{"x":433,"y":260},{"x":923,"y":313},{"x":733,"y":322},{"x":580,"y":550},{"x":362,"y":462},{"x":694,"y":214},{"x":571,"y":470},{"x":693,"y":474},{"x":954,"y":253},{"x":880,"y":294},{"x":553,"y":245},{"x":608,"y":502},{"x":342,"y":408},{"x":969,"y":553},{"x":836,"y":505},{"x":1028,"y":430},{"x":540,"y":486},{"x":361,"y":279},{"x":792,"y":473},{"x":272,"y":457},{"x":585,"y":531},{"x":861,"y":229},{"x":284,"y":393},{"x":830,"y":547},{"x":295,"y":352},{"x":908,"y":430},{"x":567,"y":410},{"x":1079,"y":420},{"x":909,"y":296},{"x":615,"y":290},{"x":905,"y":492},{"x":363,"y":464},{"x":549,"y":255},{"x":532,"y":267},{"x":853,"y":346},{"x":644,"y":302},{"x":767,"y":538},{"x":998,"y":538},{"x":533,"y":205},{"x":1103,"y":449},{"x":657,"y":213},{"x":770,"y":548},{"x":370,"y":516},{"x":265,"y":470},{"x":557,"y":223},{"x":780,"y":286},{"x":283,"y":365},{"x":664,"y":518},{"x":541,"y":541},{"x":645,"y":457},{"x":1091,"y":464},{"x":589,"y":417},{"x":429,"y":276},{"x":692,"y":309},{"x":399,"y":240},{"x":1023,"y":248},{"x":1107,"y":505},{"x":854,"y":220},{"x":377,"y":377},{"x":349,"y":333},{"x":966,"y":378},{"x":738,"y":385},{"x":374,"y":439},{"x":540,"y":392},{"x":570,"y":215},{"x":190,"y":306},{"x":428,"y":429},{"x":934,"y":343},{"x":1118,"y":472},{"x":334,"y":408},{"x":421,"y":438},{"x":636,"y":311}];
		for(let sparky of sparkElements){
			let randomIndex = Utils.getRandomInt (0, sparkler.length-1);
			sparky.orbital = sparkler[randomIndex];
			let myBlob = new Effect({
				target: sparky,
				script: 'd#'+(300 + Utils.getRandomInt(1000, 2000) * index++)+',r#-1%a#0,se#0.1,r#0,d#1;a#1,se#1.5,rd#10,d#500;se#0,a#0,ri#10,d#500;w#'+Utils.getRandomInt(1000, 2000),
				isPaused: false
			}).onRepeat(()=>{
				let randomIndex = Utils.getRandomInt(0, sparkler.length-1);
				sparky.orbital = sparkler[randomIndex];
			})
		}

		let originPos = [{x: 200, y: 350}, {x: 700, y: 250}, {x: 1000, y: 450}];

		EventBus.once('introAnimation', () => {
			this.bookKeeper.particle.isEmitting = true;
			this.bookKeeper.particle.cast = true;
		});

		this.bookKeeper.particle.emitter.playOnce(() => {
			this.bookKeeper.particle.isEmitting = false;
			EventBus.emit('logoParticle');
		});

		EventBus.on('showFinish', (data) => {
			this.bookKeeper.particle.cast = false;
			this.bookKeeper.particle.destroy();
			this.bookKeeper.particle = null;
		});

		EventBus.on('logoParticle', () => {
			if(!this.bookKeeper.particle) {
				return;
			}
			let index = Utils.getRandomInt(0, originPos.length-1);
			this.bookKeeper.particle.x = originPos[index].x;
			this.bookKeeper.particle.y = originPos[index].y;

			Utils.delayedExecution(() => {
				if(!this.bookKeeper.particle) {
					return;
				}
				this.bookKeeper.particle.isEmitting = true;
				this.bookKeeper.particle.emitter.emit = true;
				// we reignite the particles
				this.bookKeeper.particle.emitter.playOnce(() => {
					this.bookKeeper.particle.isEmitting = false;
					EventBus.emit('logoParticle');
				})
			}, 500);
		});

		this.playing = false;

		EventBus.on('playButtonClick', () => {

			if(this.playing)
				return;

			let tween4 = new Effect({
				'target': this.bookKeeper.cover,
				'script': 'd#150%se#1.2,d#150;se#.9,d#150;se#1,d#150',
				'isPaused': false
			}).onComplete(()=>{

				let tween3 = new Effect({
					'target': this,
					'script': '%se#0.45,pd#4:251,d#500',
					'isPaused': false
				});
			});

			this.playing = true;

			let clovers = new mws.Elementary({
					parent: this.parent,
					type: 8,
					particleImages:['clover','dot'], 
					emitterConfig:{
						"alpha": {"start": 1,"end": 0.45},
						"scale": {"start": 1,"end": 0.3,"minimumScaleMultiplier": 2},
						"color": {"start": "#fd1111","end": "#f7a134"},
						"speed": {"start": 200,"end": 200,"minimumSpeedMultiplier": 1},
						"acceleration": {"x": 0,"y": 0},
						"maxSpeed": 0,
						"startRotation": {"min": 0,"max": 0},
						"noRotation": false,
						"rotationSpeed": {"min": 0,"max": 0},
						"lifetime": {"min": 0.5,"max": 0.5},
						"blendMode": "add",
						"frequency": 0.001,
						"emitterLifetime": 0.50,
						"maxParticles": 200,
						"pos": {"x": this.x,"y": this.y},
						"addAtBack": false,
						"spawnType": "ring",
						"spawnCircle": {"x": 0,"y": 0,"r": 350,"minR": 100}
					}
			});

			clovers.zIndex = this.zIndex + 10;
			clovers.emitter.emit = true;
			clovers.emitter.autoUpdate = true;
			// clovers.emitter.playOnceAndDestroy();
				
		});

		EventBus.on('showInterruption', (data) => {
			if(!this.bookKeeper.particle) {
				return;
			}
			this.bookKeeper.particle.emitter.autoUpdate = false;
		});

		EventBus.on('interruptionClose', (data) => {
			if(!this.bookKeeper.particle) {
				return;
			}
			this.bookKeeper.particle.emitter.autoUpdate = true;
		});
	}	
}
export {
	Logo as Logo
}