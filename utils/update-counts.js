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
  function(callback) {
    Language.getList((err, langs) => {
      async.each(langs, updateLanguage, (err) => {
        if (err) throw err;
        callback(null);
      });
    });
  },
  function(callback) {
    Framework.getList((err, frms) => {
      async.each(frms, updateFramework, (err) => {
        if (err) throw err;
        callback(null);
      });
    });
  },
  function(callback) {
    Database.getList((err, dbs) => {
      async.each(dbs, updateDatabase, (err) => {
        if (err) throw err;
        callback(null);
      });
    });
  }
],function(err, results) {
  mongoose.disconnect();
});

//TODO maybe use this syntax instead:
function updateLanguage(lang, callback) {
  Project.countByLanguage(lang['_id'], function onCounted(err, count) {
    lang.projects = count;
    lang.save(function onUpdated(err) { 
      console.log('updated project count for ' + lang['_id']);
      callback(null);
    });
  });
};

//TODO always pass err as first arg?

//TODO name your closures?
const updateLanguagebackup = function(lang, callback) {
  Project.countByLanguage(lang['_id'], function onCounted(err, count) {
    lang.projects = count;
    lang.save(function onUpdated(err) { 
      console.log('updated project count for ' + lang['_id']);
      callback(null);
    });
  });
};

const updateFramework = function(frm, callback) {
  Project.countByFramework(frm['_id'], function(err, count) {
    frm.projects = count;
    frm.save(function(err) {
      console.log('updated project count for ' + frm['_id']);
      callback(null);
    });
  });
};

const updateDatabase = function(db, callback) {
  Project.countByDatabase(db['_id'], function(err, count) {
    db.projects = count;
    db.save(function(err) {
      console.log('updated project count for ' + db['_id']);
      callback(null);
    });
  });
};
