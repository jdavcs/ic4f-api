const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Language = mongoose.model('Language');
const Framework = mongoose.model('Framework');
const Database = mongoose.model('Database');

//TODO: decide HOW to handle errors: use api on webpages, and then decide.

function languageList(req, res) {
  Language.getList((err, data) => {
    if (err) {
      res.status(500);
      res.json({error: err.toString()});
    } else {
      res.status(200);
      res.json(data);
    }
  });
};

function frameworkList(req, res, next) {
  Framework.getList((err, data) => {
    if (err) return next(err); 
    res.status(200);
    res.json(data);
  });
};

function databaseList(req, res, next) {
  Database.getList((err, data) => {
    if (err) return next(err); 
    res.status(200);
    res.json(data);
  });
};


function list(req, res, next){
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

function view(req, res, next){
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
  list,
  view
};
