var express = require('express');
var router = express.Router();

var User = require('../models/index').User;

router.get('/:uname', function (req, res) {
    User.findOne({'uname': req.params.uname}, function (err, user) {
        if (!err && user !== null) {
            res.send(user.name.first + ' ' + user.name.last);
        }
    });
});

module.exports = router;
