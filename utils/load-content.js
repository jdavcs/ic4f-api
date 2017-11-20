// This scirpt:
// 1. Get list of filenames from the 'data' directory
// 2. For each filename:
//    2.1. Read the file content
//    2.2. Update the corresponding porject in the db.
// 3. When all files are processed, close db connection.
//
// NOTE: We can use the async library to process all files in parallel.  
// But we can also do the same with simple callbacks and a counter. 

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('../db');
require('../app_api/models/project');

const Project = mongoose.model('Project');
const dataDir = '../data/project-pages/';
const fileExt = '.html';

let toProcess = 0; //this global is annoying...

function main() {
  fs.readdir(dataDir, (err, files) => {
    if (err) throw err;
    toProcess = files.length; 
    for (let f of files) {
      readContent(f);
    }
  });
}

function readContent(filename) {
  const projectId = path.basename(filename, fileExt);
  const filePath = path.resolve(dataDir, filename);
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) throw err;
    updateProject(projectId, content);
  });
}

function updateProject(projectId, data) {
  Project.update({_id: projectId}, {content: data}, (err, dbResponse) => {
    if (err) throw err;
    console.log('Updated CONTENT for ' + projectId + ': ' + JSON.stringify(dbResponse));
    done();
  });
}

function done() {
    toProcess--; 
    if (toProcess === 0) {
      mongoose.disconnect();
    }
}

main();
