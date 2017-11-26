const mongoose = require('mongoose');
const async = require('async');
const request = require('request');
const Page = mongoose.model('Page');

const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  //TODO change this to my own
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}

exports.viewPage = function viewPage(req, res, next) {
  const address = 'pages' + req.path;
  async.parallel({
    page: callback => getData(address, callback)
  }, function (err, results) { 
    if (err) { return next(err); }
    renderOnePage(req, res, results);
  });
}

function renderOnePage(req, res, data) {
  console.log('marker 1' + data.page.title);
  res.render('pageView', { 
    title: data.page.title, 
    body: data.page.body
  });
};

function getData(address, callback) {
  const requestOptions = {
    url: apiOptions.server + '/api/' + address,
    json: {}
  };
  request(
    requestOptions, 
    (err, response, body) => {
      if (err) {
        callback(err); //TODO do i need a return here?
      } else {
        console.log('m2 ' + JSON.stringify(body));
        callback(null, body);
      } 
    }
  );
};


