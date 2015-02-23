var Schema = require('mongoose').Schema;

module.exports = function(conn) {
    return conn.model('canEdit', Schema({
        user: Schema.Types.ObjectId,
        blog: Schema.Types.ObjectId
    }));
};
