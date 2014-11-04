// Load dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');

// Configure app
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var server = app.listen(8000, function () {
    console.log('Server running at http://' + server.address().address + ':' + server.address().port);
});

// Connect to database and define data format
mongoose.connect('mongodb://test:password@ds047720.mongolab.com:47720/db_example');

var userSchema = mongoose.Schema({
    uname: String,
    passwd: String,
    salt: String,
    name: {
        first: String,
        last: String
    }
});

var User = mongoose.model('User', userSchema);

// ROUTES
// Serves main page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log('GET /index.html');
});

// Receives form data from main page and adds it to database
app.post('/signup', function (req, res) {
    User.findOne({'uname': req.body.uname}, function(err, user) {
        if (err) {
            res.send(resp('Something went wrong...', 'Your account was not created.'));
        } else if (user !== null) {
            res.send(resp('Uh-oh', 'Someone already has the username ' + req.body.uname + '.'));
        } else {
            crypto.randomBytes(32, function (ex, buf) {
                if (ex) throw ex;

                user = new User({
                    uname: req.body.uname,
                    passwd: hash(req.body.passwd, buf),
                    salt: buf,
                    name: {
                        first: req.body.fname,
                        last: req.body.lname
                    }
                });

                user.save(function (err, user) {
                    if (err) {
                        res.send(resp('Something went wrong...', 'Your account was not created.'));
                    }
                    res.send(resp('Success!', 'Your account was created.'));
                });

                console.log('POST /signup: ' + req.body.uname);
            });
        }
    });
});

// Receives signin credentials and uses it to access user's data
app.post('/login', function (req, res) {
    User.findOne({'uname': req.body.uname}, function(err, user) {
        if (err) {
            res.send(resp('Error :(', 'Could not sign in at this time.'));
        } else if (user === null || hash(req.body.passwd, user.salt) != user.passwd) {
            res.send(resp('Error :(', 'Incorrect username or password.'));
        } else {
            res.send(resp(user.uname, user.name.first + ' ' + user.name.last));
        }
    });
    console.log('POST /login: ' + req.body.uname);
});

// FUNCTIONS
// Creates response pages
function resp(h2, p) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>DB Test</title></head><body><h2>' + h2 + '</h2><p>' + p + '</p></body></html>';
}

// Hashes passwords
function hash(text, salt) {
    crypto.pbkdf2(text, salt, 10000, 64, function (err, derivedKey) {
        if (err) throw err;
        return derivedKey;
    });
}
