var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sanitizeHtml = require('sanitize-html');
var marked = require('marked');
var jade = require('jade');

var app = express();
app.set('view engine', 'jade');
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

app.get('/post', function (req, res) {
    console.log(req.query);
    Post.findOne({'_id': req.query.postid}, function (err, post) {
        if (err) {
            res.send(resHtml('Error :(', 'Could not search DB at this time.'));
        } else if (post === null) {
            res.send(resHtml('Error :(', 'There are no posts with the ID: ' + req.query.postid));
        } else {
            post.views++;
            res.send('<!DOCTYPE html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + post.title + '</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css"><link type="text/css" rel="stylesheet" href="css/style-view.css"><script src="http://code.jquery.com/jquery-2.1.1.min.js"></script><script type="text/javascript" src="js/main.js"></script></head><body><div class="container"><div id="content"><h1>' + post.title + '</h1><h3>by ' + post.author + '</h3><p>' + post.content + '</p></div></div><div class="container"><div id="disqus_thread"></div></div><script type="text/javascript">var disqus_shortname = "social-blogging";var disqus_identifier = ' + post._id + ';(function() {var dsq = document.createElement("script"); dsq.type = "text/javascript"; dsq.async = true;dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);})();</script><noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript></body></html>');
        }
    });
    console.log('POST /post: ' + req.query.postid);
});

app.get('/submitPost', function (req, res) {
    res.sendFile(__dirname + jade.renderFile('index.jade', {}));
    console.log('GET submitPost/index.html');
});

app.post('/submitPost', function (req, res) {
    post = new Post({
        title: sanitizeHtml(req.body.title),
        content: marked(sanitizeHtml(req.body.content)),
        date: Date.now(),
        author: sanitizeHtml(req.body.author),
        views: 0
    });

    post.save(function (err, post) {
        if (err) {
            res.send(resHtml('Something went wrong...', 'Your post was not created.'));
        }
        res.send(resHtml('Success!', 'Your post was created and has ID: ' + post._id));
    });
    console.log('POST /submitPost: ' + req.body.title);
});

function resHtml(h2, p) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>SubmitPost</title></head><body><h2>' + h2 + '</h2><p>' + p + '</p></body></html>';
}
/*
app.get('/post', function(req, res){

});
*/
