const mongoose = require('mongoose');

const ids = require('./ids');
const project_ids   = ids.projects;
const language_ids  = ids.languages;
const framework_ids = ids.frameworks; 
const database_ids  = ids.databases;
//
//
//const Language = require('./language');
//const Database = require('./database');



//require('./testme');
var x = require('./testme');
//console.log(x);


//console.log('foo = ' + foo);
//console.log('x.foo = ' + x.foo);
//x.sayHello();
sayHello(); //WHY DOES THIS WORK???????
//maybe i shouldn't define the function at the top level???
//
//x.sayIt();
//

/*****************************************************************************
 * Define schemas.
 ****************************************************************************/










const projectSchema = new mongoose.Schema({
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

mongoose.model('Project', projectSchema, 'projects');
