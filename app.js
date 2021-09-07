// importing third party middleware
// check package.json
var createError = require('http-errors');
var express = require('express');
var path = require('path');// you will not find this in package.json this is a core module that is built in nodejs
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// importing local files
// 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var promoRouter = require('./routes/promoRouter');

const campsiteRouter = require('./routes/campsiteRouter');
const partnerRouter = require('./routes/partnerRouter');
const promotionRouter = require('./routes/promotionRouter');

// what is mongoose?
// Allows to create schemas
// We use mongoose to manipulate (CRUD) Create-Read-Update-Delete
// without mongoose our express application cannot interact with our Mongodb
// A way to automate requests (GET, POST, PUT, DELETE)
// without this you would have to manually manipulat your mongodb i.e Nodejs driver
const mongoose = require('mongoose');// third party middle ware

// Declaring a variable with the name of our database
// in this case database name is nucampsite
// we will pass this variable in to connect
const url = 'mongodb://localhost:27017/nucampsite';

// Mongoose middleware will connect to our mongodb server and create this database "nucampsiste" if it does not exist and use it
// this is equal to "use <name of db>" in Nodejs Driver

const connect = mongoose.connect(url, {
  // optional, to ger rid of errors when starting you app
  // why? because some of these methods are deprecated. but they still work
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// What is a promise?
// with every mongoose method a promise will be returned
// if mongoose connect to the Mongodb server properly the server will
// reply 'Connected correctly to server'
// else reply the err.
connect.then(() => console.log('Connected correctly to server'),
  err => console.log(err)
);
// using express middleware or creating express application
var app = express();

// this lets express know where you static file for serving routes
app.set('views', path.join(__dirname, 'views'));

//View Engine === front-end framework
// let's you create a full-stack application quickly
app.set('view engine', 'jade');// most common in use is EJS, this framework






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


function auth(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];
  if (user === 'admin' && pass === 'password') {
    return next(); // authorized
  } else {
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}

app.use(auth);
// view engine setup
// the directory/ folder that holds static file
// this is where you usually serve images, videos
app.use(express.static(path.join(__dirname, 'public')));


// connecting your routers 
// this is you starting point and with each starting point must have
// an "end-points"
// where are end-points?
// declared it in the 2nd argument which is a Javascript file

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);


// catch 404 and forward to error handler
// this uses third party middle ware named "http-errors"
// when a user goes to a URL that doesnot esist in your code
// then it will transfered to the error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
