const mongoose = require('mongoose');
const database_ids = require('./_ids').databases;

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

Database.statics.getList = function(cb) {
  return this.
    find({}).
    sort({'_id': 1}).
    exec(cb);
};

mongoose.model('Database', Database, 'databases');
