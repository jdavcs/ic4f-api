// This scirpt:
// 1. Get list of filenames from the 'data' directory
// 2. For each filename:
//    2.1. Read the file content
//    2.2. Update the corresponding porject in the db.
// 3. When all files are processed, close db connection.
//
// NOTE: We can use the async library to process all files in parallel.  
// But we can also do the same with simple callbacks and a counter. 
// This is the "callback hell" version. It is NOT used.

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('../db');
require('../app_api/models/project');

const Project = mongoose.model('Project');
const dataDir = '../data/project-pages/';
const fileExt = '.html';

function main() {
  let toProcess = 0;
  
  fs.readdir(dataDir, function readContent(err, files) {
    if (err) throw err;
    toProcess = files.length; 
    for (let filename of files) {
      let projectId = path.basename(filename, fileExt);
      let filePath = path.resolve(dataDir, filename);

      fs.readFile(filePath, 'utf8', function updateProject(err, content) {
        if (err) throw err;
        Project.update({_id: projectId}, {content: content}, function done(err, dbResponse) {
          if (err) throw err;
          console.log('Updated CONTENT for ' + projectId + ': ' + JSON.stringify(dbResponse));
          toProcess--; 
          if (toProcess === 0) {
            mongoose.disconnect();
          }
        });
      });
    };
  });
}

main();
