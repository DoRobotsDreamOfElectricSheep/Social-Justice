var addToAccounts = function(esClient, username, password, userType, callback) {
    esClient.create({
        index: 'accounts',
        type: 'account',
        id: username,
        body: {
            'name': username,
            'password': password,
            'userType': userType
        }
    }).then(function(resp) {
        callback(resp);
    }, function(err, resp) {
        callback('helpers-addToAccounts() ' + err);
    });
};

exports.addToAccounts = addToAccounts;