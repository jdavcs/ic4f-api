const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const documentType = 'project';


const languageList = function(req, res){
  res.status(200);
  res.json({"status": "success"});
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
