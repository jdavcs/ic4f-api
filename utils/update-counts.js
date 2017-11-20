const async = require('async');
const mongoose = require('mongoose');
require('../db');
require('../app_api/models/project');
require('../app_api/models/language');
require('../app_api/models/framework');
require('../app_api/models/database');

const Project = mongoose.model('Project');
const Language = mongoose.model('Language');
const Framework = mongoose.model('Framework');
const Database = mongoose.model('Database');

async.parallel([
  processLanguages,
  processFrameworks,
  processDatabases
], err => mongoose.disconnect()
);

function processLanguages(callback) {
  Language.getList((err, languages) => {
    if (err) throw err;
    async.each(languages, updateLanguage, (err) => {
      if (err) throw err;
      callback(null);
    });
  });
}

function processFrameworks(callback) {
  Framework.getList((err, frameworks) => {
    if (err) throw err;
    async.each(frameworks, updateFramework, (err) => {
      if (err) throw err;
      callback(null);
    });
  });
}

function processDatabases(callback) {
  Database.getList((err, databases) => {
    if (err) throw err;
    async.each(databases, updateDatabase, (err) => {
      if (err) throw err;
      callback(null);
    });
  });
}

function updateLanguage(lang, callback) {
  Project.countByLanguage(lang['_id'], (err, count) => {
    if (err) throw err;
    lang.projects = count;
    lang.save(function onUpdated(err) { 
      if (err) throw err;
      console.log('Updated COUNTS for ' + lang['_id']);
      callback(null);
    });
  });
};

function updateFramework(frmk, callback) {
  Project.countByFramework(frmk['_id'], (err, count) => {
    if (err) throw err;
    frmk.projects = count;
    frmk.save(function(err) {
      if (err) throw err;
      console.log('Updated COUNTS for ' + frmk['_id']);
      callback(null);
    });
  });
};

function updateDatabase(db, callback) {
  Project.countByDatabase(db['_id'], (err, count) => {
    if (err) throw err;
    db.projects = count;
    db.save(function(err) {
      if (err) throw err;
      console.log('Updated COUNTS for ' + db['_id']);
      callback(null);
    });
  });
};
