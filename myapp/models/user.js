var mongoose = require('mongoose');

mongoose.connect('mongodb://test:password@ds047720.mongolab.com:47720/db_example');

var userSchema = mongoose.Schema({
    uname: {type: String, index: true},
    passwd: String,
    salt: String,
    name: {
        first: String,
        last: String
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
