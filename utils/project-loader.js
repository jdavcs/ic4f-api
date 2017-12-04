const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const mongoose = require('mongoose');
require('../app_api/models/project');
const Project = mongoose.model('Project');

const DB_PREFIX = '_db: '; // databases
const FT_PREFIX = '_ft: '; // frameworks & tools
const LN_PREFIX = '_ln: '; // languages

module.exports = class ProjectLoader {
  constructor(csvFile) {
    this.loadData(csvFile);
  }
  //step 0: call first step
  load(clear, callback) {
    if (clear) {
      this.clearCollection(callback);
    } else {
      this.loadProjects(callback);
    }
  }

  //step 1: remove collection from db; then call processDir
  clearCollection(callback) {
    Project.remove({}, (err) => {
      if (err) throw err; 
      this.loadProjects(callback);
    });
  }

  loadProjects(callback) {

    const projects = [];

    for (let i=1; i<this.data.length; i++) {
      const row = this.data[i];
      //create empty project
      const p = new Project();
      projects.push(p);

      p.group_id = row[0];
      p.group_name = row[1];
      p.group_description = row[2];
      p._id = row[3];
      p.name = row[4];
      p.date_start = row[5];
      p.date_end = row[6];
      p.github_repo = row[7];
      p.subrepo = row[8];

      console.log(p);
      p.save(callback);
//      break;


      for (let j=this.lnMin; j<=this.lnMax; j++) {
        if (this.data[i][j] === '1') {
          //console.log('\t' + lns.get(j));
        }
      }
    }

    //now try to use update many


//    Project.update({_id: basename}, {content: body}, (err, dbResponse) => {
//      if (err) throw err;
//      console.log('Updated project page: ' + basename);
//      super.done(callback);
//    });
 //   callback();
  }

  loadData(csvFile) {
    //Load csv data
    const csvData = fs.readFileSync(csvFile, 'utf8')
    this.data = parse(csvData);

    // Load column numbers (I can assume that indexes of db/ft/ln columns are sequential)
    //    and maps for array data (databases, frameworks, and languages.
    this.dbMin = Number.MAX_VALUE;
    this.dbMax = 0;
    this.ftMin = Number.MAX_VALUE;
    this.ftMax = 0;
    this.lnMin = Number.MAX_VALUE;
    this.lnMax = 0;

    this.dbs = new Map();
    this.fts = new Map();
    this.lns = new Map();

    for (let i=0; i<this.data[0].length; i++) {
      const key = this.data[0][i];
      if (this.isDatabase(key)) {
        this.dbs.set(i, this.extractTerm(key, DB_PREFIX));
        this.dbMin = Math.min(this.dbMin, i);
        this.dbMax = Math.max(this.dbMax, i);
      } else if (this.isFramework(key)) {
        this.fts.set(i, this.extractTerm(key, FT_PREFIX));
        this.ftMin = Math.min(this.ftMin, i);
        this.ftMax = Math.max(this.ftMax, i);
      } else if (this.isLanguage(key)) {
        this.lns.set(i, this.extractTerm(key, LN_PREFIX));
        this.lnMin = Math.min(this.lnMin, i);
        this.lnMax = Math.max(this.lnMax, i);
      }
    }
  }

  isDatabase(key) {
    return key.startsWith(DB_PREFIX);
  }
  
  isFramework(key) {
    return key.startsWith(FT_PREFIX);
  }
  
  isLanguage(key) {
    return key.startsWith(LN_PREFIX);
  }
  
  extractTerm(key, prefix) {
    return key.substring(prefix.length);
  }
}
