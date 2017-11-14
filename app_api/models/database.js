const mongoose = require('mongoose');
const database_ids = require('./ids').databases;

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

Database.statics.getSorted = function(cb) {
  return this.
    find({}).
    sort({'_id': 1}).
    exec(cb);
};

mongoose.model('Database', Database, 'databases');
