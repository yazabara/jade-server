function Point(x, y, z, color) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.color = color || "black";
}

Point.prototype.draw = function(context) {
	context.save();
	
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
	context.closePath();
	context.fill();
	
	context.restore();
};