module.exports = function(conn) {
    return conn.model('Blog', require('mongoose').Schema({
        name: String
    }));
};
