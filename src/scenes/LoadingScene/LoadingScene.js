import {Layer, EventBus, Effect, Utils, Device} from 'mws';
import {GlowFilter} from '@pixi/filter-glow';
export default class LoaderScene extends Layer {
	constructor()
	{
		super();
		this.backgroundColor = 0xe0e0e0;
		this.background = new PIXI.Graphics();
		this.background.beginFill(this.backgroundColor, 1);
		this.background.drawRect(0, 0, 1334, 750);
		this.background.endFill();
		this.addChild(this.background);
		this.starMask = new PIXI.Graphics();
		this.starMask.x = 353;
		this.starMask.y = 88;
		this.starHolder = new PIXI.Graphics();
		this.starFill = new PIXI.Graphics();
		let starHolder = this.starHolder;
		let starFill = this.starFill;
		starFill.mask = this.starMask;
		starFill.addChild(this.starMask);
		let starPoints = [
			666, 133, 744, 292, 920, 318, 793, 439, 821, 615, 666, 532, 510,
			614, 539, 443, 414, 317, 587, 292, 600, 267, 634, 267, 607, 319,
			479, 338, 573, 431, 551, 559, 667, 498, 781, 558, 760, 430, 854,
			339, 726, 320, 666, 202
		];
		starHolder.beginFill(0xe0e0e0,1).drawPolygon(starPoints).endFill();
		starFill.beginFill(0xeddc57).drawPolygon(starPoints).endFill();
		this.addChild(starHolder,starFill);
		Utils.adjustForScaleAnimation(this.quark);
		if (Device.orientation === 'p') {
			this.scale = 1.8;
		}
		let glowFilter = new GlowFilter();
		glowFilter.outerStrength = 0;
		glowFilter.innerStrength = 0.6;
		glowFilter.distance = 30;
		glowFilter.resolution = 2;
		glowFilter.color = 0x000;
		starHolder.filters = [glowFilter];
		starFill.filters = [glowFilter];
		var basicText = new PIXI.Text('0 %', this.textStyle);
		basicText.x = 1334/2;
		basicText.y = 280;

		basicText.anchor.set(0.5);

		this.loadingProgress = basicText;
		this.loadingProgress.alpha = 0;
		this.addChild(this.loadingProgress);
		this.loadingText = null;
		this.setEvents();
	}

	actionOnDestroy() {
		Utils.delayedExecution(() => {
			if (this.destroyCallBack) {
				this.globalEventsPaused = true;
				this.destroy();
				this.destroyCallBack();
			}
		},50);
	}

	onDestroy(cb)
	{
		if(cb !=null) {
			this.destroyCallBack = cb;
		}
	}

	actionProgress(percents)
	{
		if(!this.loadingText && PIXI.BitmapText.fonts && 'fnt-export' in PIXI.BitmapText.fonts) {
			let bitmapText = new PIXI.BitmapText("LOADING", {font: "80px fnt-export", align: "left"});
			bitmapText.x = 545;
			bitmapText.y = 160;
			bitmapText.anchor.set(0.5);
			this.loadingText = bitmapText;
			bitmapText.alpha = 0;
			let tween = new Effect({
				target: bitmapText,
				script: '%a#1,d#500',
				isPaused: false
			});
			let texts = ['PRIZES', 'NUMBERS', 'DREAMS', 'LUCK'];
			let positions = [{x: 419, y: 171},{x: 456, y: 171},{x: 533, y: 171}];
			this.loadingTextExtra =  new PIXI.BitmapText(texts.shift(), {font: "80px fnt-export", align: "left"});
			this.addChild(bitmapText,this.loadingTextExtra);
			this.loadingTextExtra.alpha = 0;
			this.loadingTextExtra.x = 490;
			this.loadingTextExtra.y = 171;
			tween.onComplete(() => {
				let tweenExtra = new Effect({
					target: this.loadingTextExtra,
					script: 'r#-1%a#1,d#500;a#0,d#500;a#1,d#500;a#0,d#500',
					isPaused: false
				});
				tweenExtra.onRepeat(() => {
					if (texts.length) {
						this.loadingTextExtra.text =  texts.shift();
						let position = positions.shift();
						this.loadingTextExtra.x = position.x;
						this.loadingTextExtra.y = position.y;
					}
				});
			});
		}
		let angle = (percents / 100 * 360) - 90;
		let radians = angle * (Math.PI / 180);
		this.starMask.clear().beginFill(0x000,0.001)
			.arc(313, 313, 280, -90*(Math.PI/180), radians, false)
			.lineTo(313, 313)
			.closePath();
	}

	onResize(event) {
		if (this) {
			this.background.clear();
			this.background.beginFill(this.backgroundColor, 1);
			this.background.drawRect(-event.x, -event.y, event.w, event.h);
			this.background.endFill();
			if (Device.orientation === 'p') {
				this.scale = 1.8;
			} else {
				this.scale = 1;
			}
		}
	}

	setEvents() {
		let events = {
			'loadProgress': this.actionProgress,
			'resize': this.onResize
		};
		EventBus.addListeners(events, this, this);
	}
}
