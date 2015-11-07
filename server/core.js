var express = require('express'),
    elasticsearch = require('elasticsearch'),
    bodyParser = require('body-parser'),
    story = require('./story');

var app = express();

var elasticsearchEndpoint = "52.32.221.20:9200";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// init elasticsearch
var esClient = new elasticsearch.Client({
        host: elasticsearchEndpoint
});

app.post('/story', function (req, res) {
    if(!req.body) {
        res.send('failure');
        return;
    }
    story.create(esClient, req.body);
    res.send('success');
});

app.get('/story', function(req, res) {
    if(!Object.keys(req.query).length || req.query.id === undefined) {
        res.send('failure');
        return;
    }

    story.get(esClient, req.query.id, function(val) {
        res.send(val);
    });
});

app.post('/search/stories', function (req, res) {
    if(!req.body) {
        res.send('failure');
        return;
    }

    story.search(esClient, req.body, function(val){
        res.send(val);
    });
});

app.post('/search/user', function (req, res) {
    if(!req.body) {
        res.send('failure');
        return;
    }

    res.send();
});

app.post('/search/lawyer', function (req, res) {
    if(!req.body) {
        res.send('failure');
        return;
    }

    res.send();
});

var server = app.listen(3030, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Portal server running at http://%s:%s', host, port);
});