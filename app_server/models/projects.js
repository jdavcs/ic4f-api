const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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
  languages: enum,...................................
  frameworks: [frameworkSchema],
  databases: [databaseSchema],
  content: String
});

mongoose.model('Language', languageSchema, 'languages');
mongoose.model('Framework', frameworkSchema, 'frameworks');
mongoose.model('Database', databaseSchema, 'databases');
mongoose.model('Project', projectSchema, 'projects');

