const path = require('path');
const mongoose = require('mongoose');

let dbURI = 'mongodb://localhost/ic4f';
mongoose.connect(dbURI, { useMongoClient: true, });

var dbconn = mongoose.connection;
dbconn.on('error', console.error.bind(console, 'connection error:'));
dbconn.once('open', function() {
  console.log('Connected to database!');
  loadData();
  console.log('done 2');



  //this needs to exec after loaddaata is done 
  mongoose.disconnect();
});

function loadData() {
  console.log('Loading data');

  const mp = '../app_server/models/projects.js';

  var model = require(path.resolve(mp));


  console.log('done 1');
  
}
