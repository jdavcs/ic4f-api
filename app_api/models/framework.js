const mongoose = require('mongoose');

const ids = require('./ids');
const framework_ids = ids.frameworks;

const Framework = new mongoose.Schema({
  _id: {
    type: String, 
    lowercase: true,
    enum: framework_ids
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

mongoose.model('Framework', Framework, 'frameworks');
