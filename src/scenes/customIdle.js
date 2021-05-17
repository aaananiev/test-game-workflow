import { EventBus } from 'mws';
export default class customIdle {
	constructor () {
		this.idleAniamtion = 1650;
		this.pulseCount = 2;
		this.singleIdle = 1000;
		this.started = false;
		this.preventIdle = false;
		this.playOrder = 0;
		this.maxCount = 0;
		this.tail = {};
		this.tailline = {};

		EventBus.on('showInfo', (data) => {
			this.preventIdle = true;
			if (this.started) {
				this.reset();
			}
		},this);

		EventBus.on('infoClose', (data) => {
			this.preventIdle = false;
		}, this);

		EventBus.on('stopCTA', (data) => {
			this.reset();
		});

		EventBus.on('interaction', (data) => {
			this.reset();
		},this);

		EventBus.on('settingChange', (data) => {
			if (data.value === 'menu_open') {
				if (this.started) {
					this.reset();
				}
				this.preventIdle = true;
			} else if(data.value === 'menu_close') {
				this.preventIdle = false;
			}
		},this);

		EventBus.on('startCTA', () => {
			if(this.preventIdle)
				return;

			if(!this.started){
				this.reset();
				this.start();
				this.started = true;
			}
		});
	}

	add (element, game = 0) {
		if(!this.tail['el' + game]) {
			this.tail['el' + game] = [];

			this.tailline['el' + game] = new TimelineMax();
			this.tailline['el' + game].paused(true);
			this.tailline['el' + game].delay(0 + this.pulseCount * (this.singleIdle + this.idleAniamtion) * game);
			this.tailline['el' + game].repeatDelay(this.singleIdle);
			this.tailline['el' + game].repeat(-1);
			this.tailline['el' + game].add('begining', "+=0");
		}
		
		this.tail['el' + game].push( element );
		this.maxCount = Object.keys(this.tail).length;

	}

	set maxCount( maxCount ){
		this.count = maxCount;
	}

	get maxCount(){
		return this.count;
	}


	// 0 - startFrom game 1 
	set playOrder( startFrom = 0 ) {
		this._playOrder = startFrom;
	}

	get playOrder() {
		return this._playOrder;
	}

	drop( game ) {
		if(game >= 0 ){
			for(let el in this.tail['el' + game]){		
				this.tail['el' + game][el].banish();
			}
			this.tail['el' + game] = null;
			delete this.tail['el' + game];
		}
	}

	idleLogic() {

		let timeOrder = 0;

		let keys = Object.keys(this.tail);
		let values = Object.values(this.tail);
		let maxCount = keys.length;

		let start = keys.indexOf('el' + this.playOrder);
		if(start < 0){
			start = this.playOrder;
		}


		for(let i = start; i < maxCount; i ++) {
			for(let el in values[i]){
				values[i][el].spirit.restart();
				this.tailline['el'+timeOrder].add(values[i][el].spirit, 'begining');
			}
			timeOrder++;
		}

		// we add reset idles in order to keep the whole idle sequence 
		if( this.playOrder > 0) {
			for(let i = 0; i < start; i ++) {
				for(let el in values[i]){
					values[i][el].spirit.restart();
					this.tailline['el'+timeOrder].add(values[i][el].spirit, 'begining');
				}
				timeOrder++
			}
		}
	}

	reset() {
		for(let i =0; i < this.maxCount; i++){
			this.tailline['el'+i].restart(true);
			this.tailline['el'+i].clear();
			this.tailline['el'+i].paused(true);
		}
		// we restore idle logic
		this.idleLogic();
		this.started = false;
	}

	start() {
		for(let i =0; i < this.maxCount; i++){
			this.tailline['el'+i].delay(0 + this.pulseCount * (this.singleIdle + this.idleAniamtion) * i);
			this.tailline['el'+i].restart(true);
			this.tailline['el'+i].paused(false);
		}
	}
}