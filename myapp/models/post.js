module.exports = function(conn) {
    return conn.model('Post', require('mongoose').Schema({
        title: String,
        content: String,
        date: Date,
        author: String,
        views: Number
    }));
};
