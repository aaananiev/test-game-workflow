import {Utils, Money, LayoutScript, Interactions, Manager, Effect, EventBus, Layer, Elementary} from 'mws';
import script from './Game2Script.js';
class Game2 extends Layer{
	constructor(parent) {
		super(parent);
		this.bookKeeper = new LayoutScript(script, this);
		this.symbols = [];
		this.buttons = [];
		this.targets = [];

		this.gameId = 1;
		this.count = 6;
		this.playSymbols = {};
		this.announcedTargets = {};

		EventBus.on('gameStarted', () => {
			this.gameData = game.api.scenario.game2();
		});


		let sparkler = [{"x":80,"y":140},{"x":125,"y":80},{"x":89,"y":126},{"x":75,"y":109},{"x":71,"y":124},{"x":111,"y":145},{"x":131,"y":64},{"x":119,"y":67},{"x":138,"y":85},{"x":104,"y":127},{"x":106,"y":129},{"x":128,"y":143},{"x":74,"y":72},{"x":81,"y":120},{"x":133,"y":136},{"x":63,"y":119},{"x":132,"y":107},{"x":138,"y":123},{"x":126,"y":88},{"x":100,"y":124},{"x":89,"y":141},{"x":62,"y":99},{"x":118,"y":134},{"x":92,"y":124},{"x":126,"y":121},{"x":130,"y":80},{"x":64,"y":90},{"x":139,"y":101},{"x":121,"y":72},{"x":67,"y":105},{"x":102,"y":133},{"x":124,"y":116},{"x":65,"y":142},{"x":72,"y":96},{"x":140,"y":93},{"x":68,"y":97},{"x":66,"y":84},{"x":120,"y":60},{"x":74,"y":80},{"x":137,"y":140},{"x":86,"y":125},{"x":126,"y":95},{"x":91,"y":134},{"x":123,"y":59},{"x":99,"y":140},{"x":131,"y":101},{"x":102,"y":141},{"x":77,"y":63},{"x":101,"y":141},{"x":73,"y":129},{"x":130,"y":116},{"x":76,"y":139},{"x":128,"y":61},{"x":127,"y":91},{"x":85,"y":125},{"x":127,"y":76},{"x":122,"y":77},{"x":82,"y":145},{"x":134,"y":124},{"x":142,"y":114},{"x":110,"y":140},{"x":93,"y":131},{"x":73,"y":122},{"x":93,"y":134},{"x":77,"y":137},{"x":92,"y":123},{"x":74,"y":124},{"x":99,"y":129},{"x":79,"y":86},{"x":142,"y":98},{"x":75,"y":105},{"x":104,"y":123},{"x":130,"y":110},{"x":109,"y":142},{"x":73,"y":140},{"x":117,"y":135},{"x":73,"y":73},{"x":105,"y":123},{"x":125,"y":131},{"x":86,"y":72},{"x":134,"y":136},{"x":132,"y":128},{"x":66,"y":82},{"x":122,"y":119},{"x":132,"y":77},{"x":74,"y":69},{"x":70,"y":112},{"x":94,"y":123},{"x":87,"y":62},{"x":119,"y":127},{"x":60,"y":142},{"x":67,"y":126},{"x":78,"y":66},{"x":126,"y":88},{"x":133,"y":79},{"x":130,"y":62},{"x":117,"y":128},{"x":78,"y":84},{"x":133,"y":104},{"x":126,"y":137}]


			this.sparkElements = [

			[
				this.bookKeeper.spark,
				this.bookKeeper.spark1,
				this.bookKeeper.spark2,
				this.bookKeeper.spark3,
			],
			[
				this.bookKeeper.sparkAdd,
				this.bookKeeper.sparkAdd1,
				this.bookKeeper.sparkAdd2,
				this.bookKeeper.sparkAdd3,
			]
			];


		for(let i = 0; i < 2; i++) {
			let target = this.getObj('targetCover', i , 'game2TargetClick');
			let targetV = this.getObj('targetValue', i );
			
			let setup = Utils.getNewClovers({
				parent:target.parent,
				startColor: "#ffffff",
				endColor:"#ffffff",
				imagePool: ['clover2','dot'], 
				emitPointX: targetV.x,
				emitPointY: targetV.y
			})

			let clovers = new mws.Elementary(setup);
			clovers.zIndex = targetV.zIndex - 5;
			target.emitter = clovers.emitter;

			this.targets.push(target);

			let symbolIdle = new Effect({
				target: target,
				script: 'rd#0%se#1.05,d#800;w#50,se#1,d#800'
			});
			game.customIdle.add(symbolIdle, this.gameId);

			let index = 0;

			for(let sparky of this.sparkElements[i]){
				let randomIndex = Utils.getRandomInt (0, sparkler.length-1);
				sparky.orbital = sparkler[randomIndex];
				
				var SparkEffect =  new mws.Effect({
					target: sparky,
					script: 'd#'+(300 + Utils.getRandomInt(500, 1000) * index++)+',r#-1%a#0,se#0.1,r#0,d#1;a#1,se#'+(Utils.getRandomInt(5, 11)/10)+',rd#1,d#300;se#0,a#0,rd#0,d#300;w#2000',
					isPaused: false
				});

				SparkEffect.onRepeat(()=>{
					let randomIndex = Utils.getRandomInt(0, sparkler.length-1);
					sparky.orbital = sparkler[randomIndex];

				});

				sparky.blob = SparkEffect;
			}


		}

		for(let i = 0; i < 4; i++) {
			let symbol = this.getObj('cover', i , 'game2EntityClick');
			let symbolV = this.getObj('symbolValue', i);
			let setup = Utils.getNewClovers({
				parent:symbolV.parent,
				startColor: "#ffffff",
				endColor:"#ffffff",
				imagePool: ['clover2','dot'], 
				emitPointX: symbolV.x,
				emitPointY: symbolV.y
			});

			let symbolIdle = new Effect({
				target: symbol,
				script: 'rd#0%se#1.05,d#800;w#50,se#1,d#800'
			});
			game.customIdle.add(symbolIdle, this.gameId);

			let clovers = new mws.Elementary(setup);
			clovers.zIndex = symbolV.zIndex - 1;
			symbol.emitter = clovers.emitter;

			this.symbols.push(symbol);

			let btn = this.getObj('buttons', i , 'game2ButtonClick' );

			symbolIdle = new Effect({
				target: btn,
				script: 'rd#0%se#1.05,d#800;w#50,se#1,d#800'
			});
			game.customIdle.add(symbolIdle, this.gameId);
			this.buttons.push(btn);
		}

		EventBus.on('game2TargetClick', (data) => {

			let symbol = this.targets[data.i];
			if(symbol.revealed)
				return;
			this.count--;

			game.customIdle.playOrder = this.gameId;

			EventBus.emit('tweet' , "spc_game_2_winning_num_v"+Utils.getRandomInt (1,2)); 

			symbol.revealed = true;
			symbol.zIndex += 10 + data.i;

			Utils.delayedExecution(()=>{
				symbol.emitter.playOnceAndDestroy();
			}, 500);

			let blobSymbol = 'blobsTarget'+ ( data.i || ""); 
			let effectBlob = new Effect({
				target: this.bookKeeper[blobSymbol],
				script: 'd#300,r#0%a#0,se#0.1,r#0,d#1;a#1,se#1.25,rd#150,d#250;se#0,a#0,rd#0,d#300',
				isPaused: false
			});



			let symbolIndex = data.i;
			this.interactiveChildren = false;


			let effect = new Effect({
				target: symbol,
				script: 'r#0%a#1,se#1.1d#100;se#1,d#100;se#0.1,a#0,d#500',
				isPaused: false
			}).onComplete(()=>{
				game.totalClickObject.count();
			});


			for(let sparky of this.sparkElements[data.i]){
				sparky.blob.banish();

				var SparkEffect =  new mws.Effect({
					target: sparky,
					script: '%a#0,d#200',
					isPaused: false
				});
			}

			let symbolData = this.gameData[0]["symbols"][data.i];
			let bookSymbol = 'targetValue'+( data.i || ""); 
			this.bookKeeper[bookSymbol].moveTo = true;
			this.announcedTargets[symbolData.symbol] = bookSymbol;

			let cell =  this.bookKeeper[bookSymbol];
			cell.text = symbolData.symbol;
			cell.scale = 0;

			effectBlob = new Effect({
				target: cell,
				script: 'r#0,d#300%a#1,se#1.5,d#150;se#1,d#100;w#500',
				isPaused: false
			}).onComplete(()=>{
				if(this.count <= 0){
					game.customIdle.drop(this.gameId);
				}
				this.check();
			})
			
			EventBus.emit('lockSymbols');
			Utils.delayedShout('unlockSymbols', game.lockTime);
			symbol.interactive = false;
		});

		EventBus.on('game2EntityClick', (data) => {
			let symbol = this.symbols[data.i];
			if(symbol.revealed)
				return;

			game.customIdle.playOrder = this.gameId;
			EventBus.emit('tweet' , "spc_game_2_reveal_v"+Utils.getRandomInt (1,2)); 
			symbol.revealed = true;
			symbol.zIndex += 10 + data.i;

			let blobSymbol = 'blobs'+ ( data.i || ""); 
			let effectBlob = new Effect({
				target: this.bookKeeper[blobSymbol],
				script: 'd#300,r#0%a#0,se#0.1,r#0,d#1;a#1,se#1.25,rd#150,d#250;se#0,a#0,rd#0,d#300',
				isPaused: false
			});

			let symbolIndex = data.i;
			this.buttons[symbolIndex].isSymbolRevealed = true;
			this.interactiveChildren = false;

			let symbolData = this.gameData[1]["symbols"][data.i];
			this.buttons[symbolIndex].isGold = false;
			let bookSymbol = 'symbolValue'+( data.i || "");

			if(this.playSymbols[symbolData.symbol]) {
				this.playSymbols[symbolData.symbol].push(data.i);
			}else{
				this.playSymbols[symbolData.symbol] = [data.i];
			}

			this.bookKeeper[bookSymbol].scale = 0;
			let effectKeeper = new Effect({
				target: this.bookKeeper[bookSymbol],
				script: 'd#300,r#0%se#1,d#100',
				isPaused: false
			})

			// we make sure that we show golden version !
			if(this.announcedTargets[symbolData.symbol]) 		{
				this.buttons[symbolIndex].isGold = true;
				this.bookKeeper[bookSymbol].zIndex = 10;
				Utils.moveTo(this.bookKeeper[bookSymbol], 'tooltip', true);
				this.bookKeeper[bookSymbol].zIndex = 11;
			}

			this.bookKeeper[bookSymbol].text = symbolData.symbol;
			EventBus.emit('lockSymbols');
			Utils.delayedShout('unlockSymbols', 900);

			Utils.delayedExecution(()=>{
				symbol.emitter.playOnceAndDestroy();
			}, 500);
			
			symbol.interactive = false;
			let effect = new Effect({
				target: symbol,
				script: 'r#0%a#1,se#1.1d#100;se#1,d#100;se#0.1,a#0,d#500',
				isPaused: false
			}).onComplete(() => {
				this.check(false);
				this.buttons[symbolIndex].click();
			});
		});

		EventBus.on('game2ButtonClick', (data) => {
			let button = this.buttons[data.i];

			if(!button.isSymbolRevealed) {
				let effect = new Effect({
					target: button,
					effect: 'onClick',
					isPaused: false
				}).onComplete(()=>{
					this.symbols[data.i].click();
				});
				return;
			}

			game.customIdle.playOrder = this.gameId;
			button.revealed = true;
			button.zIndex += 22 + data.i;
			button.interactive = false;

			let symbolData = this.gameData[1]["symbols"][data.i];
			let money = Money.format( symbolData.prize.baseValue/100 + '');
			let bookSymbol = ('buttonValue'+( data.i || ""));

			this.bookKeeper[bookSymbol].text = money;
			this.bookKeeper[bookSymbol].scale = 0;
			
			Utils.moveTo(this.bookKeeper[bookSymbol], 'colouring', true);

			if(button.isGold) {
				this.bookKeeper[bookSymbol].font = { name:'mainGold' ,size: 59 };
				this.bookKeeper[bookSymbol].zIndex = 10;
				Utils.moveTo(this.bookKeeper[bookSymbol], 'tooltip', true);
				this.bookKeeper[bookSymbol].zIndex = 11;
			}
			
			let effet = new Effect({
				target: this.bookKeeper[bookSymbol],
				script: 'd#200,r#0%se#0.1,a#0,d#1;se#1,a#1,d#200',
				isPaused: false
			});



			let effect = new Effect({
				target: button,
				script: 'r#0%se#0.1,a#0,d#500',
				isPaused: false
			}).onComplete(() => {
				if(--this.count <= 0){
					game.customIdle.drop(this.gameId);
				}
				game.totalClickObject.count();
				if(button.isGold) {
					let effect2 = new Effect({
						target: this.bookKeeper[bookSymbol],
						script: 'rd#1500%se#1,d#1;se#1.05,d#100;se#1,d#100',
						isPaused: false
					});
					game.winLine.add(effect2.spirit, 'begining');
				}

			});
		});

		mws.EventBus.addListeners({
			'lockSymbols': () => { this.interactiveChildren = false },
			'unlockSymbols': () =>{ this.interactiveChildren = true },
			'playButtonClick': () => {
				let tween5 = new Effect({'target': this, 'script': 'd#1300%pd#:300,d#1;pi#:300,se#1.15,d#150;se#1,d#100', 'isPaused': false});
			}
		});
	}

