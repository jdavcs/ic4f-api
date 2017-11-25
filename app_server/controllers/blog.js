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
  //use async because there could be more api calls on this page
  async.parallel({
    posts: callback => getData('posts', callback),
  }, function (err, results) { 
    if (err) { return next(err); }
    renderPosts(req, res, results);
  });
}

function renderPosts(req, res, data) {
  res.render('posts', { 
    title: 'Recent Posts', 
    posts: data.posts 
  });
};

//this needs refactoring (see project.js for duplication)
function getData(address, callback) {
  const requestOptions = {
    url: apiOptions.server + '/api/' + address,
    json: {}
  };
  request(
    requestOptions, 
    (err, response, body) => {
     // console.log(body);
      if (err) {
        callback(err); //TODO do i need a return here?
      } else {
        callback(null, body);
      } 
    }
  );
};


