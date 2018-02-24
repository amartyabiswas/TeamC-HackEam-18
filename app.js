let express = require('express');
let path = require('path');
let logger = require('morgan');
let port=process.env.PORT||5000;
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let app = express();

let index = require('./routes/index');
let users = require('./routes/users');
let admin = require('./routes/admin');
let superadmin=require('./routes/superadmin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/superadmin', superadmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
   console.log('Magic happens at port '+ 5000);
});

module.exports = app;
