var Dot = require('../models/dot').Dot;

module.exports = function (app) {
    app.get('/', index);
    app.get('/admin', admin);
    app.get('/dots', sendDots);

    app.post('/dot', saveDot);
    app.put('/dot/*', saveDot);
    app.delete('/dot/*', destroyDot);
};

var index = function (req, res) {
    res.render('index', { title: 'Node Boilerplate' });
};

var admin = function (req, res) {
    res.render('admin', { title: 'Node Admin' });
};

var sendDots = function (req, res) {
    Dot.find(function (err, person) {
        if (err) return handleError(err);
        res.end(JSON.stringify(person));
    });
};

var saveDot = function (req, res) {
    req.on("data", function (data) {
        var dotId = req.route;
        var dot = new Dot(JSON.parse(data));
        console.log(dotId);

        dot.save(function (err, dot, affected) {
            console.log(arguments);
            if (err) throw err;
        });
    });

    console.log("Dot added on server");
    res.end("Dot added on server");
};

var destroyDot = function (req, res) {
    var dotId = req.route.params[0];

    Dot.remove({ id: dotId }, function (err) {
        if (err) throw err;
    });

    console.log("Dot removed from server");
    res.end("Dot removed from server");
};