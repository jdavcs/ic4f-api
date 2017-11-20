const mongoose = require('mongoose');
const ids = require('./_ids');
const project_ids   = ids.projects;
const language_ids  = ids.languages;
const framework_ids = ids.frameworks; 
const database_ids  = ids.databases;

const Project = new mongoose.Schema({
  _id: {
    type: String,
    lowercase: true,
    enum: project_ids
  },
  name: {
    type: String,
    required: true
  },
  year_start: {
    type: Number,
    required: true,
  },
  yearEnd: Number,
  status: {
    type: String,
    required: true
  },
  websiteUrl: String,
  githubUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  types: [String],

  languages: [{
    type: String,
    ref: "Language",
    enum: language_ids}],
  frameworks: [{
    type: String,
    ref: "Framework",
    enum: framework_ids}],
  databases: [{
    type: String,
    ref: "Database",
    enum: database_ids}],
  content: String
});

Project.virtual('url').get(function() {
  return 'projects/' + this._id;
});

Project.statics.getList = function(callback) {
  return this.
    find({},{content:0}).
    sort({'_id': 1}).
    populate({
      path: "languages",
      select: "id name",
      options: {sort: { order: 1 }}
    }).
    populate({
      path: "frameworks",
      select: "id name",
      options: {sort: { order: 1 }}
    }).
    populate({
      path: "databases",
      select: "id name",
      options: {sort: { _id: 1 }}
    }).
    exec(callback);
};

Project.statics.countByLanguage = function(language, callback) {
  return this.count({'languages':  language} , callback);
};

Project.statics.countByFramework = function(framework, callback) {
  return this.count({'frameworks': framework} , callback);
};

Project.statics.countByDatabase = function(database, callback) {
  return this.count({'database': database} , callback);
};

mongoose.model('Project', Project, 'projects');
