const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Language = mongoose.model('Language');
const Framework = mongoose.model('Framework');
const Database = mongoose.model('Database');

//TODO must handle errors
const languageList = function(req, res){
  Language.getSorted(function(err, data) {
    res.status(200);
    res.json(data);
  });
};

const frameworkList = function(req, res){
  Framework.getSorted(function(err, data) {
    res.status(200);
    res.json(data);
  });
};

const databaseList = function(req, res){
  Database.getSorted(function(err, data) {
    res.status(200);
    res.json(data);
  });
};




const projectList = function(req, res){
  // work on this one
  res.status(200);
  res.json({"status": "success"});
};

const documentType = 'project'; //TODO this is bad
const projectReadOne = function(req, res){
  if (req.params && req.params.id) {
    Project
      .findById(req.params.id)
      .exec((err, doc) => {
        if (!doc) {
          res
            .status(404)
            .json({"message": `${documentType} not found`});
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
      .json({"message": `${documentType} id not in request`});
  }
};

module.exports = {
  languageList,
  frameworkList,
  databaseList,
  projectList,
  projectReadOne
};
