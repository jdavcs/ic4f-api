const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let dbURI = 'mongodb://localhost/ic4f';
//if production: connect to heroku
mongoose.connect(dbURI, { useMongoClient: true, });

var dbconn = mongoose.connection;
dbconn.on('error', console.error.bind(console, 'connection error:'));
dbconn.once('open', function() {
  console.log('Connected to database');
  loadData();
});

function loadData() {
  console.log('Loading data');
  require('../app_server/models/projects.js');

  const Language = dbconn.model('Language');
  //const fram = dbconn.model('Framework');
  //const db = dbconn.model('Database');
  //const proj = dbconn.model('Project');


  //first remove all
  //
  //this needs to come from a json file
  let p = new Language();
  p._id = 'python219';
  p.name = 'Python';
  p.type = 'programming';

  p.save().then(
    () => {
      console.log('Data loaded');
      shutdown();
    }, (err) => {
      console.error(err);
      shutdown();
    });
}

function shutdown() {
  console.log('Disconnecting');
  mongoose.disconnect();
}
