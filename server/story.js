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
        callback(404);
    });
};

var search = function(esClient, body, callback) {
    var searchString = '';
    if(body.id) {
        searchString = 'id:' + body.id;
    } else {
        searchString = 'storyTitle:' + body.keywords;
    }
    esClient.search({
        index: 'stories',
        type: 'story',
        q: searchString
    }).then(function(resp) {
        callback(resp.hits.hits);
    }, function(err, resp) {
        callback('story-search() ' + err);
    });
};

exports.create = create;
exports.get = get;
exports.search = search;