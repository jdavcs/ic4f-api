const mongoose = require('mongoose');

//const ids = require('./ids');
const language_ids = require('./ids').languages;

const Language = new mongoose.Schema({
  _id: {
    type: String, 
    lowercase: true,
    enum: language_ids
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

Language.statics.getSorted = function(cb) {
  console.log(this);
  return this.
    find({}).
    sort({'order': 1}).
    sort({'_id': 1}).
    exec(cb);
};

mongoose.model('Language', Language, 'languages');
