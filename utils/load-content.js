const async = require('async');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

require('../db');
require('../app_api/models/project');
const Project = mongoose.model('Project');

const dataDir = '../data/project-pages/';
const files = fs.readdirSync(dataDir);




//readContent('kronofoto.html', updateProject);
main();

function main() {
  async.each(files, readContent, function onDone(err) {
    if (err) throw err;
    console.log('done, disconnecting');
    //mongoose.disconnect();
  });
};



function readContent(filename, cb) {
  cb();
  console.log('called on ' + filename);
  let projectId = path.basename(filename, '.html');
  let filePath = path.resolve(dataDir, filename);

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) throw err;
    cb(projectId, content, logResult);
  });
};

function updateProject(projectId, data, cb) {
  console.log('called');
  Project.update({_id: projectId}, {content: data}, (err, dbResponse) => {
    if (err) throw err;
    cb(dbResponse);
  });
};

function logResult(message) {
  console.log(message);
  //mongoose.disconnect();
};











//const processFile = function(file, callback) {

function processFile(file, callback) {
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

//async.each(files, processFile, (err) => {
//  if (err) throw err;
//  mongoose.disconnect(); //TODO doesn't look right: why for each file?
//});
