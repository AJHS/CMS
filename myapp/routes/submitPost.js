var router = require('express').Router();

var sanitizeHtml = require('sanitize-html');
var marked = require('marked');

var Post = require('../models').Post;

router.get('/', function (req, res) {
  res.sendFile(require('path').join(__dirname, '../public', 'submitPost.html'));
});

router.post('/', function (req, res) {
  var post = new Post({
    title: sanitizeHtml(req.body.title),
    content: marked(sanitizeHtml(req.body.content)),
    date: Date.now(),
    author: sanitizeHtml(req.body.author),
    views: 0
  });

  post.save(function (err, post) {
    if (err) {
      res.status(500);
      res.render('error', {
        message: 'Internal Server Error',
        error: err
      });
    } else {
      res.redirect(303, '/post?postid=' + post._id);
    }
  });
});

module.exports = router;
