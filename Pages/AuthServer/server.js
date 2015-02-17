// Load dependencies
var express = require('express');
var bodyParser = require('body-parser');
//var session = require('express-session');
var mongoose = require('mongoose');
var crypto = require('crypto');

// Configure app
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
//app.use(session());
var server = app.listen(8000, function () {
    console.log('Server running at http://' + server.address().address + ':' + server.address().port);
});

// Connect to database and define data format
mongoose.connect('mongodb://test:password@ds047720.mongolab.com:47720/db_example');

var userSchema = mongoose.Schema({
    uname: {type: String, index: true},
    passwd: String,
    salt: String,
    name: {
        first: String,
        last: String
    }
});

/*
var blogSchema = mongoose.Schema({
name: String,
tags: [String],
canEdit: [ObjectId],
searchable: Boolean,
followers: [ObjectId]
});
*/

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
            res.send(resHtml('Something went wrong...', 'Your account was not created.'));
        } else if (user !== null) {
            res.send(resHtml('Uh-oh!', 'Someone already has the username ' + req.body.uname + '.'));
        } else {
            crypto.randomBytes(32, function (ex, buf) {
                if (ex) throw ex;

                var salt_ = buf.toString('hex');
                crypto.pbkdf2(req.body.passwd, salt_, 10000, 64, function (err, derivedKey) {
                    if (err) throw err;

                    user = new User({
                        uname: req.body.uname,
                        passwd: derivedKey.toString('hex'),
                        salt: salt_,
                        name: {
                            first: req.body.fname,
                            last: req.body.lname
                        }
                    });

                    user.save(function (err, user) {
                        if (err) {
                            res.send(resHtml('Something went wrong...', 'Your account was not created.'));
                        }
                        res.send(resHtml('Success!', 'Your account was created.'));
                    });
                });
            });
        }
    });
    console.log('POST /signup: ' + req.body.uname);
});

// Receives signin credentials and uses it to access user's data
app.post('/login', function (req, res) {
    User.findOne({'uname': req.body.uname}, function(err, user) {
        if (err) {
            res.send(resHtml('Error :(', 'Could not sign in at this time.'));
        } else if (user === null) {
            res.send(resHtml('Error :(', 'Incorrect username or password.'));
        } else {
            crypto.pbkdf2(req.body.passwd, user.salt, 10000, 64, function (err, derivedKey) {
                if (err) throw err;

                if (derivedKey.toString('hex') == user.passwd) {
                    res.send(resHtml(user.uname, user.name.first + ' ' + user.name.last));
                } else {
                    res.send(resHtml('Error :(', 'Incorrect username or password.'));
                }
            });
        }
    });
    console.log('POST /login: ' + req.body.uname);
});

// Creates response pages
function resHtml(h2, p) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>DB Test</title></head><body><h2>' + h2 + '</h2><p>' + p + '</p></body></html>';
}
