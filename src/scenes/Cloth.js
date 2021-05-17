import Point from './Point.js';
export default class Cloth {
	constructor (clothX, clothY, free) {
		this.points = [];
		this.meshRegister = [];
		this.accuracy = 14; 
		this.spacingX = 10;
		this.spacingY = 11;

		let startX =0.01;
		let startY =0.01;

		for (let y = 0; y <= clothY; y++) {
			for (let x = 0; x <= clothX; x++) {
				let point = new Point(
					startX + x * this.spacingX - (this.spacingX * Math.sin(y) ), 
					y * this.spacingY + startY + ( y !== 0 ? 5 * Math.cos(x) : 0 )
				)
				!free && y === 0 && point.pin(point.x, point.y)
				x !== 0 && point.attach(this.points[this.points.length - 1])
				y !== 0 && point.attach(this.points[x + (y - 1) * (clothX + 1)])

				this.points.push(point)
			}
		}

		TweenMax.ticker.addEventListener("tick", () => {
			if(TweenMax.globalTimeScale() > 0){
				this.update(0.09) 
			}
		});
	}

	addMesh( mesh ){
		this.meshRegister.push(mesh);
	}

	update (delta) {
		if(!(TweenMax.globalTimeScale() > 0)){
			return;
		}
		let i = this.accuracy;
		while (i--) {
			this.points.forEach((point) => {
				point.resolve()
			})
		}

		let updateDelta = delta * delta;
		this.points.forEach((point,i) => {
			point.update(updateDelta);
		});

		if(this.meshRegister instanceof Array) {
			this.meshRegister.forEach((mesh,z) => {
				this.points.forEach((point,i) => {
					if (mesh) {
						i *= 2;
						mesh.geometry.getBuffer('aVertexPosition').data[i] = point.x
						mesh.geometry.getBuffer('aVertexPosition').data[i + 1] = point.y;
					}
				});
				mesh.geometry.buffers[0]._updateID++;
			});
		}
	}
}