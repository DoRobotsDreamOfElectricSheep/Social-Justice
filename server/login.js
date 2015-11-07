var attempt = function(esClient, username, password, callback) {
    esClient.get({
        index: 'accounts',
        type: 'account',
        id: username
    }).then(function(resp) {
        if(resp.found) {
            if(resp._source.password === password) {
                callback(resp._source.userType);
            } else {
                callback(403); // access denied
            }
        } else {
            callback(404); // username not found
        }

    },function(err, resp) {
        callback('login-get() ' + err);
    });
};

exports.attempt = attempt;