const mongoose = require('mongoose');

const Page = new mongoose.Schema({
  route: {
    type: String,
    lowercase: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: String
});

mongoose.model('Page', Page, 'pages');
