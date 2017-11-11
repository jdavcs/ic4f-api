const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  _id: {
    type: String, 
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["programming", "other"],
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
  type: [String],
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
  isFeatured: {
    type: Boolean,
    default: false,
  },
  content: String,
  languages: [languageSchema],
  frameworks: [frameworkSchema],
  databases: [databaseSchema],
});

mongoose.model('Project', projectSchema, 'projects');
