var router = require('express').Router();

var crypto = require('crypto');

var User = require('../models').User;

router.get('/', function (req, res) {
  res.sendFile(require('path').join(__dirname, '../public', 'signUp.html'));
});

router.post('/', function (req, res) {
  User.findOne({ 'uname': req.body.uname }, function (err, user) {
      if (err) {
        res.status(500);
        res.render('error', {
          message: 'Internal Server Error',
          error: err
        });
      } else if (user) {
        res.status(412);
        res.render('error', {
          message: 'Precondition Failed',
          error: { status: 412 }
        });
      } else {
      crypto.randomBytes(32, function (ex, buf) {
        if (ex) throw ex;
        var salt = buf.toString('hex');

        crypto.pbkdf2(req.body.passwd, salt, 10000, 64, function (err, derivedKey) {
          if (err) throw err;

          var user = new User({
            uname: req.body.uname,
            passwd: derivedKey.toString('hex'),
            salt: salt,
            email: req.body.email,
            name: {
              first: req.body.fname,
              last: req.body.lname
            }
          });

          user.save(function (err, user) {
            if (err) throw err;
            res.redirect('/user/' + user.uname);
          });
        });
      });
    }
  });
});

module.exports = router;
