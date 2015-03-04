var router = require('express').Router();

var crypto = require('crypto');

var User = require('../models/index').User;

router.get('/', function (req, res) {
    res.sendFile(require('path').join(__dirname, '../public', 'signUp.html'));
});

router.post('/', function (req, res) {
    User.findOne({'uname': req.body.uname}, function(err, user) {
        if (!err && user === null) {
            crypto.randomBytes(32, function (ex, buf) {
                if (ex) throw ex;

                var salt_ = buf.toString('hex');
                crypto.pbkdf2(req.body.passwd, salt_, 10000, 64, function (err, derivedKey) {
                    if (err) throw err;

                    var user = new User({
                        uname: req.body.uname,
                        passwd: derivedKey.toString('hex'),
                        salt: salt_,
                        email: req.body.email,
                        name: {
                            first: req.body.fname,
                            last: req.body.lname
                        }
                    });

                    user.save(function (err, user) {
                        if (!err) {
                            res.redirect('/user/' + user.uname);
                        }
                    });
                });
            });
        }
    });
});

module.exports = router;
