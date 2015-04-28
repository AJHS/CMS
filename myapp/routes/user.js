var router = require('express').Router();

var User = require('../models').User;

router.get('/:uname', function (req, res) {
  User.findOne({ 'uname': req.params.uname }, function (err, user) {
    if (err) {
      res.status(500);
      res.render('error', {
        message: 'Internal Server Error',
        error: err
      });
    } else if (!user) {
      res.status(404);
      res.render('error', {
        message: 'Not Found',
        error: { status: 404 }
      });
    } else {
      res.send(user.name.first + ' ' + user.name.last);
    }
  });
});

module.exports = router;
