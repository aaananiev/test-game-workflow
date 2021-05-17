const losingTier = -1;
import {Memory, Random, Utils} from 'mws';
class Api {
	constructor(seed, tier, gameMode) {
		this.seed = seed;
		this.tier = tier;
		this.gameMode = gameMode;

		this.gameJSON = Memory.retrive('loaded_gameJSON').data;
		this.retriveRawConfig();
		// record seed, tier and mode in order to be used in Egress module
		Memory.push('seed', this.seed, true, true); 
		Memory.push('tier', this.tier, true, true);
		Memory.push('mode', this.gameMode.toUpperCase(), true, true);

		Random.setSeed(this.seed * 1);
	}

	set scenario(data) {
		this._scenario = data;
	}

	get scenario(){
		return this._scenario;
	}

	static rawConfig() {

		let tier = Memory.retrive('tier');
		let seed = Memory.retrive('seed') || Utils.getRandomInt(0,Math.pow(10,10));
		let mode = (Memory.retrive('mode') || 'NORMAL').toUpperCase();

		let playResponse;
		try {
			playResponse = JSON.parse(document.getElementById('game-configuration').innerHTML);
		} catch (e){
			// if game-configuration is missing.
		}
		if(process.env.MODE !== 'production' || process.env.MWS_ORDER_66) {
			console.warn('beware config is retrieved from URL')
		} else {
			tier = playResponse.winningPrizeIndex;
			mode = playResponse.playMode;
			seed = playResponse.seed;
		}

		if(tier > 32 || tier < 0 || isNaN(tier) || tier === null) {
			tier = losingTier;
		}

		Memory.push('seed', seed, true, true); 
		Memory.push('mode', mode.toUpperCase(), true, true);
		Memory.push('tier', tier, true, true);
		Random.setSeed(seed * 1);
	}

	retriveRawConfig() {
		try {
			this.playResponse = JSON.parse(document.getElementById('game-configuration').innerHTML);
		} catch (e){
			// if game-configuration is missing.
		}
		if(process.env.MODE !== 'production' || process.env.MWS_ORDER_66) {
			console.warn('beware config is retrieved from URL')
		} else {
			this.tier = this.playResponse.winningPrizeIndex;
			this.seed = this.playResponse.seed;
			this.gameMode = this.playResponse.playMode;
		}
	}

	initSettings() {
		// console.log(this.scenario)
		this.result = {};
		this.matchWords = {}	
		this.matchLetters = {};
		this.grid = {};
		this.allWords = {};
		this.turnLetters = {};
		this.instantWinValue = {};

		this.result.totalWin = {};
		this.result.isWinner = {};

		Memory.push('amount', this.scenario.totalValue(), true, true);
		Memory.push('isWinning', (this.scenario.totalValue() > 0),true, true);
	}
};
mws.Api = Api;