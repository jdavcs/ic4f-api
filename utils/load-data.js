var seeder = require('mongoose-seed');
var fs = require('fs');

let dbURI = 'mongodb://localhost/ic4f';

seeder.connect(dbURI, { useMongoClient: true, }, () => {
  seeder.loadModels(['../app_api/models/projects.js']);

  seeder.clearModels(['Language', 'Framework', 'Database', 'Project'], () => {
    var mycontent = fs.readFileSync('../data/project-data.json');
    var data = JSON.parse(mycontent);

    seeder.populateModels(data, () => seeder.disconnect() );
  });
});
