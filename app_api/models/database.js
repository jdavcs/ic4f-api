const mongoose = require('mongoose');

const ids = require('./ids');
const database_ids = ids.databases;

const Database = new mongoose.Schema({
  _id: {
    type: String,
    lowercase: true,
    enum: database_ids
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

mongoose.model('Database', Database, 'databases');
