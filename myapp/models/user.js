var userSchema = require('mongoose').Schema({
    uname: {type: String, index: true},
    passwd: String,
    salt: String,
    email: String,
    name: {
        first: String,
        last: String
    }
});

userSchema.methods.validPassword = function(password) {
  require('crypto').pbkdf2(password, this.salt, 10000, 64, function (err, derivedKey) {
      if (err) throw err;
      return derivedKey.toString('hex') == this.passwd;
  });
};

module.exports = function(conn) {
  return conn.model('User', userSchema);
};
