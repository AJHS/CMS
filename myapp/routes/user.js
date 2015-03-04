var router = require('express').Router();

var User = require('../models/index').User;

router.get('/:uname', function (req, res) {
    User.findOne({'uname': req.params.uname}, function (err, user) {
        if (err) {
            res.status(500);
            res.render('error', {
                message: 'Internal Server Error',
                error: err
            });
        } else if (user === null) {
            res.status(400);
            res.render('error', {
                message: 'Bad Request',
                error: { status: 400 }
            });
        } else {
            res.send(user.name.first + ' ' + user.name.last);
        }
    });
});

module.exports = router;
