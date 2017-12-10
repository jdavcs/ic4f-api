const async = require('async');
const mongoose = require('mongoose');

require('../app_api/models/language');
require('../app_api/models/framework');
require('../app_api/models/database');

const Language = mongoose.model('Language');
const Framework = mongoose.model('Framework');
const Database = mongoose.model('Database');

module.exports = updateCounts(callback) {

}

async.parallel([
  processLanguages,
  processFrameworks,
  processDatabases
], err => mongoose.disconnect()
);

function processLanguages(callback) {
  Language.getList((err, languages) => {
    if (err) throw err;
    async.each(languages, updateLanguage, callback);
  });
}

function processFrameworks(callback) {
  Framework.getList((err, frameworks) => {
    if (err) throw err;
    async.each(frameworks, updateFramework, callback);
  });
}

function processDatabases(callback) {
  Database.getList((err, databases) => {
    if (err) throw err;
    async.each(databases, updateDatabase, callback);
  });
}

function updateLanguage(lang, callback) {
  Project.countByLanguage(lang['_id'], (err, count) => {
    if (err) throw err;
    lang.projects = count;
    lang.save(callback);
    console.log('Updating COUNTS for ' + lang['_id']);
  });
};

function updateFramework(frmk, callback) {
  Project.countByFramework(frmk['_id'], (err, count) => {
    if (err) throw err;
    frmk.projects = count;
    frmk.save(callback);
    console.log('Updating COUNTS for ' + frmk['_id']);
  });
};

function updateDatabase(db, callback) {
  Project.countByDatabase(db['_id'], (err, count) => {
    if (err) throw err;
    db.projects = count;
    db.save(callback);
    console.log('Updating COUNTS for ' + db['_id']);
  });
};
