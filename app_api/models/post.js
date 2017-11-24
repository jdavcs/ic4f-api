const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  _id: {
    type: String,
    lowercase: true,
  },
  title: {
    type: String,
    required: true
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
  content: String
});

mongoose.model('Post', Post, 'posts');
