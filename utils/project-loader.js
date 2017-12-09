const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const mongoose = require('mongoose');
require('../app_api/models/project');
const Project = mongoose.model('Project');

//spreadsheet specs
const DB_PREFIX = '_db: '; // databases
const FT_PREFIX = '_ft: '; // frameworks & tools
const LN_PREFIX = '_ln: '; // languages

const POS_ID             =  0;
const POS_NAME           =  1;
const POS_DESC           =  2;
const POS_ISGROUP        =  3;
const POS_PROJECT_NAME   =  4;
const POS_ORDER          =  5;

const POS_DATE_START     =  6;
const POS_DATE_END       =  7;
const POS_GITHUB_REPO    =  8;
const POS_GITHUB_OLDCODE =  9;

const POS_DB_START       = 10;
const POS_DB_END         = 13;
const POS_FT_START       = 14;
const POS_FT_END         = 22;
const POS_LN_START       = 23;
const POS_LN_END         = 40;


module.exports = class ProjectLoader {
  constructor(csvFile) {
    this.loadData(csvFile);
  }

  load(clear, callback) {
    if (clear) {
      this.clearCollection(callback);
    } else {
      this.loadProjects(callback);
    }
  }

  clearCollection(callback) {
    Project.remove({}, (err) => {
      if (err) throw err; 
      this.loadProjects(callback);
    });
  }

  loadProjects(callback) {
    const projectMap = new Map();

    // Accumulate data in a map: update counts/dates for projects w/subprojects
    for (let i=1; i<this.data.length; i++) {

      const project = this.readProjectFromCSV(this.data[i]);

      if (projectMap.has(project._id)) {
        const parent = projectMap.get(project._id);
        this.updateArrays(parent.languages, project.languages);
        this.updateArrays(parent.frameworks, project.frameworks);
        this.updateArrays(parent.databases, project.databases);
        this.updateDates(parent, project);
        parent.project_count++;

      } else {
         projectMap.set(project._id, project);
      }
    }

    const projects = [];
    for (let p of projectMap.values()) {
      projects.push(p);
    }

    Project.insertMany(projects)
      .then( () => callback() )
      .catch((e) => {
        console.error(e.message); //TODO use this error handling in other files.
        callback();
    });
  }

  updateArrays(parentArr, newArr) {
    for (let item of newArr) {
      if (!parentArr.includes(item)) {
        parentArr.push(item);
      }
    }
  }

  updateDates(parent, newProject) {
    if (newProject.date_start < parent.date_start) {
      parent.date_start = newProject.date_start;
    }
    if (newProject.date_end < parent.date_end) {
      parent.date_end = newProject.date_end;
    }
  }

  readProjectFromCSV(row) {
    const p = new Project();
    p._id            = row[POS_ID];
    p.name           = row[POS_NAME];
    p.description    = row[POS_DESC];
    p.is_group       = row[POS_ISGROUP];
    p.project_name   = row[POS_PROJECT_NAME];
    p.order          = row[POS_ORDER];
    p.date_start     = row[POS_DATE_START];
    p.date_end       = row[POS_DATE_END];
    p.github_repo    = row[POS_GITHUB_REPO];
    p.github_oldcode = row[POS_GITHUB_OLDCODE];
    p.languages      = this.getArrayItems(row, POS_LN_START, POS_LN_END, this.lns);
    p.frameworks     = this.getArrayItems(row, POS_FT_START, POS_FT_END, this.fts);
    p.databases      = this.getArrayItems(row, POS_DB_START, POS_DB_END, this.dbs);
    return p;
  }

  getArrayItems(row, pos_start, pos_end, collection) {
    const items = [];
    for (let i=pos_start; i<=pos_end; i++) {
      if (row[i] === '1') {
        items.push(collection.get(i));
      }
    }
    return items;
  }

  loadData(csvFile) {
    const csvData = fs.readFileSync(csvFile, 'utf8')
    this.data = parse(csvData);

    // load array item names from header row
    this.dbs = new Map();
    this.fts = new Map();
    this.lns = new Map();

    for (let i=0; i<this.data[0].length; i++) {
      const key = this.data[0][i];
      if (this.isDatabase(key)) {
        this.dbs.set(i, this.extractTerm(key, DB_PREFIX));
      } else if (this.isFramework(key)) {
        this.fts.set(i, this.extractTerm(key, FT_PREFIX));
      } else if (this.isLanguage(key)) {
        this.lns.set(i, this.extractTerm(key, LN_PREFIX));
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
