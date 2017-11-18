const async = require('async');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

require('../app_api/models/dbconn');
require('../app_api/models/project');
const Project = mongoose.model('Project');

const dataDir = '../data/project-pages/';
const files = fs.readdirSync(dataDir);

const processFile = function(file, callback) {
  let projectId = path.basename(file, '.html');
  let dataFile = path.resolve(dataDir, file);

  fs.readFile(dataFile, 'utf8', (err, html) => {
    if (err) throw err;
  
    Project.update( {_id: projectId}, {content: html}, (err, raw) => {
      if (err) throw err;
      console.log(`updated content for ${projectId}`);
      callback(null);
    });
  });
};

async.each(files, processFile, (err) => {
  if (err) throw err;
  mongoose.disconnect();
});
