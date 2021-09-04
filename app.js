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
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// What is a promise?
// with every mongoose method a promise will be returned

connect.then(() => console.log('Connected correctly to server'),
  err => console.log(err)
);
// using express middleware or creating express application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);



// catch 404 and forward to error handler
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
