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

mongoose.model('Post', Post, 'posts');
