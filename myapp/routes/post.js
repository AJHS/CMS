var express = require('express');
var router = express.Router();

var Post = require('../models/index').Post;

router.get('/', function (req, res) {
    Post.findById(req.query.postid, function (err, post) {
        if (!err && post !== null) {
            post.views++;
            res.render('post', post);
        }
    });
});

module.exports = router;
