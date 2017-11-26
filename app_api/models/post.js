const mongoose = require('mongoose');

const blogPrefix = '/blog'; //needs refactoring: duplicate

const Post = new mongoose.Schema({
  _id: { //this is the path: /yyyy/mm/slug
    type: String,
    required: true,
    lowercase: true
  },
  date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: 'Sergey Golitsynskiy'
  },
  excerpt: {
    type: String
  },
  tags: [String],
  body: String
});

Post.virtual('url').get(function() {
  return blogPrefix + '/' + this._id;
});

Post.statics.getList = function(callback) {
  return this
    .find({}, {'body': 0})
    .sort({'date': -1})
    .exec(callback);
};


Post.set('toJSON', {
  virtuals: true
});

mongoose.model('Post', Post, 'posts');
