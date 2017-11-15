const mongoose = require('mongoose');
const framework_ids = require('./ids').framesorks;

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

Framework.statics.getList = function(cb) {
  return this.
    find({}).
    sort({'order': 1}).
    sort({'_id': 1}).
    exec(cb);
};

mongoose.model('Framework', Framework, 'frameworks');
