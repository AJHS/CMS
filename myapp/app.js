// DEPENDENCIES
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// CREATE APP AND SET UP THIRD PARTY MIDDLEWARE
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ADD ROUTES TO MIDDLEWARE STACK
var routes = require('fs').readdirSync(__dirname + '/routes');
for (var i = 0; i < routes.length; i++) {
  var routeName = routes[i].slice(0, routes[i].lastIndexOf('.'));
  app.use('/' + ((routeName === 'index') ? '' : routeName), require('./routes/' + routeName));
}
/*
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/post', require('./routes/post'));
app.use('/submitPost', require('./routes/submitPost'));
app.use('/user', require('./routes/user'));
app.use('/signUp', require('./routes/signUp'));
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
