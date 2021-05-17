import {Utils, Money, LayoutScript, Interactions, Manager, Effect, EventBus, Layer, Elementary} from 'mws';
import script from './Game1Script.js';
class Game1 extends Layer{
	constructor(parent) {
		super(parent);
		this.isAnnounced = false;
		this.bookKeeper = new LayoutScript(script, this);
		this.symbols = [];
		this.count = 8;
		this.gameId = 0;

		let sparkler = [{"x":98,"y":108},{"x":114,"y":99},{"x":101,"y":110},{"x":100,"y":104},{"x":101,"y":111},{"x":103,"y":114},{"x":99,"y":105},{"x":116,"y":97},{"x":114,"y":100},{"x":110,"y":101},{"x":122,"y":109},{"x":100,"y":114},{"x":120,"y":103},{"x":105,"y":103},{"x":104,"y":101},{"x":102,"y":111},{"x":117,"y":100},{"x":117,"y":99},{"x":121,"y":106},{"x":100,"y":105},{"x":99,"y":108},{"x":106,"y":100},{"x":110,"y":98},{"x":117,"y":97},{"x":105,"y":101},{"x":121,"y":102},{"x":104,"y":101},{"x":101,"y":107},{"x":106,"y":101},{"x":123,"y":109},{"x":104,"y":102},{"x":107,"y":102},{"x":100,"y":103},{"x":100,"y":107},{"x":104,"y":103},{"x":99,"y":104},{"x":108,"y":100},{"x":104,"y":102},{"x":105,"y":102},{"x":115,"y":99},{"x":99,"y":110},{"x":103,"y":102},{"x":124,"y":109},{"x":119,"y":97},{"x":120,"y":100},{"x":112,"y":99},{"x":98,"y":105},{"x":108,"y":102},{"x":123,"y":109},{"x":99,"y":112},{"x":114,"y":99},{"x":99,"y":111},{"x":101,"y":111},{"x":116,"y":98},{"x":98,"y":106},{"x":100,"y":104},{"x":105,"y":103},{"x":101,"y":110},{"x":102,"y":103},{"x":100,"y":106},{"x":121,"y":104},{"x":122,"y":107},{"x":101,"y":112},{"x":124,"y":109},{"x":122,"y":108},{"x":103,"y":103},{"x":115,"y":98},{"x":121,"y":101},{"x":122,"y":109},{"x":108,"y":102},{"x":100,"y":107},{"x":124,"y":108},{"x":98,"y":108},{"x":111,"y":98},{"x":100,"y":115},{"x":116,"y":97},{"x":100,"y":112},{"x":98,"y":106},{"x":100,"y":111},{"x":105,"y":103},{"x":121,"y":106},{"x":108,"y":99},{"x":109,"y":100},{"x":100,"y":111},{"x":101,"y":102},{"x":101,"y":110},{"x":103,"y":101},{"x":98,"y":109},{"x":102,"y":112},{"x":122,"y":105},{"x":102,"y":104},{"x":103,"y":113},{"x":100,"y":111},{"x":100,"y":113},{"x":98,"y":108},{"x":98,"y":110},{"x":122,"y":105},{"x":121,"y":107},{"x":102,"y":111},{"x":101,"y":108}];
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
		for(let i = 0; i < 8; i++) {
			let symbol = this.getObj('cover', i , 'game1EntityClick');
			let symbolV = this.getObj('symbolValue', i);

			let symbolIdle = new Effect({
				target: symbol,
				script: 'rd#0%se#1.05,d#800;w#50,se#1,d#800'
			});
			game.customIdle.add(symbolIdle, this.gameId);

			let setup = Utils.getNewClovers({
				parent:symbolV.parent,
				startColor: "#27e867",
				endColor:"#2a663e",
				imagePool: ['clover','dot'],
				emitPointX: (symbolV.x + 25),
				emitPointY: (symbolV.y + 10)
			})

			let clovers = new mws.Elementary(setup);
			clovers.zIndex = symbolV.zIndex - 1;
			symbol.emitter = clovers.emitter;

			let index = i + 0;
			{
				let sparky = this.sparkElements[i];
				let randomIndex = Utils.getRandomInt (0, sparkler.length-1);
				sparky.orbital = sparkler[randomIndex];
				sparky.owner = symbol;
				sparky.x += sparky.owner.parent.x;
				sparky.y += sparky.owner.parent.y;

				var SparkEffect =  new mws.Effect({
					target: sparky,
					script: 'd#'+(300 + Utils.getRandomInt(500, 1000) * index)+',r#-1%a#0,se#0.1,r#0,d#1;a#1,se#'+(Utils.getRandomInt(4, 8)/10)+',rd#1,d#300;se#0,a#0,rd#0,d#300;w#2000',
					isPaused: false
				});

				SparkEffect.onRepeat(()=>{
					let randomIndex = Utils.getRandomInt(0, sparkler.length-1);
					sparky.orbital = sparkler[randomIndex];
					sparky.x += sparky.owner.parent.x;
					sparky.y += sparky.owner.parent.y;
				});

				sparky.blob = SparkEffect;
				symbol.spark = sparky;
			}

			this.symbols.push(symbol);
		}

		this.internalCounter = 0;
		this.revealed = {};
		this.revealedIdx = {};

		EventBus.on('gameStarted', () => {
			this.gameData = game.api.scenario.game1();
		});

		EventBus.on('game1EntityClick', (data) => {
			EventBus.emit('tweet' , "spc_game_1_reveal_v"+Utils.getRandomInt (1,4));
			EventBus.emit('restartIdleTicker');
			let symbol = this.symbols[data.i];
			if(symbol.revealed)
				return;

			this.interactive = true;
			this.count--;
			if(this.count <= 0){
				game.customIdle.drop(this.gameId);
			}

			game.customIdle.playOrder = this.gameId;

			let symbolData = this.gameData["symbols"][this.internalCounter++].symbol;
			let bookSymbol = 'symbolValue'+ ( data.i || "");
			let blobSymbol = 'blobs'+ ( data.i || "");
			if(this.revealed[symbolData]) {
				this.revealed[symbolData]++;
				this.revealedIdx[symbolData].push(data.i);
			}else{
				this.revealed[symbolData] = 1;
				this.revealedIdx[symbolData] = [data.i];
			}

			this.bookKeeper[bookSymbol].text = Money.format(symbolData/100 + '');
			this.bookKeeper[bookSymbol].quark.updateText();
			this.bookKeeper[bookSymbol].quark.anchor.set(0.5, 1);
			this.bookKeeper[bookSymbol].quark.updateText();
			this.bookKeeper[bookSymbol].scale = 0;
			this.bookKeeper[bookSymbol].rotation = 0;

			let effectBlob = new Effect({
				target: this.bookKeeper[blobSymbol],
				script: 'd#300,r#0%a#0,se#0.1,r#0,d#1;a#1,se#1.5,rd#30,d#250;se#0,a#0,rd#0,d#300',
				isPaused: false
			});

			symbol.spark.blob.banish();

			let sparkGone = new Effect({
				target: symbol.spark,
				script: '%a#0,d#100',
				isPaused: false
			});

			let effectText = new Effect({
				target: this.bookKeeper[bookSymbol],
				script: 'd#300,r#0%a#1,se#0.1,d#1;se#1.1,d#300;se#1,d#300',
				isPaused: false
			})

			symbol.revealed = true;
			symbol.zIndex += 10 + data.i;

			let symbolIndex = data.i;
			this.interactiveChildren = false;

			EventBus.emit('lockSymbols');
			Utils.delayedShout('unlockSymbols', game.lockTime);

			Utils.delayedExecution(()=>{
				symbol.emitter.playOnceAndDestroy();
			}, 500);

			symbol.interactive = false;
			let effect = new Effect({
				target: symbol,
				script: 'd#300,r#0%se#1.1,d#100;se#1,d#100;se#0.1,a#0,d#500',
				isPaused: false
			}).onComplete(()=>{
				symbol.revealedCompleted = true;
				this.check(symbol);
			});
		});

		EventBus.on('lockSymbols', () => {
			this.interactiveChildren = false;
		});

		EventBus.on('unlockSymbols', () =>{
			this.interactiveChildren = true;
		})

		EventBus.on('playButtonClick', () => {
			let tween3 = new Effect({
				'target': this,
				'script': 'd#1200%pd#:300,d#1;pi#:300,se#1.15,d#150;se#1,d#100',
				'isPaused': false
			});
		});

	}

