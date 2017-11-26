const dateFormat = require('dateformat');
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

exports.viewPost = function viewPost(req, res, next) {
  const address = req.path;
  console.log('CALLING THIS: ' + address);
  async.parallel({
    post: callback => getData(address, callback)
  }, function (err, results) { 
    console.log('MARKER 11');
    if (err) { return next(err); }
    renderOnePost(req, res, results);
  });
}

exports.posts = function posts(req, res, next) {
  //use async because there could be more api calls on this page
  async.parallel({
    posts: callback => getData('/posts', callback),
  }, function (err, results) { 
    if (err) { return next(err); }
    renderPosts(req, res, results);
  });
}

function renderOnePost(req, res, data) {
    console.log('MARKER 13');
  res.render('postView', { 
    title: data.post.title, 
    post: data.post,
    dateFormat: dateFormat
  });
};

function renderPosts(req, res, data) {
  res.render('posts', { 
    title: 'Recent Posts', 
    posts: data.posts,
    dateFormat: dateFormat
  });
};

//this needs refactoring (see project.js for duplication)
function getData(address, callback) {
  const requestOptions = {
    url: apiOptions.server + '/api' + address, //no trailing slash!
    json: {}
  };
  console.log('OPTIONS ' + requestOptions.url);
  request(
    requestOptions, 
    (err, response, body) => {
      if (err) {
        callback(err); //TODO do i need a return here?
      } else {
        console.log('MARKER 10');
        callback(null, body);
      } 
    }
  );
};


