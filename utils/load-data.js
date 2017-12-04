const seeder = require('mongoose-seed');
const fs = require('fs');

const Db = require('../db');
const db = new Db();
let dbURI = db.getDbURI();

seeder.connect(dbURI, {useMongoClient: true}, () => {
  seeder.loadModels([
    '../app_api/models/language.js',
    '../app_api/models/framework.js',
    '../app_api/models/database.js',
//    '../app_api/models/project.js'
  ]);
  seeder.clearModels(['Language', 'Framework', 'Database', 'Project'], () => {
    const mycontent = fs.readFileSync('../data/project-data.json');
    const data = JSON.parse(mycontent);
    seeder.populateModels(data, () => seeder.disconnect() );
  });
});
