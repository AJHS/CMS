var express = require('express');
var router = express.Router();

var path = require('path');
var sanitizeHtml = require('sanitize-html');
var marked = require('marked');

var Post = require('../models/index').Post;

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'submitPost.html'));
});

router.post('/', function (req, res) {
    post = new Post({
        title: sanitizeHtml(req.body.title),
        content: marked(sanitizeHtml(req.body.content)),
        date: Date.now(),
        author: sanitizeHtml(req.body.author),
        views: 0
    });

    post.save(function (err, post) {
        if (!err) {
            res.redirect('/post?postid=' + post._id);
        }
    });
});

module.exports = router;
