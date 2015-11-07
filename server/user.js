var helper = require('./helpers');

var create = function(esClient, userBody, callback) {
    esClient.create({
        index: 'users',
        type: 'user',
        id: userBody.name,
        body: userBody
    }, function(err, resp) {
        helper.addToAccounts(esClient, userBody.name, userBody.password, 'user', function(val) {
            callback(resp);
        });
    });
};

var get = function(esClient, userID, callback) {
    esClient.get({
        index: 'users',
        type: 'user',
        id: userID
    }).then(function(resp) {
        callback(resp._source);
    },function(err, resp) {
        callback('user-get() ' + err);
    });
};

var search = function(esClient, body, callback) {
    esClient.search({
        index: 'users',
        type: 'user',
        q: 'name:' + body.name
    }).then(function(resp) {
        callback(resp.hits.hits);
    }, function(err, resp) {
        callback('user-search() ' + err);
    });
};

exports.create = create;
exports.get = get;
exports.search = search;