	check() {
		if(this.isAnnounced){
			game.totalClickObject.count()
			return false;
		}

		let rotPerSize = {
			2: -11,
			3: -11,
			4: -11,
			6: -11,
			7: -11,
		}

		let fontPerSize = {
			2: 95,
			3: 90,
			4: 85,
			6: 80,
			7: 71,
		}

		let effect = false;

		for(let i in this.revealed) {
			if(this.revealed[i] === 3) {
				for(let k in this.revealedIdx[i]){
					let bookSymbol = 'symbolValue'+(this.revealedIdx[i][k]|| "");
					let realRot = rotPerSize[this.bookKeeper[bookSymbol].text.length];
					effect = new Effect({
						target: this.bookKeeper[bookSymbol],
						script: 'r#0%r#0,d#1;a#1,d#100;r#'+( realRot * Math.PI / 180)+',d#250',
						isPaused: false
					});

					let effect2 = new Effect({
						target: this.bookKeeper[bookSymbol],
						effect: 'pulse',
						isPaused: false
					});


					game.winLine.add(effect2.spirit, 'begining');
					this.bookKeeper[bookSymbol].font = {name:'mainGold', size:71};

					Utils.moveTo(this.bookKeeper[bookSymbol], 'tooltip', true);
				}
				// announce award ?
				this.isAnnounced = true;
			}
		}

		if(effect){
			EventBus.emit('tweet' , "spc_game_1_win_v1");
			effect.onComplete(()=>{
				game.totalClickObject.count()
				EventBus.emit('winMarked');
			});
			return true;
		}else{
			game.totalClickObject.count();
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
	Game1 as Game1
}