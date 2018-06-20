require('dotenv').config({path: '../.env'});
const seeder = require('mongoose-seed');
const fs = require('fs');

const Db = require('../db');
const db = new Db();
let dbURI = db.getDbURI();

seeder.connect(dbURI, {useMongoClient: true}, () => {
  seeder.loadModels([
    '../app_api/models/group.js',
    '../app_api/models/language.js',
    '../app_api/models/framework.js',
    '../app_api/models/database.js',
  ]);
  seeder.clearModels(['Group', 'Language', 'Framework', 'Database'], () => {
    const mycontent = fs.readFileSync(process.env.DATA_PATH + 'project-data.json');
    const data = JSON.parse(mycontent);
    seeder.populateModels(data, () => seeder.disconnect() );
  });
});
