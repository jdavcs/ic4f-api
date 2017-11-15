const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Language = mongoose.model('Language');
const Framework = mongoose.model('Framework');
const Database = mongoose.model('Database');

//TODO must handle errors

const languageList = function(req, res) {
  Language.getList((err, data) => {
    res.status(200);
    res.json(data);
  });
};

const frameworkList = function(req, res){
  Framework.getList((err, data) => {
    res.status(200);
    res.json(data);
  });
};

const databaseList = function(req, res){
  Database.getList((err, data) => {
    res.status(200);
    res.json(data);
  });
};

//TODO is this how i handle errors?
const projectList = function(req, res){
  console.log('api called');
  Project.getList((err, data) => {
    if (err) {
      res.status(404);
      res.json(err);
    } else {
      res.status(200);
      res.json(data);
    }
  });
};

const projectReadOne = function(req, res){
  if (req.params && req.params.id) {
    Project
      .findById(req.params.id)
      .exec((err, doc) => {
        if (!doc) {
          res
            .status(404)
            .json({"message": "project not found"});
          return;
        } else if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        res
          .status(200)
          .json(doc);
      });
  } else {
    res
      .status(404)
      .json({"message": "project id not in request"});
  }
};

module.exports = {
  languageList,
  frameworkList,
  databaseList,
  projectList,
  projectReadOne
};
