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
  console.log('ADDRESS: ' + address);
  async.parallel({
    project: callback => getData(address, callback)
  }, function (err, results) { 
    if (err) { return next(err); }
    console.log('MARKER 2');
    renderOneProject(req, res, results);
  });
}

exports.projects = function projectData(req, res, next) {

  console.log('server called for lists');

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
    console.log('OPTIONS: ' + requestOptions.url);
  request(
    requestOptions, 
    (err, response, body) => {
     // console.log(body);
      if (err) {
        callback(err); //TODO do i need a return here?
      } else {

        console.log('MARKER 1 ' + body);
        callback(null, body);
      } 
    }
  );
};

function renderOneProject(req, res, data) {
  res.render('projectView', { 
    title: data.project.name,
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
    makeList: makeListOfProperties,
    tmpScreen: tmpScreen,                    //TODO remove this
    tmpLink: tmpLink                     //TODO remove this
  });
};


//TODO remove this
function tmpScreen() {

  let min = Math.ceil(1);
  let max = Math.floor(20);
  let foo = Math.floor(Math.random() * (max - min)) + min;



  let str = ''
    str = '<img class="tmpScreenThumb" src="/screens/' + foo + '.jpg">';
  return str;
}
//TODO remove this
function tmpLink(name) {
  let x = Math.random();
  //if (x > 0.6) {
    let str = '<a href="" class="tmpScreenLink"><b>' + name + '</b>';
    str += '<span class="tmpScreenLinkMore">...see github</span></a>';
    return str;
  //} else {
  //  return name;
 // }
}



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}






function makeListOfProperties(items, property) {
  return items
    .map(function(i) { return i[property]; })
    .join('<br> ');
};