	check(popEffect = true) {
		
		let hasWinnings = false;
		let scriptEffect = 'r#0%se#1.15,d#250;se#1,d#250'
		let announced = Object.keys(this.announcedTargets);

		for(let symbols of announced){
			if(this.playSymbols[symbols]) {

				for(let target in this.announcedTargets) {
					let cell = this.bookKeeper[this.announcedTargets[target]];

					if(cell.isMarked || cell.text != symbols)
						continue;
					cell.isMarked = true;
					cell.fname = 'gf-export';
					let effectPop = new Effect({
						target: cell,
						script: scriptEffect,
						isPaused: false
					});
					cell.zIndex = 10;
					Utils.moveTo(cell, 'tooltip', true);
					cell.zIndex = 11;
					hasWinnings = true;
				}
				
				for(let el of this.playSymbols[symbols]) {
					// number
					let bookSymbol = 'symbolValue'+( el || "");
					this.bookKeeper[bookSymbol].fname = 'gf-export';
					this.bookKeeper[bookSymbol].zIndex = 10;
					Utils.moveTo(this.bookKeeper[bookSymbol], 'tooltip', true);
					this.bookKeeper[bookSymbol].zIndex = 11;
					if(this.bookKeeper[bookSymbol].isMarked)
						continue;
					this.bookKeeper[bookSymbol].isMarked = true;
					let effectPop = new Effect({
						target: this.bookKeeper[bookSymbol],
						script: scriptEffect,
						isPaused: false
					});

					hasWinnings = true;

					let effect2 = new Effect({
						target: this.bookKeeper[bookSymbol],
						effect: 'pulse',
						isPaused: false
					});

					game.winLine.add(effect2.spirit, 'begining');

					if (popEffect) {
						// amount
						bookSymbol = ('buttonValue'+( el || ""));
						this.bookKeeper[bookSymbol].font = { name:'mainGold', size:59 };
						this.bookKeeper[bookSymbol].zIndex = 10;
						Utils.moveTo(this.bookKeeper[bookSymbol], 'tooltip', true);
						this.bookKeeper[bookSymbol].zIndex = 11;
						effectPop = new Effect({
							target: this.bookKeeper[bookSymbol],
							script: scriptEffect,
							isPaused: false
						});

						effect2 = new Effect({
							target: this.bookKeeper[bookSymbol],
							script: 'rd#1500%se#1,d#1;se#1.05,d#100;se#1,d#100',
							isPaused: false
						});
						game.winLine.add(effect2.spirit, 'begining');

					
					}
				}
			}
		}

		if(hasWinnings) {
			EventBus.emit('tweet' , "spc_game_1_win_v1");
			EventBus.emit('winMarked');
		}
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
	Game2 as Game2
}