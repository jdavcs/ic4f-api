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

let toProcess = 0;

main();

function main() {
  //Language.getList((err, languages) => {
   // if (err) throw err;
    //processLanguages(languages, cleanup);
  //});

  //processFrameworks();
  //processDatabases();
}

function processLanguages() {
  Language.getList((err, languages) => {
    if (err) throw err;
    toProcess = languages.length;
    for (let lang of languages) {
      countLangProjects(lang, cleanup, updateLanguage);  
    }
  });
}

function countLangProjects(language, nextCallback, callback) {
  Project.countByLanguage(language['_id'], (err, projectCount) => {
    if (err) throw err;
    nextCallback(language, projectCount, cleanup);
  });
  callback(language);
}

function updateLanguage(language, projectCount, callback) {
  language.projects = count;
  language.save(nextCallback);
}




function cleanup(language) {
    console.log('done with ' + language);
    toProcess--; 
    if (toProcess === 0) {
      mongoose.disconnect();
    }
}





////TODO maybe use this syntax instead:
function updateLanguageold(lang, callback) {
  Project.countByLanguage(lang['_id'], function onCounted(err, count) {
    lang.projects = count;
    lang.save(function onUpdated(err) { 
      console.log('updated project count for ' + lang['_id']);
      callback(null);
    });
  });
};


//async.parallel([
//  function(callback) {
//    Language.getList((err, langs) => {
//      async.each(langs, updateLanguage, (err) => {
//        if (err) throw err;
//        callback(null);
//      });
//    });
//  },
//  function(callback) {
//    Framework.getList((err, frms) => {
//      async.each(frms, updateFramework, (err) => {
//        if (err) throw err;
//        callback(null);
//      });
//    });
//  },
//  function(callback) {
//    Database.getList((err, dbs) => {
//      async.each(dbs, updateDatabase, (err) => {
//        if (err) throw err;
//        callback(null);
//      });
//    });
//  }
//],function(err, results) {
//  mongoose.disconnect();
//});
//
////TODO maybe use this syntax instead:
//function updateLanguage(lang, callback) {
//  Project.countByLanguage(lang['_id'], function onCounted(err, count) {
//    lang.projects = count;
//    lang.save(function onUpdated(err) { 
//      console.log('updated project count for ' + lang['_id']);
//      callback(null);
//    });
//  });
//};
//
////TODO always pass err as first arg?
//
////TODO name your closures?
//const updateLanguagebackup = function(lang, callback) {
//  Project.countByLanguage(lang['_id'], function onCounted(err, count) {
//    lang.projects = count;
//    lang.save(function onUpdated(err) { 
//      console.log('updated project count for ' + lang['_id']);
//      callback(null);
//    });
//  });
//};
//
//const updateFramework = function(frm, callback) {
//  Project.countByFramework(frm['_id'], function(err, count) {
//    frm.projects = count;
//    frm.save(function(err) {
//      console.log('updated project count for ' + frm['_id']);
//      callback(null);
//    });
//  });
//};
//
//const updateDatabase = function(db, callback) {
//  Project.countByDatabase(db['_id'], function(err, count) {
//    db.projects = count;
//    db.save(function(err) {
//      console.log('updated project count for ' + db['_id']);
//      callback(null);
//    });
//  });
//};
