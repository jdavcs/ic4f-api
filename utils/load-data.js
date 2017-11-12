var seeder = require('mongoose-seed');
var fs = require('fs');

let dbURI = 'mongodb://localhost/ic4f';

seeder.connect(dbURI, { useMongoClient: true, }, function() {
  seeder.loadModels(['../app_server/models/projects.js']);

  seeder.clearModels(['Language', 'Framework', 'Database', 'Project'], function() {

    var mycontent = fs.readFileSync('data/technologies.json');
    var data = JSON.parse(mycontent);
    
    var mycontent2 = fs.readFileSync('data/projects.json');
    var data2 = JSON.parse(mycontent2);

    seeder.populateModels(data2, function() {
      seeder.disconnect();
    });
  });
});
