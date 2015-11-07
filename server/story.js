var create = function(esClient, storyBody) {
    esClient.create({
        index: 'stories',
        type: 'story',
        id: '2',
        body: storyBody
    }, function(err, resp) {
        console.log('create() ' + err);
    });
};

var get = function(esClient, storyID, callback) {
    esClient.get({
        index: 'stories',
        type: 'story',
        id: storyID
    }).then(function(resp) {
        callback(resp._source);
    },function(err, resp) {
        callback(err);
    });
};

var search = function(esClient, body, callback) {
    esClient.search({
        index: 'stories',
        type: 'story',
        q: 'title:test'
    }).then(function(resp) {
        callback(resp);
    }, function(err, resp) {
        callback(err);
    });
};

exports.create = create;
exports.get = get;
exports.search = search;