var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var server = app.listen(8000, function () {
    console.log('Server running at http://' + server.address().address + ':' + server.address().port);
});

// Connect to database and define data format
mongoose.connect('mongodb://test:password@ds047720.mongolab.com:47720/db_example');

var postSchema = mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    author: String
});

var Post = mongoose.model('Post', postSchema);

app.post('/postSubmit', function() {
    post = new Post({
        title: req.body.title,
        content: req.body.content,
        date: Date.now(),
        author: req.body.author
    });

    post.save(function (err, user) {
        if (err) {
            res.send(resHtml('Something went wrong...', 'Your post was not created.'));
        }
        res.send(resHtml('Success!', 'Your post was created.'));
    });
});

function resHtml(h2, p) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>DB Test</title></head><body><h2>' + h2 + '</h2><p>' + p + '</p></body></html>';
}
