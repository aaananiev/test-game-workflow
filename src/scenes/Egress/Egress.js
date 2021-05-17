import {Utils, Money, Memory, LayoutScript, Interactions, Manager, Effect, EventBus, Elementary} from 'mws';
import {Egress} from 'mws.components';
import script from './EgressScript.js';

class EgressExtended extends Egress{
	constructor() {
		super(script);
		this.setListeners();

		let cfg = {
			parent:this,
			type: 8,
			particleImages: ['clover2'], 
			emitterConfig:{
				"alpha": {"start": 1,"end": 0.39},
				"scale": {"start": 0.01,"end": 1,"minimumScaleMultiplier": 1},
				"color": {"start": "#ffb068","end": "#7a746a"},
				"speed": {"start": 350,"end": 350,"minimumSpeedMultiplier": 0.001},
				"acceleration": {"x": 0,"y": 350},
				"maxSpeed": 0,
				"startRotation": {"min": -360,"max": 180},
				"noRotation": false,
				"rotationSpeed": {"min": 500,"max": 500},
				"lifetime": {"min": 0.001,"max": 1},
				"blendMode": "add",
				"frequency": 0.001,
				"emitterLifetime": 0.35,
				"maxParticles": 200,
				"pos": {"x": 0,"y": 0},
				"addAtBack": false,
				"spawnType": "rect",
				"spawnRect": {"x": -1200/ 2,"y": -150,"w": 1200,"h": 200}
			}
		}
		this.clovers = new mws.Elementary(cfg);
		this.clovers.alpha = 0.5;
		this.clovers.zIndex = 2;
	}

