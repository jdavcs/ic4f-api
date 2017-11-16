const request = require('request');

const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  //TODO change this to my own
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}


const about = function(req, res) {
  res.render('about', {title: 'About Me'});
}


const blog = function(req, res) {
  console.log('CALLED: blog server controller called============================');
  res.render('blog', {title: 'Blog'});
}

const projectList = function(req, res) {
  console.log('CALLED: projectlist server controller called============================');
  res.render('projects', {title: 'My Projects'});

  //const requestOptions = {
  //  url: apiOptions.server + '/api/projects',
  //  json: {}
  //};

  //request(
  //  requestOptions, 
  //  (err, response, body) => {
  //    if (response.statusCode === 200) {
  //      renderProjectList(req,res, body);
  //    }
  //  }
  //);

};


//const renderProjectList = function(req, res, responseBody) {
//  //console.log(body);
//  res.render('projects', { title: 'My Projects',
//    content:  responseBody}
//  );
//};


module.exports = {
  projectList,
  about, 
  blog
};
