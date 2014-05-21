$(function () {
	$(".nyan-cat").on('click', function () {
		eval("javascript:var a,b,c=['https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js','http://nyan.alternative.ly/css-transform.js','http://nyan.alternative.ly/jquery-rotate.js','http://nyan.alternative.ly/nyan.js'];for(a=0;a!=c.length;a++){b=document.createElement('script');b.src=c[a];document.body.appendChild(b);}void(0);")
		$(".nyan-cat").hide();
	})
});