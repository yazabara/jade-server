define(['require', 'express'], function (require, express) {
    var app = express();
    app.set('port', 8859);
    app.set('staticFolder', './public/');
    app.set('allowedExt', {
        'html' : true,
        'htm'  : true
    });
    app.set('views', './jade');
    app.set('view engine', 'jade');
    app.use(express.static( app.get('staticFolder') ));
    return app;
});
