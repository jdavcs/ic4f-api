var seeder = require('mongoose-seed');
var fs = require('fs');

let dbURI = 'mongodb://localhost/ic4f';

seeder.connect(dbURI, { useMongoClient: true, }, function() {
  seeder.loadModels(['../app_server/models/projects.js']);

  seeder.clearModels(['Language', 'Framework', 'Database', 'Project'], function() {
    var mycontent = fs.readFileSync('../data/project-data.json');
    var data = JSON.parse(mycontent);

    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});
