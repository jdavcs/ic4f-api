const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Db = require('./db');

new Db().connect();

// register all models
require('./app_api/models/page');
require('./app_api/models/post');
require('./app_api/models/project');
require('./app_api/models/language');
require('./app_api/models/framework');
require('./app_api/models/database');

const webRoutes = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRoutes);
app.use('/api', apiRoutes);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.message = 'The requested resource does not exist: ' + req.hostname + req.url;
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error + printing the error stack in development
  res.locals.message = err.message;

  if (req.app.get('env') === 'development') {
    res.locals.error = err;
    console.log(err.stack);
  } else {
    res.locals.error = {};
  }

  res
    .status(err.status || 500)
    .render('error', {error: err, title: 'Error'});
});

module.exports = app;
