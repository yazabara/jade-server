$(function () {
	$(".nyan-cat").on('click', function () {
		eval("javascript:var a,b,c=['https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js','http://nyan.alternative.ly/css-transform.js','http://nyan.alternative.ly/jquery-rotate.js','http://nyan.alternative.ly/nyan.js'];for(a=0;a!=c.length;a++){b=document.createElement('script');b.src=c[a];document.body.appendChild(b);}void(0);")
		$(".nyan-cat").hide();
	})
});
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
$(function() {
	var canvas = document.getElementById("canvas");
	if (!canvas) {
		return;
	}
	var ctx = canvas.getContext("2d");
	var color = "black";
	var angle = 0;

	var center = new Point(canvas.height / 2, canvas.width / 2, 100);
	var side = 100;
	var halfSide = side / 2;

	var points = [new Point(center.x, center.y + halfSide, center.z),
	              new Point(center.x, center.y, center.z + halfSide),
				  new Point(center.x + halfSide, center.y, center.z),
				  new Point(center.x, center.y, center.z - halfSide),
				  new Point(center.x - halfSide, center.y, center.z),
				  new Point(center.x, center.y - halfSide, center.z)];

	var timer = window.setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var vertices = points.map(function(point) {
			return rotateAroundEachAxis(point, center, angle);
		});

		var edges = [
			[vertices[0], vertices[1]],
			[vertices[0], vertices[2]],
			[vertices[0], vertices[3]],
			[vertices[0], vertices[4]],
			[vertices[1], vertices[2]],
			[vertices[2], vertices[3]],
			[vertices[3], vertices[4]],
			[vertices[4], vertices[1]],
			[vertices[5], vertices[1]],
			[vertices[5], vertices[2]],
			[vertices[5], vertices[3]],
			[vertices[5], vertices[4]]
		];

		for (var i = 0; i < edges.length; i++) {
			var edge = edges[i];
			var start = edge[0];
			var end = edge[1];

			ctx.beginPath();

			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);

			ctx.closePath();
			ctx.strokeStyle = color;
			ctx.stroke();
		}

		angle += Math.PI / 300;
	}, 50);
});
function getCoordinatesFromEvent(e) {
	var offset = $(e.target).offset();
	var x = e.pageX - offset.left;
	var y = e.pageY - offset.top;
	
	return new Point(x, y);
}

function translate(point, dx, dy, dz) {
	return new Point(point.x + dx, point.y + dy, point.z + dz);
}

function rotateX(point, angle) {
	return new Point(point.x,
	                 point.y * Math.cos(angle) - point.z * Math.sin(angle),
					 point.y * Math.sin(angle) + point.z * Math.cos(angle));
}

function rotateY(point, angle) {
	return new Point(point.z * Math.sin(angle) + point.x * Math.cos(angle),
	                 point.y,
					 point.z * Math.cos(angle) - point.x * Math.sin(angle));
}

function rotateZ(point, angle) {
	return new Point(point.x * Math.cos(angle) - point.y * Math.sin(angle),
	                 point.x * Math.sin(angle) + point.y * Math.cos(angle),
					 point.z);
}

function rotateAroundEachAxis(point, origin, angle) {
	var translatedPoint = translate(point, -origin.x, -origin.y, -origin.z);
	var rotatedPoint = rotateZ(rotateY(rotateX(translatedPoint, angle), angle), angle);
	var resultPoint = translate(rotatedPoint, +origin.x, +origin.y, +origin.z);
	
	return resultPoint;
}