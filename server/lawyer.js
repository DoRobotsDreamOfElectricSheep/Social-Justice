var create = function(esClient, lawyerBody, callback) {
    esClient.create({
        index: 'lawyers',
        type: 'lawyer',
        id: lawyerBody.name,
        body: lawyerBody
    }).then(function(resp) {
        callback(resp);
    }, function(err, resp) {
        callback('lawyer-create() ' + err);
    });
};

var get = function(esClient, lawyerID, callback) {
    esClient.get({
        index: 'lawyers',
        type: 'lawyer',
        id: lawyerID
    }).then(function(resp) {
        callback(resp._source);
    },function(err, resp) {
        callback('lawyer-get() ' + err);
    });
};

var search = function(esClient, body, callback) {
    esClient.search({
        index: 'lawyers',
        type: 'lawyer',
        q: 'name:' + body.name
    }).then(function(resp) {
        callback(resp.hits.hits);
    }, function(err, resp) {
        callback('lawyer-search() ' + err);
    });
};

exports.create = create;
exports.get = get;
exports.search = search;