var create = function(esClient, storyBody, callback) {
    esClient.create({
        index: 'stories',
        type: 'story',
        id: storyBody.id,
        body: storyBody
    }, function(err, resp) {
        callback(resp);
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
        callback('story-get() ' + err);
    });
};

var search = function(esClient, body, callback) {
    esClient.search({
        index: 'stories',
        type: 'story',
        q: ''
    }).then(function(resp) {
        callback(resp.hits.hits);
    }, function(err, resp) {
        callback('story-search() ' + err);
    });
};

exports.create = create;
exports.get = get;
exports.search = search;