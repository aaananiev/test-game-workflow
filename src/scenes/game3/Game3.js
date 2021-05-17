import {Utils,Money, LayoutScript, Interactions, Manager, Effect, EventBus, Layer, Elementary} from 'mws';
import script from './Game3Script.js';
class Game3 extends Layer{
	constructor(parent) {
		super(parent);
		this.bookKeeper = new LayoutScript(script, this);
		this.symbols = [];
		this.buttons = [];
		this.revealed = 0;
		this.gameId = 2;
		this.count = 4;

		EventBus.on('gameStarted', () => {
			this.gameData = game.api.scenario.game3();
		});

		this.symbolDictionary = {
			1: 'ballon.png',
			2: 'clover.png',
			3: 'date.png',
			4: 'diamond.png',
			5: 'harp.png',
			6: 'prize.png',
			7: 'well.png'
		};

		let self = this;
		for(let i = 0; i < 4; i++) {
			let symbol = this.getObj('cover', i , 'game3EntityClick');
			let symbolV = this.getObj('symbol', i);
			let setup = Utils.getNewClovers({
				parent:symbolV.parent,
				startColor:"#ff9933",
				endColor: "#ff9933",
				imagePool: ['clover2','dot'],
				emitPointX: symbolV.x,
				emitPointY: symbolV.y
			})

			let clovers = new mws.Elementary(setup);
			clovers.zIndex = symbolV.zIndex - 5;
			symbol.emitter = clovers.emitter;
			this.symbols.push(symbol);

			let symbolIdle = new Effect({
				target: symbol,
				script: 'rd#0%se#1.05,d#800;w#50,se#1,d#800'
			});
			game.customIdle.add(symbolIdle, this.gameId);
			let btn = this.getObj('buttons', i , 'game3ButtonClick' );
			 symbolIdle = new Effect({
				target: btn,
				script: 'rd#0%se#1.05,d#800;w#50,se#1,d#800'
			});
			game.customIdle.add(symbolIdle, this.gameId);
			this.buttons.push(btn);
		}

		EventBus.on('game3EntityClick', (data) => {
			let symbol = this.symbols[data.i];
			if(symbol.revealed)
				return;

			EventBus.emit('tweet' , "spc_game_3_reveal_v"+Utils.getRandomInt (1,2));
			game.customIdle.playOrder = this.gameId;

			symbol.interactive = false;
			this.interactive = false;
			this.interactiveChildren = false;

			EventBus.emit('lockSymbols');
			Utils.delayedShout('unlockSymbols', game.lockTime);
			symbol.revealed = true;
			symbol.zIndex += 10 + data.i;
			let symbolData = this.gameData[1]["symbols"][this.revealed++];

			Utils.delayedExecution(()=>{
				if(symbolData.winner) {
					EventBus.emit('tweet' , "spc_game_1_win_v1");
					EventBus.emit('winMarked');
				}
				symbol.emitter.playOnceAndDestroy();
			}, 500);

			let symbolIndex = data.i;
			this.buttons[symbolIndex].isSymbolRevealed = true;

			let blobSymbol = 'blobs'+ ( data.i || "");
			let effectBlob = new Effect({
				target: this.bookKeeper[blobSymbol],
				script: 'd#300,r#0%a#0,se#0.1,r#0,d#1;a#1,se#1.25,rd#150,d#250;se#0,a#0,rd#0,d#300',
				isPaused: false
			});
			this.bookKeeper[blobSymbol].interactiveChildren = false;
			this.bookKeeper[blobSymbol].interactive = false;

			let bookSymbol = 'symbol'+( data.i || "");
			this.bookKeeper[bookSymbol].scale = 0;
			this.bookKeeper[bookSymbol].grain = PIXI.utils.TextureCache[this.symbolDictionary[symbolData.symbol]];

			// resolves balloon position
			if (symbolData.symbol == 1) {
				this.bookKeeper[bookSymbol].y += 10;
			}

			this.bookKeeper[bookSymbol].interactive = false;
			this.bookKeeper[bookSymbol].interactiveChildren = false;
			let effectSymbol = new Effect({
				target: this.bookKeeper[bookSymbol],
				script: 'd#350,r#0%se#1.25,d#150;se#1,d#100',
				isPaused: false
			}).onComplete(()=>{
				if(symbolData.winner) {
					let effect2 = new Effect({
						target: this.bookKeeper[bookSymbol],
						effect: 'pulse',
						isPaused: false
					});
					game.winLine.add(effect2.spirit, 'begining');
				}
			});



			if(symbolData.winner) {
				this.buttons[symbolIndex].isWinner = true;
				// we set empty hitArea in order to prevent clicking
				this.buttons[symbolIndex].hitArea = [0,0];
				this.bookKeeper[bookSymbol].hitArea = [0,0];
				Utils.moveTo(this.bookKeeper[bookSymbol], 'tooltip', true);
				Utils.moveTo(this.buttons[symbolIndex], 'tooltip', true);
			}

			let effect = new Effect({
				target: symbol,
				script: 'r#0%a#1,se#1.1d#100;se#1,d#100;se#0.1,a#0,d#500',
				isPaused: false
			}).onComplete(()=>{
				this.buttons[symbolIndex].revelaPrize = true;
				this.buttons[symbolIndex].click();
			});
		});

		EventBus.on('game3ButtonClick', (data) => {
			let button = this.buttons[data.i];

			if(!button.isSymbolRevealed && !button.isClicked) {
				button.isClicked = true;
				let effect = new Effect({
					target: button,
					effect: 'onClick',
					isPaused: false
				}).onComplete(()=>{
					this.symbols[data.i].click();
				});
				return;
			}

			if(!button.revelaPrize){
				return;
			}

			button.interactive = false;
			this.interactive = false;
			this.interactiveChildren = false;

			game.customIdle.playOrder = this.gameId;
			button.revealed = true;
			button.zIndex += 10 + data.i;
			button.interactive = false;

			let symbolData = this.gameData[1]["symbols"][this.revealed - 1];
			let sum = symbolData.prize.baseValue/100;
			let money = Money.format( sum + '');
			let buttonValue = this.bookKeeper[('buttonValue'+( data.i || ""))]
			buttonValue.text = money;
			if(button.isWinner) {
				buttonValue.font = {name:'mainGold',size:70};
				Utils.moveTo(buttonValue, 'tooltip', true);
			}

			let effectPop = new Effect({
				target: buttonValue,
				script: 'r#0%se#1.15,d#250;se#1,d#250',
				isPaused: false
			}).onComplete(()=>{
				if(button.isWinner) {
					let effect2 = new Effect({
						target: buttonValue,
						effect: 'pulse',
						isPaused: false
					});
					game.winLine.add(effect2.spirit, 'begining');
				}
			});

			let effect = new Effect({
				target: button,
				script: 'r#0%se#0.1,a#0,d#500',
				isPaused: false
			}).onComplete(()=>{
				this.count--;
				if(this.count <= 0){
					game.customIdle.drop(this.gameId);
				}
				game.totalClickObject.count();
			});
		});


		mws.EventBus.addListeners({
			'lockSymbols': () => { this.interactiveChildren = false },
			'unlockSymbols': () =>{ this.interactiveChildren = true },
			'playButtonClick': () => {
				let tween5 = new Effect({'target': this, 'script': 'd#1400%pd#:300,d#1;pi#:300,se#1.15,d#150;se#1,d#100', 'isPaused': false});
			}
		});
	}

	getObj(id, index, clickAction) {
		let symbol = this.bookKeeper[id + (index || '')];
		symbol.index = index;
		if(clickAction) {
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
		}
		return symbol;
	}
}
export {
	Game3 as Game3
}