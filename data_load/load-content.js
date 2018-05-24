require('dotenv').config({path: '../.env'});
const async = require('async');
const mongoose = require('mongoose');

require('../app_api/models/page');
require('../app_api/models/post');
require('../app_api/models/project');

const PageLoader = require('./page-loader');
const PostLoader = require('./post-loader');
const ProjectLoader = require('./project-loader');
const ProjectContentLoader = require('./project-content-loader');

const Db = require('../db');
const db = new Db();

const PAGES_DIR = '../data/pages/';
const POSTS_DIR = '../data/posts/';
const PROJECTS_DIR = '../data/project-content/';
const PROJECTS_FILE = '../data/projects.csv';

async.series([
  function(callback) {
    console.log('Start data loading');
    db.connect(callback);
  },
  function(callback) {
    const model = mongoose.model('Page');
    new PageLoader(model, PAGES_DIR).load(true, callback);
  },
  function(callback) {
    const model = mongoose.model('Post');
    new PostLoader(model, POSTS_DIR).load(true, callback);
  },
  function(callback) {
    const model = mongoose.model('Project');
    new ProjectLoader(PROJECTS_FILE).load(true, callback);
  },
  function(callback) {
    const model = mongoose.model('Project');
    new ProjectContentLoader(model, PROJECTS_DIR).load(false, callback);
  },
  function(callback) {
    db.disconnect(callback);
  }
], function(err, results) {
  console.log('Data loading complete');
});

