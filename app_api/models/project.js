const mongoose = require('mongoose');
const ids = require('./ids');
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
    enum: language_ids}],
  frameworks: [{
    type: String,
    enum: framework_ids}],
  databases: [{
    type: String,
    enum: database_ids}],
  content: String
});

//TODO create virtuals for SORTED lists of langs/frms/dbs?

Project.statics.getList = function(cb) {
  return this.
    find({},{content:0}).
    sort({'_id': 1}).
    exec(cb);
};

mongoose.model('Project', Project, 'projects');
