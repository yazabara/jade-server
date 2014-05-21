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