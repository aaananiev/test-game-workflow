import {Utils,LayoutScript, Interactions, Manager, Effect, EventBus, Elementary} from 'mws';
import {Entrance} from 'mws.components';
import script from './EntranceScript.js';
class EntranceExtended extends Entrance{
	constructor() {
		super(script);
		this.setListeners();
		this.bookKeeper.jackpot.y -= 400;
		this.bookKeeper.button.disableCTA = true;
		EventBus.emit('restartIdleTicker');

		EventBus.once('introAnimation', () => {
			let settingsShowTween = new mws.Effect({
				target: game.components.Settings,
				script: '%a#1,d#100',
				isPaused: false
			}).onComplete(() => {
				game.components.Settings.visible = true;
			});
		});

		let sparkler = [{"x":433,"y":164},{"x":537,"y":222},{"x":630,"y":307},{"x":764,"y":489},{"x":729,"y":335},{"x":727,"y":420},{"x":427,"y":232},{"x":474,"y":131},{"x":788,"y":356},{"x":802,"y":400},{"x":642,"y":368},{"x":384,"y":228},{"x":659,"y":510},{"x":691,"y":367},{"x":553,"y":253},{"x":525,"y":212},{"x":480,"y":215},{"x":685,"y":386},{"x":574,"y":276},{"x":654,"y":229},{"x":540,"y":279},{"x":810,"y":380},{"x":591,"y":131},{"x":438,"y":168},{"x":840,"y":434},{"x":752,"y":420},{"x":713,"y":420},{"x":515,"y":277},{"x":827,"y":484},{"x":505,"y":198},{"x":617,"y":183},{"x":456,"y":224},{"x":678,"y":342},{"x":848,"y":506},{"x":507,"y":284},{"x":598,"y":273},{"x":543,"y":171},{"x":758,"y":337},{"x":700,"y":520},{"x":594,"y":145},{"x":410,"y":129},{"x":714,"y":473},{"x":648,"y":275},{"x":646,"y":290},{"x":715,"y":324},{"x":643,"y":218},{"x":368,"y":202},{"x":403,"y":228},{"x":524,"y":240},{"x":749,"y":388},{"x":633,"y":383},{"x":609,"y":197},{"x":601,"y":377},{"x":738,"y":496},{"x":584,"y":270},{"x":286,"y":347},{"x":796,"y":475},{"x":388,"y":168},{"x":337,"y":271},{"x":416,"y":229},{"x":477,"y":207},{"x":455,"y":119},{"x":579,"y":283},{"x":609,"y":258},{"x":601,"y":160},{"x":614,"y":261},{"x":464,"y":122},{"x":512,"y":106},{"x":639,"y":341},{"x":802,"y":402},{"x":608,"y":285},{"x":582,"y":317},{"x":740,"y":397},{"x":551,"y":328},{"x":872,"y":456},{"x":561,"y":251},{"x":478,"y":232},{"x":440,"y":162},{"x":820,"y":484},{"x":516,"y":167},{"x":615,"y":219},{"x":653,"y":186},{"x":616,"y":271},{"x":811,"y":540},{"x":618,"y":269},{"x":455,"y":247},{"x":343,"y":286},{"x":867,"y":467},{"x":646,"y":362},{"x":747,"y":386},{"x":465,"y":244},{"x":822,"y":491},{"x":834,"y":462},{"x":806,"y":397},{"x":732,"y":395},{"x":616,"y":233},{"x":468,"y":258},{"x":743,"y":437},{"x":648,"y":232},{"x":637,"y":276}];

		this.sparkElements = [
			this.bookKeeper.spark,
			this.bookKeeper.spark1,
			this.bookKeeper.spark2,
			this.bookKeeper.spark3,
			this.bookKeeper.spark4,
			this.bookKeeper.spark5,
			this.bookKeeper.spark6,
			this.bookKeeper.spark7,
		];
		let index = 0;

		for(let sparky of this.sparkElements){
			let randomIndex = Utils.getRandomInt (0, sparkler.length-1);
			sparky.orbital = sparkler[randomIndex];
			var SparkEffect =  new mws.Effect({
				target: sparky,
				script: 'd#'+(300 + Utils.getRandomInt(500, 1000) * index++)+',r#-1%a#0,se#0.1,r#0,d#1;a#1,se#'+(Utils.getRandomInt(5, 20)/10)+',rd#3,d#300;se#0,a#0,rd#0,d#300;',
				isPaused: false
			});

			SparkEffect.onRepeat(()=>{
				let randomIndex = Utils.getRandomInt(0, sparkler.length-1);
				sparky.orbital = sparkler[randomIndex];
			});

			sparky.blob = SparkEffect;

		}

		// Prevent playing animations before the intro is finished
		Manager.setIdleTickerInterval(100000);
	}

	setListeners() {
		let events = {
			'playBttnHoverOut': function() {
				// need to prevent button hover after click
				if(!this.isButtonClicked){
					EventBus.emit('restartIdleTicker');
					let tween = new Effect({
						'target': this.bookKeeper.button,
						'script': '%se#1,d#100',
						'isPaused': false
					});
				}
			},
			'playButtonClick': function() {
				this.isButtonClicked = true;
				this.interactive = false;
				this.interactiveChildren = false;
				EventBus.emit('tweet' , "spc_game_3_reveal_v1");

				let exitAnim = new Effect({
					'target': this.bookKeeper.button,
					script: '%se#0.95,d#100;w#250;a#0,se#0,d#400;d#450',
					'isPaused': false
				}).onComplete(()=>{
					EventBus.emit('exitWelcomeScreen')
				})

				for(let sparky in this.sparkElements){
					if(this.sparkElements[sparky].blob){
						this.sparkElements[sparky].blob.banish();
					}

					let tween = new Effect({
						'target': this.sparkElements[sparky],
						'script': '%a#0,d#115',
						'isPaused': false
					});
				}

				let tween = new Effect({
					'target': this.bookKeeper.rainbow,
					'script': '%a#0,d#1150',
					'isPaused': false
				});

				let tween2 = new Effect({
					'target': this.bookKeeper.button,
					'script': '%se#0,d#1150',
					'isPaused': false
				});

				let tween3 = new Effect({
					'target': this.bookKeeper.jackpot,
					'script': '%a#0,d#1150',
					'isPaused': false
				});

			},
			'introAnimation': () => {
				let tween = new Effect({
					'target': this.bookKeeper.jackpot,
					'script': '%a#1,d#10;' +
						`p#:${this.bookKeeper.jackpot.y + 420},d#500;` +
						`p#:${this.bookKeeper.jackpot.y + 400},d#100`,
					'isPaused': false
				});

				tween =new Effect({
					'target': this.bookKeeper.button,
					'script': 'd#600%a#1,d#150',
					'isPaused': false
				});

				tween =new Effect({
					'target': this.bookKeeper.button,
					'script': 'd#600%se#0,d#1;se#1.1,d#500;se#1,d#150',
					'isPaused': false
				}).onComplete(()=>{
					this.bookKeeper.button.interactive = true;
					this.bookKeeper.button.disableCTA = false;
					Manager.setIdleTickerInterval(200);
					// set interval after initional idle
					Utils.delayedExecution(() => {
						Manager.setIdleTickerInterval(1000);
					}, 210)
				})

			},
			'exitWelcomeScreen': ()  => {
				this.destroy();
			}
		};
		EventBus.addListeners(events,this,this);
	}
}
export {
	EntranceExtended as Entrance
}