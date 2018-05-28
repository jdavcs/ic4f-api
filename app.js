const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Db = require('./db');
const helmet = require('helmet');
const compression = require('compression');

new Db().connect();

// register all models
require('./app_api/models/page');
require('./app_api/models/post');
require('./app_api/models/project');
require('./app_api/models/group');
require('./app_api/models/language');
require('./app_api/models/framework');
require('./app_api/models/database');

const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



//temporary TODO remove this
//app.get('/', (req, res) => {
//  res.redirect('http://sergey.cs.uni.edu');
//});



//angular 
app.use(express.static(path.join(__dirname, 'ng')));
app.use('/static', express.static(path.join(__dirname, 'static')));

//api
const apiRoutes = require('./app_api/routes/index');
app.use('/api', apiRoutes);

//fall back to angular
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'ng/index.html'));
});

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
