const async = require('async');
const request = require('request');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  //TODO change this to my own
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}

exports.posts = function blogtData(req, res, next) {
  renderPosts(req, res, {});
}


function renderPosts(req, res, data) {
  res.render('posts', { 
    title: 'Recent Posts', 
    posts: data 
  });
};
