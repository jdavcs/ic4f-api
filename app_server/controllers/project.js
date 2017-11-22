const async = require('async');
const request = require('request');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Language = mongoose.model('Language');
const Framework = mongoose.model('Framework');
const Database = mongoose.model('Database');

const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  //TODO change this to my own
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}

exports.viewProject = function viewProject(req, res, next) {
  const address = 'projects/' + req.params.projectId;
  async.parallel({
    project: callback => getData(address, callback)
  }, function (err, results) { 
    if (err) { return next(err); }
    renderOneProject(req, res, results);
  });
}

exports.projects = function projectData(req, res, next) {

  async.parallel({
    projects: callback => getData('projects', callback),
    languages: callback => getData('languages', callback),
    frameworks: callback => getData('frameworks', callback),
    databases: callback => getData('databases', callback)
  }, function (err, results) { 
    if (err) { return next(err); }
    renderProjects(req, res, results);
  });
}

function getData(address, callback) {
  const requestOptions = {
    url: apiOptions.server + '/api/' + address,
    json: {}
  };
  request(
    requestOptions, 
    (err, response, body) => {
     // console.log(body);
      if (err) {
        callback(err); //TODO do i need a return here?
      } else {
        callback(null, body);
      } 
    }
  );
};

function renderOneProject(req, res, data) {
  res.render('projectView', { 
    title: 'My Projects', 
    project: data.project
  });
};

function renderProjects(req, res, data) {
  res.render('projects', { 
    title: 'My Projects', 
    projects: data.projects,
    languages: data.languages,
    frameworks: data.frameworks,
    databases: data.databases,
    makeList: makeListOfProperties
  });
};

function makeListOfProperties(items, property) {
  return items
    .map(function(i) { return i[property]; })
    .join(', ');
};


