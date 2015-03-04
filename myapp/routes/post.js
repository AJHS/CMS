var router = require('express').Router();

var Post = require('../models/index').Post;

router.get('/', function (req, res) {
    Post.findById(req.query.postid, function (err, post) {
        if (!err && post !== null) {
            res.render('post', post);
            post.views++;
            post.save();
        }
    });
});

module.exports = router;
