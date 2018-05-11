const mongoose = require('mongoose');
const group_ids = require('./_ids').groups;

const Group = new mongoose.Schema({
  _id: {
    type: String, 
    lowercase: true,
    enum: group_ids
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

Group.statics.getList = function(callback) {
  return this
    .find({})
    .sort({'order': 1}) 
    .exec(callback);
};

mongoose.model('Group', Group, 'groups');
