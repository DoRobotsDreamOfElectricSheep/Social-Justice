var user = require('./user');
var lawyer = require('./lawyer');

var attempt = function(esClient, username, password, callback) {
    esClient.get({
        index: 'accounts',
        type: 'account',
        id: username
    }).then(function(resp) {
        if(resp.found) {
            if(resp._source.password === password) {
                var caller;
                userType = resp._source.userType;
                if(userType === 'lawyer') {
                    caller = lawyer;
                } else {
                    caller = user;
                }

                caller.get(esClient, username, function(val) {
                    val.password = '*************';
                    var response = {
                        userType: userType,
                        body: val
                    };
                    callback(response);
                });
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