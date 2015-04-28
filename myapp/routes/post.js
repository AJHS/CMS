var router = require('express').Router();

var Post = require('../models').Post;

router.get('/', function (req, res) {
  Post.findById(req.query.postid, function (err, post) {
    if (err) {
      res.status(500);
      res.render('error', {
        message: 'Internal Server Error',
        error: err
      });
    } else if (!post) {
      res.status(404);
      res.render('error', {
        message: 'Not Found',
        error: { status: 404 }
      });
    } else {
      res.render('post', post);
      post.views++;
      post.save();
    }
  });
});

module.exports = router;
