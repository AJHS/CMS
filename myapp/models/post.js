var mongoose = require('mongoose');

mongoose.connect('mongodb://test:password@ds047720.mongolab.com:47720/db_example');

var postSchema = mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    author: String,
    views: Number
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
