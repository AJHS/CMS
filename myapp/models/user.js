module.exports = function(conn) {
    return conn.model('User', require('mongoose').Schema({
        uname: {type: String, index: true},
        passwd: String,
        salt: String,
        email: String,
        name: {
            first: String,
            last: String
        }
    }));
};