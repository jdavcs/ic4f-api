const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  date: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: 'Sergey Golitsynskiy'
  },
  tags: [String],
  body: String
});

Post.virtual('url').get(function() {
  return 'blog/' + 
    this.date.getFullYear() + '/' + 
    (this.date.getMonth() + 1) + '/' + 
    this.slug;
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
