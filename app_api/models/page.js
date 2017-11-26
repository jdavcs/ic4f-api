const mongoose = require('mongoose');

const Page = new mongoose.Schema({
  _id: { //this is the path
    type: String,
    required: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  body: String
});

mongoose.model('Page', Page, 'pages');
