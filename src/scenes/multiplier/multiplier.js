import {Utils, LayoutScript, Interactions, Manager, Effect, EventBus, Layer, Elementary} from 'mws';
import script from './multiplierScript.js';
class multiplierScene extends Layer{
	constructor(parent) {
		super(parent);
		this.bookKeeper = new LayoutScript(script, this);
		this.symbols = this.getObj('cover', '' , 'multiplierSceneEntityClick');
		this.gameId = 3;

		let symbolIdle = new Effect({
			target: this.symbols,
			script: 'rd#0%se#1.05,d#800;w#50,se#1,d#800'
		});
		game.customIdle.add(symbolIdle, this.gameId);

		this.symbols.isRevelaed = false;
		this.hasMultiplier = false;
		this.shouldMark = false;
		EventBus.on('gameStarted', () => {
			let hasMultiplier = game.api.scenario.triplier();
			this.hasMultiplier = hasMultiplier;
			this.grainName = (!hasMultiplier) ? "x1.png" : "x3.png";

			this.bookKeeper.particleSmall.emitter.emitterLifetime = (!hasMultiplier) ? 0.25 : 1;
			this.bookKeeper.particleSmall2.emitter.emitterLifetime = (!hasMultiplier) ? 0.25 : 1;
		});

		EventBus.on('playButtonClick', () => {
			let tween5 = new Effect({
				'target': this,
				'script': 'd#1450%pd#:300,d#1;pi#:300,se#1.15,d#150;se#1,d#100',
				'isPaused': false
			});
		});

		EventBus.on('winMarked', (data) => {
			if(!this.hasMultiplier){
				return;
			}

			if(!this.symbols.isRevelaed) {
				this.shouldMark = true;
				return;
			}

			let tween5 = new Effect({
				target: this.bookKeeper.multi,
				effect: 'pulse',
				isPaused: false
			});

			EventBus.emit('igniteParticle');
			game.winLine.add(tween5.spirit, 'begining');
			game.winLine.restart(true);
			game.winLine.paused(false);

		});


		EventBus.on('showInterruption', (data) => {
			if(this.bookKeeper.particleSmall && this.bookKeeper.particleSmall.isEmitting){
				this.bookKeeper.particleSmall.emitter.autoUpdate = false;
				this.bookKeeper.particleSmall2.emitter.autoUpdate = false;
			}
		});

		EventBus.on('interruptionClose', (data) => {
			if(this.bookKeeper.particleSmall && this.bookKeeper.particleSmall.isEmitting){
				this.bookKeeper.particleSmall.emitter.autoUpdate = true;
				this.bookKeeper.particleSmall2.emitter.autoUpdate = true;
			}
		});

		EventBus.on('igniteParticle', () => {
			Utils.delayedExecution(() => {
				if(!this.bookKeeper.particleSmall){
					return;
				}
				this.bookKeeper['particleSmall'].emitter.playOnce();
				// we reignite the particles
				this.bookKeeper['particleSmall2'].emitter.playOnce(() => {
					EventBus.emit('igniteParticle');
				})
			}, 2000);
		});


		EventBus.on('showFinish', (data) => {
			if(!this.hasMultiplier) {
				this.bookKeeper['particleSmall'].cast = false;
				this.bookKeeper['particleSmall2'].cast = false;

				this.bookKeeper.particleSmall.destroy();
				this.bookKeeper.particleSmall2.destroy();
				this.bookKeeper.particleSmall = null;
				this.bookKeeper.particleSmall2 = null;
			}
		});

		EventBus.on('multiplierSceneEntityClick', (data) => {



			this.interactive = false;
			EventBus.emit('lockSymbols');

			if(this.hasMultiplier) {
				EventBus.emit('tweet' , "spc_multiplier_reveal_x3_v1");

			}else{
				EventBus.emit('tweet' , "spc_multiplier_reveal_x1_v1");

			}

			Utils.delayedShout('unlockSymbols', game.lockTime);

			let effectGlow = new Effect({
				target: this.bookKeeper.glow,
				script: 'r#0%a#1,se#0.5,d#100;se#1,d#500',
				isPaused: false
			})

			this.bookKeeper.particleSmall.isEmitting = true;

			this.bookKeeper['particleSmall'].cast = true;
			this.bookKeeper['particleSmall2'].cast = true;

			// this.bookKeeper['particleSmall2'].emitter.playOnce(() => {
			// 	EventBus.emit('igniteParticle');
			// })

			if(this.symbols.isRevelaed) {
				return;
			}


			// we pass gameId for the first game due to the fact that multiplier has no other childs
			game.customIdle.playOrder = 0;
			this.bookKeeper.multi.grain = PIXI.utils.TextureCache[this.grainName];
			this.symbols.isRevelaed = true;
			this.symbols.interactive = false;
			let effect = new Effect({
				target: this.symbols,
				script: 'r#0%a#1,se#1.1d#100;se#1,d#100;se#0.1,a#0,d#500',
				isPaused: false
			}).onComplete(()=>{

				if(this.shouldMark) {
					EventBus.emit('winMarked');
				}
				if(this.hasMultiplier) {
					Utils.moveTo(this.bookKeeper.instruction, 'game', true);
					Utils.moveTo(this, 'tooltip', true);
				}
				game.totalClickObject.count();
				game.customIdle.drop(this.gameId);
			});
		});

		EventBus.on('lockSymbols', () => {
			this.interactiveChildren = false;
		});

		EventBus.on('unlockSymbols', () =>{
			this.interactiveChildren = true;
		})
	}

	getObj(id, index, clickAction) {
		let symbol = this.bookKeeper[id + (index || '')];
		symbol.index = index;
		symbol.isSymbolRevealed = false;
		symbol.hoverEffect = new Effect({
			target: symbol,
			effect: 'onHover',
			isPaused: true
		});

		let interactions = new Interactions({
			entity: symbol,
			onClick: () => EventBus.emit(clickAction, {i:index}),
			onHover: () => symbol.hoverEffect.play(),
			onHoverOut: () => symbol.hoverEffect.spirit.reverse()
		});

		symbol.click = function() {
			this.quark.emit(interactions.mapPointer.click);
		}

		return symbol;
	}
}
export {
	multiplierScene as multiplierScene
}