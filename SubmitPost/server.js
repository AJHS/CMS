var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sanitizeHtml = require('sanitize-html');
var marked = require('marked');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var server = app.listen(8000, function () {
    console.log('Server running at http://' + server.address().address + ':' + server.address().port);
});

mongoose.connect('mongodb://test:password@ds047720.mongolab.com:47720/db_example');

var postSchema = mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    author: String,
    views: Number
});

var Post = mongoose.model('Post', postSchema);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log('GET /index.html');
});

app.post('/postSubmit', function (req, res) {
    post = new Post({
        title: sanitizeHtml(req.body.title),
        content: marked(sanitizeHtml(req.body.content)),
        date: Date.now(),
        author: sanitizeHtml(req.body.author),
        views: 0
    });

    post.save(function (err, user) {
        if (err) {
            res.send(resHtml('Something went wrong...', 'Your post was not created.'));
        }
        res.send(resHtml('Success!', 'Your post was created.'));
    });
    console.log('POST /submitPost: ' + req.body.title);
});

function resHtml(h2, p) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>SubmitPost</title></head><body><h2>' + h2 + '</h2><p>' + p + '</p></body></html>';
}
