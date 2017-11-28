const async = require('async');
const mongoose = require('mongoose');

require('../app_api/models/page');
require('../app_api/models/post');
require('../app_api/models/project');

const PageLoader = require('./page-loader');
const PostLoader = require('./post-loader');
const ProjectLoader = require('./project-loader');

const Db = require('../db');
const db = new Db();

async.series([
  function(callback) {
    console.log('Start data loading');
    db.connect(callback);
  },
  function(callback) {
    const model = mongoose.model('Page');
    new PageLoader(model, '../data/pages/').load(true, callback);
  },
  function(callback) {
    const model = mongoose.model('Post');
    new PostLoader(model, '../data/posts/').load(true, callback);
  },
  function(callback) {
    const model = mongoose.model('Project');
    new ProjectLoader(model, '../data/project-pages/').load(false, callback);
  },
  function(callback) {
    db.disconnect(callback);
  }
], function(err, results) {
  console.log('Data loading complete');
});
