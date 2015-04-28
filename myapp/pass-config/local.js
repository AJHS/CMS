var LocalStrategy = require('passport-local').Strategy;

var User = require('../models').User;

module.exports = new LocalStrategy({
  usernameField: 'uname',
  passwordField: 'passwd'
},
function (username, password, done) {
  User.findOne({ 'uname': username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
});
