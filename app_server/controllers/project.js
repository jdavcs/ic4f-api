const async = require('async');
const request = require('request');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Language = mongoose.model('Language');
const Framework = mongoose.model('Framework');
const Database = mongoose.model('Database');

const GITHUB_REPO_PREFIX    = 'https://github.com/ic4f/';
const GITHUB_OLDCODE_PREFIX = 'https://github.com/ic4f/oldcode-draft/tree/master/';

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
    project: data.project,
    parentMenu: 1
  });
};

function renderProjects(req, res, data) {
  res.render('projects', { 
    title: 'Selected Projects', 
    projects: data.projects,
    languages: data.languages,
    frameworks: data.frameworks,
    databases: data.databases,
    getProject: getProjectCellHTML,
    getYears: getYearsCellHTML,
    makeList: makeListOfProperties,
    parentMenu: 1
  });
};


function getYearsCellHTML(project) {
  start = project.year_start;
  end = project.year_end;

  //take care of ongoing projects
  const now = new Date().getFullYear();
  if (end > now) {
    end = now;
  }

  if (start === end) {
    return start.toString();
  } else {
    return start + '–'  + end;
  }
}


function getProjectCellHTML(p) {
  const getName = (count, name) => {
    let html = '<span class="project-name">' + name + '</span>';
    if (count > 1) {
      return html + '<span class="project-count"> (~' + count + ' projects)</span>';
    }
    return html;
  }

  const makeLink = (id, github_repo, github_oldcode, nameHTML) => {
    let link = '';
    let comment = '';

    if (github_repo) {
      link = '<a href="' + GITHUB_REPO_PREFIX + github_repo + '">';
      //comment = '<span class="project-comment-repo">– Project on GitHub</span></a>';
      comment = '<a href=""><span class="project-comment-repo">– Project on GitHub</span></a>';
    } else if (github_oldcode) {
      link = '<a href="' + GITHUB_OLDCODE_PREFIX + id + '">';
      comment =  '<span class="project-comment-oldcode">– Sample code on GitHub</span></a>';
    }
    return nameHTML + comment;
    //return link + nameHTML + comment;
  }

  const html = getName(p.project_count, p.name);
  return makeLink(p._id, p.github_repo, p.github_oldcode, html);
}

function makeListOfProperties(items, property) {
  return items
    .map(function(i) { 
      return i[property]; 
      //return '<img class="myicon" src="/icons/' + i['_id'] + '.svg">';
    })
    .join(', ');
};
