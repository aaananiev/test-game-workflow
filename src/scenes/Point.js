import {Utils} from 'mws';
import Constraint from './Constraint.js';
export default class Point {

	constructor (x, y) {
		this.x = x
		this.y = y
		this.px = x
		this.py = y
		this.vx = 0
		this.vy = 0
		this.pinX = null
		this.pinY = null
		this.isChanded = false;

		this.constraints = []

		this.maxWidth = 1334;
		this.maxHeight = 750;

		this.opts = {
  gravity: 150,
  friction: 0.99,
  bounce: 0.15,
  pointsX: 12,
  pointsY: 11,
  renderCloth: true,
  pinCorners: true,
};


	}

	update (delta) {
		if(!(TweenMax.globalTimeScale() > 0)){
			return
		}
	
		if (this.pinX && this.pinY) 
			return this

		this.addForce(0, this.opts.gravity)

		let nx = this.x + (this.x - this.px) * this.opts.friction + this.vx * delta
		let ny = this.y + (this.y - this.py) * this.opts.friction + this.vy * delta

		this.px = this.x
		this.py = this.y

		this.x = nx
		this.y = ny

		this.vy = this.vx = 0

		if (this.x >= this.maxWidth) {

			this.px = this.maxWidth + (this.maxWidth - this.px) * this.opts.bounce
			this.x = this.maxWidth
		} else if (this.x <= 0) {
			this.px *= -1 * this.opts.bounce
			this.x = 0
		}

		if (this.y >= this.maxHeight) {
			this.py = this.maxHeight + (this.maxHeight - this.py) * this.opts.bounce
			this.y = this.maxHeight
		} else if (this.y <= 0) {
			this.py *= -1 * this.opts.bounce
			this.y = 0
		}

		if(!this.isChanded){
			this.isChanded = true;
			Utils.delayedExecution(() => {
				let multipl = 1;
				if (Math.random() * 1000 > 500 ){
					multipl = -1;
				}

				if (Math.random() * 1000 > 500 ){
					this.vx = mws.Utils.getRandomInt(50,200);
					this.vy = mws.Utils.getRandomInt(50,200);

					this.opts.bounce = Math.random() * 10;
				}else{
					this.vy = mws.Utils.getRandomInt(50,200);
					this.vx = mws.Utils.getRandomInt(50,200);

					this.opts.bounce = Math.random() * 10;
				}
				this.px -= this.x * (Math.random() * 10)/ 1000 * multipl;
				this.py += this.y *  (Math.random() * 1)/ 100 * multipl;
				this.x += this.x *  (Math.random() * 1)/ 100 * multipl;
				this.y += this.y *  (Math.random() * 1)/ 100 * multipl;
				
				Utils.delayedExecution(() => {
					this.isChanded = false
				}, 2500);
			}, 2000);
		}


		return this
	}

	resolve () {
		if (this.pinX && this.pinY) {
			this.x = this.pinX
			this.y = this.pinY
			return
		}

		this.constraints.forEach((constraint) => constraint.resolve())
	}

	attach (point) {
		this.constraints.push(new Constraint(this, point))
	}

	free (constraint) {
		this.constraints.splice(this.constraints.indexOf(constraint), 1)
	}

	addForce (x, y) {
		this.vx += x
		this.vy += y
	}

	pin (pinx, piny) {
		this.pinX = pinx
		this.pinY = piny
	}
	
	unpin(){
		this.pinX = null;
		this.pinY = null;
	}
}
