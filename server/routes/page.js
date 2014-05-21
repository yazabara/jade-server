define(['app'], function (app) {
	var path = require('path'),
		_ = require('underscore'),
		fs = require('fs'),
		url = require('url'),
		async = require('async');


	function renderPagePreview(req, res) {
		var name = req.params.page;
		tplPath = path.resolve('./jade/'+name);
		if (name == "favicon.ico") {
			return;
		}
		res.render(tplPath);
		console.log("rendering page: " + name);
	}
	
	function renderPageList (req, res) {
		getPagesList('./jade', function (err, list) {
			tplPath = path.resolve('server/templates/pagesList.jade');
			res.render(tplPath, {data : list});

            //log
            console.log("rendering page list: ");
            console.log("----------------");
            _.each(list, function(page){
                console.log(page.name);
            });
            console.log("----------------");
		});
	}
	
	function getPagesList(dirPath, callback) {
		fs.readdir(dirPath, function (err, data) {
			data = _.filter(data, function (filename) {
				return path.extname(filename) === '.jade';
			}).map(function (filename) {
				filename = path.basename(filename, '.jade');
				return {
					name: filename,
					url: url.resolve('/', filename)
				};
			});
			process.nextTick(function () {
				callback(null, data);
			});
		});
	}
	return {
		getPagesList: getPagesList,
		renderPagePreview: renderPagePreview,
		renderPageList: renderPageList
	};
});
