const mongoose = require('mongoose');
const Project = mongoose.model('Project');


const Language = mongoose.model('Language');
//
//
//
//
//
const documentType = 'project'; //TODO this is bad


const languageList = function(req, res){
  Language.getSorted(function(err, lang) {
    res.status(200);
    res.json(lang);
  });

 // Language.find({}).sort({

//  Language.find({}, function(err, lang) {
//    if (err) {
//      res
//        .status(404)
//        .json(err);
//      return;
//    }
//    res.status(200);
//    res.json(lang);
//  });
};

const frameworkList = function(req, res){
  res.status(200);
  res.json({"status": "success"});
};

const databaseList = function(req, res){
  res.status(200);
  res.json({"status": "success"});
};

const projectList = function(req, res){

  res.status(200);
  res.json({"status": "success"});
};

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