	setListeners() {
		let self = this;
		let events = {
			'settingChange': function(evt) {
				if (evt.value === 'menu_open') {
					this.menuOpen = true;
				}
				if (evt.value === 'menu_close') {
					this.menuOpen = false;
				}
			},
			showFinish: function(){




				this.effectFamily['overlaySpecial'][0].play();
				EventBus.emit('scrap', 'background');
				Manager.setIdleTickerInterval(100000);
				EventBus.emit('restartIdleTicker');
				// we don't need precision 

				let orgText = Memory.retrive('amount') / 100;
				if(orgText > 0) {
					game.postMessage('game.prizeRevealed: ' + orgText*100);
				}

				this.maxSize = orgText;
				let anchorX = 0.50;

				let shouldBeHidden = false;

				if(orgText < 0 || Memory.retrive('mode') != 'NORMAL') {
					shouldBeHidden = true;
				}
				orgText = Money.format(orgText + '', 'cv', {c:'\u20ac'})

				this.bookKeeper.prize.quark.anchor.set(anchorX,0.5);

				if(shouldBeHidden) {
					this.bookKeeper.prize.alpha = 0;
				}

				if(!shouldBeHidden){
					let sparkler = [{"x":520,"y":61},{"x":239,"y":107},{"x":297,"y":65},{"x":224,"y":53},{"x":295,"y":102},{"x":464,"y":91},{"x":508,"y":93},{"x":223,"y":58},{"x":500,"y":97},{"x":108,"y":86},{"x":509,"y":101},{"x":255,"y":73},{"x":440,"y":47},{"x":488,"y":112},{"x":459,"y":97},{"x":365,"y":101},{"x":153,"y":95},{"x":506,"y":85},{"x":342,"y":74},{"x":245,"y":52},{"x":379,"y":54},{"x":119,"y":81},{"x":97,"y":59},{"x":152,"y":61},{"x":433,"y":43},{"x":333,"y":68},{"x":213,"y":109},{"x":84,"y":114},{"x":422,"y":77},{"x":489,"y":70},{"x":121,"y":110},{"x":327,"y":88},{"x":466,"y":52},{"x":427,"y":78},{"x":313,"y":44},{"x":276,"y":105},{"x":336,"y":107},{"x":290,"y":46},{"x":517,"y":107},{"x":94,"y":107},{"x":465,"y":110},{"x":203,"y":55},{"x":571,"y":82},{"x":529,"y":96},{"x":99,"y":91},{"x":439,"y":108},{"x":340,"y":56},{"x":550,"y":117},{"x":157,"y":85},{"x":267,"y":102},{"x":522,"y":71},{"x":248,"y":51},{"x":185,"y":104},{"x":142,"y":65},{"x":455,"y":39},{"x":540,"y":72},{"x":243,"y":48},{"x":466,"y":67},{"x":218,"y":109},{"x":99,"y":64},{"x":333,"y":70},{"x":361,"y":104},{"x":233,"y":91},{"x":434,"y":90},{"x":489,"y":81},{"x":328,"y":47},{"x":438,"y":107},{"x":424,"y":69},{"x":182,"y":55},{"x":193,"y":62},{"x":113,"y":60},{"x":110,"y":84},{"x":312,"y":77},{"x":357,"y":54},{"x":404,"y":46},{"x":422,"y":66},{"x":568,"y":104},{"x":375,"y":93},{"x":121,"y":74},{"x":143,"y":84},{"x":593,"y":86},{"x":84,"y":61},{"x":298,"y":68},{"x":106,"y":111},{"x":590,"y":75},{"x":207,"y":111},{"x":252,"y":48},{"x":564,"y":101},{"x":562,"y":60},{"x":313,"y":78},{"x":558,"y":65},{"x":224,"y":98},{"x":100,"y":65},{"x":364,"y":43},{"x":286,"y":48},{"x":290,"y":53},{"x":567,"y":71},{"x":233,"y":66},{"x":160,"y":90},{"x":437,"y":66}]
					let sparkElements = [
						this.bookKeeper.spark,
						this.bookKeeper.spark1,
						this.bookKeeper.spark2,
						this.bookKeeper.spark3,
						this.bookKeeper.spark4,
					];

					let index = 0;
					for(let sparky of sparkElements){
						let randomIndex = Utils.getRandomInt (0, sparkler.length-1);
						sparky.orbital = sparkler[randomIndex];
						let myBlob = new Effect({
							target: sparky,
							script: 'd#'+(300 + Utils.getRandomInt(1000, 2000) * index++)+',r#-1%a#0,se#0.1,r#0,d#1;a#1,se#1.05,rd#10,d#500;se#0,a#0,ri#10,d#500;w#'+Utils.getRandomInt(1000, 2000),
							isPaused: false
						}).onRepeat(()=>{
							let randomIndex = Utils.getRandomInt(0, sparkler.length-1);
							sparky.orbital = sparkler[randomIndex];
						})
					}
				}
				
				this.w = 1;
				this.bookKeeper.prize.text = Money.format( this.maxSize , 'cv', {c:'\u20ac'});

				if(this.maxSize > 9) {
					this.bookKeeper.prize.text = Money.format( '0' , 'cv', {c:'\u20ac'});
				}
				let gameMode = Memory.retrive('mode');

				let soundName = 'spc_win_v1';
				if(this.maxSize > 10000) {
					soundName = 'spc_big_win_v1';
				}
				if(this.maxSize < 0) {
					soundName = 'spc_no_win_v1';
				}
				EventBus.emit('tweet', soundName);
				
				Utils.delayedExecution(() => {
					if(this.maxSize > 0 && gameMode === 'NORMAL') {
						EventBus.emit('tweet', {name:'spc_cash_count_LOOP_v1', loop:-1});
					}
					if(this.maxSize > 9 && gameMode === 'NORMAL') {
						let time = 1000;
						if(this.maxSize > 100)
							time = 2500;
						if(this.maxSize > 500)
							time = 5000;
						this.spinner = TweenMax.to(this, time, {w: this.maxSize});
						this.spinner.eventCallback("onComplete", this.actionOnComplete, null, this);
						this.spinner.eventCallback("onUpdate", this.actionOnUpdate, null, this);
					}else{
						this.actionOnComplete();
					}
				}, 1000);
			}
		};
		EventBus.addListeners(events,this);
	}
	actionOnUpdate() {
		this.bookKeeper.prize.text = Money.format(this.w + '', 'cv', {c:'\u20ac'});
	}

	actionOnComplete(){
		if(this.maxSize > 0 && Memory.retrive('mode') == 'NORMAL') {
			EventBus.emit('cloak', 'spc_cash_count_LOOP_v1');
			this.clovers.cast = true;
			Manager.setIdleTickerInterval(100);
			EventBus.emit('introAnimationEnd');
			mws.Utils.delayedExecution(() => {
				Manager.setIdleTickerInterval(1000);
			}, 110);
			game.components.Settings.bookKeeper.__components.info.enable();
			
			this.actionOnDestroy();
		}else{
			game.components.Settings.bookKeeper.__components.info.enable();

			Manager.setIdleTickerInterval(100);
			EventBus.emit('introAnimationEnd');
			mws.Utils.delayedExecution(() => {
				Manager.setIdleTickerInterval(1000);
			}, 110);
		}
	}

	actionOnDestroy(){
		if(!this.spinner)
			return;
		this.isDestroyable = true;
		if(!this.spinner.isActive()){
			this.spinner.eventCallback("onComplete", null);
			this.spinner.eventCallback("onUpdate", null);
		} else {
			this.spinner.timeScale(30);
		}
	}

}
export {
	EgressExtended as Egress
} 