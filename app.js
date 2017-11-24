const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//db connection 
require('./db');
// register all models
require('./app_api/models/post');
require('./app_api/models/project');
require('./app_api/models/language');
require('./app_api/models/framework');
require('./app_api/models/database');
require('./app_api/models/page');
require('./app_api/models/post');

const webRoutes = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');

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
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //TODO remove console call
  console.log(err.stack);

  // render the error page
  res
    .status(err.status || 500)
    .render('error', {error: err, title: 'Error'});
});

//app.use(function(req, res, next){
//  res.status(404).render('404', { url: req.originalUrl });
//});


module.exports = app;
