const mongoose = require('mongoose');

const language_ids = [
  "bash",
  "c",
  "c_sharp",
  "java",
  "javascript",
  "mumps",
  "php",
  "python",
  "ruby",
  "typescript",
  "vbscript",
  "vimscript",
  "sql",
  "html",
  "css",
  "sass",
  "yaml"
];

const framework_ids = [
  "django",
  "flask",
  "asp",
  "dot_net",
  "node",
  "express",
  "angular",
  "bootstrap"
];

const database_ids = [
  "access",
  "sql_server",
  "mysql",
  "mongodb"
];

const languageSchema = new mongoose.Schema({
  _id: {
    type: String, 
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  projects: {
    type: Number,
    default: 0
  }
});

const frameworkSchema = new mongoose.Schema({
  _id: {
    type: String, 
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  projects: {
    type: Number,
    default: 0
  }
});

const databaseSchema = new mongoose.Schema({
  _id: {
    type: String,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  projects: {
    type: Number,
    default: 0
  }
});

const projectSchema = new mongoose.Schema({
  _id: {
    type: String,
    lowercase: true
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

mongoose.model('Language', languageSchema, 'languages');
mongoose.model('Framework', frameworkSchema, 'frameworks');
mongoose.model('Database', databaseSchema, 'databases');
mongoose.model('Project', projectSchema, 'projects');
