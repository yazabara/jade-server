var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(['app', 'http', 'routes/main'], function (app, http, mainRouter) {
    mainRouter(app);
    var server = http.createServer(app);
    server.listen(app.get('port'), function (err) {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
