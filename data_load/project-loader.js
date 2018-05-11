const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const async = require('async');

const mongoose = require('mongoose');

require('../app_api/models/project');
require('../app_api/models/group');
require('../app_api/models/language');
require('../app_api/models/framework');
require('../app_api/models/database');

const Project = mongoose.model('Project');
const Group = mongoose.model('Group');
const Language = mongoose.model('Language');
const Framework = mongoose.model('Framework');
const Database = mongoose.model('Database');

//spreadsheet specs
const DB_PREFIX = '_db: '; // databases
const FT_PREFIX = '_ft: '; // frameworks & tools
const LN_PREFIX = '_ln: '; // languages

const POS_ID             =  0;
const POS_NAME           =  1;
const POS_DESC           =  2;
const POS_GROUP          =  3;
const POS_PROJECT_NAME   =  4;
const POS_ORDER          =  5;

const POS_YEAR_START     =  6;
const POS_YEAR_END       =  7;
const POS_GITHUB_REPO    =  8;
const POS_GITHUB_OLDCODE =  9;

const POS_DB_START       = 10;
const POS_DB_END         = 13;
const POS_FT_START       = 14;
const POS_FT_END         = 19;
const POS_LN_START       = 20;
const POS_LN_END         = 37;



module.exports = class ProjectLoader {
  constructor(csvFile) {
    this.loadFile(csvFile); //parse csv file
    /* project langs, frmks, dbs: many-to-many relationship */
    this.loadIds();         //load lang + frmk + db IDs from header row
    this.loadCounts();      //load lang + frmk + db project counts
    /* project groups: this is a one-to-many relationship, so handle differently */
    this.loadGroupCounts(); 
  }

  loadFile(csvFile) {
    const csvData = fs.readFileSync(csvFile, 'utf8')
    this.data = parse(csvData);
  }

  loadIds() {
    this.dbIds = new Map();
    this.ftIds = new Map();
    this.lnIds = new Map();

    const extractId = (key, prefix) => { 
      return key.substring(prefix.length);
    }

    for (let i=0; i<this.data[0].length; i++) {
      const heading = this.data[0][i];
      if (heading.startsWith(DB_PREFIX)) {
        this.dbIds.set(i, extractId(heading, DB_PREFIX));
      } else if (heading.startsWith(FT_PREFIX)) {
        this.ftIds.set(i, extractId(heading, FT_PREFIX));
      } else if (heading.startsWith(LN_PREFIX)) {
        this.lnIds.set(i, extractId(heading, LN_PREFIX));
      }
    }
  }

  loadCounts() {
    this.dbProjectCounts = new Map();
    this.ftProjectCounts = new Map();
    this.lnProjectCounts = new Map();

    const countItems = (row, start, end, ids, counts) => {
      for (let i=start; i<=end; i++) {
        if (row[i] === '1') {
          const id = ids.get(i);
          this.incrementMapItem(counts, id);
        }
      }
    }

    for (let i=1; i<this.data.length; i++) { //skipping header row
      countItems(this.data[i], POS_DB_START, POS_DB_END, this.dbIds, this.dbProjectCounts);
      countItems(this.data[i], POS_FT_START, POS_FT_END, this.ftIds, this.ftProjectCounts); 
      countItems(this.data[i], POS_LN_START, POS_LN_END, this.lnIds, this.lnProjectCounts);
    }
  }

  loadGroupCounts() {
    this.groupProjectCounts = new Map();
    for (let i=1; i<this.data.length; i++) {
      const id = this.data[i][POS_GROUP];
      this.incrementMapItem(this.groupProjectCounts, id);
    }
  }

  incrementMapItem(counts, item) {
    if (counts.has(item)) {
      counts.set(item, counts.get(item) + 1);
    } else {
      counts.set(item, 1);
    }
  }

  load(clearProjects, callback) {
    if (clearProjects) {
      Project.remove({}, (err) => {
        if (err) throw err; 
        this.loadProjects(callback);
      });
    } else {
      this.loadProjects(callback);
    }
  }

  loadProjects(callback) {
    const loadProjectFields = (row) => {
      const p = new Project();
      p._id            = row[POS_ID];
      p.name           = row[POS_NAME];
      p.description    = row[POS_DESC];
      p.group          = row[POS_GROUP];
      p.project_name   = row[POS_PROJECT_NAME];
      p.order          = row[POS_ORDER];
      p.year_start     = row[POS_YEAR_START];
      p.year_end       = row[POS_YEAR_END];
      p.github_repo    = row[POS_GITHUB_REPO];
      p.github_oldcode = row[POS_GITHUB_OLDCODE];
      p.languages      = getArrayItems(row, POS_LN_START, POS_LN_END, this.lnIds);
      p.frameworks     = getArrayItems(row, POS_FT_START, POS_FT_END, this.ftIds);
      p.databases      = getArrayItems(row, POS_DB_START, POS_DB_END, this.dbIds);
      return p;
    }

    const getArrayItems = (row, start, end, ids) => {
      const items = [];
      for (let i=start; i<=end; i++) {
        if (row[i] === '1') {
          items.push(ids.get(i));
        }
      }
      return items;
    }

    const updateArrays = (parentArr, newArr) => {
      for (let item of newArr) {
        if (!parentArr.includes(item)) {
          parentArr.push(item);
        }
      }
    }

    const updateDates = (parent, newProject) => {
      if (newProject.year_start < parent.year_start) {
        parent.year_start = newProject.year_start;
      }
      if (newProject.year_end > parent.year_end) {
        parent.year_end = newProject.year_end;
      }
    }

    // Accumulate data in a map: update counts/dates for projects and project groups (if grouped)
    const projectMap = new Map();

    for (let i=1; i<this.data.length; i++) {
      const project = loadProjectFields(this.data[i]);

      if (projectMap.has(project._id)) {
        const parent = projectMap.get(project._id);
        updateArrays(parent.languages, project.languages);
        updateArrays(parent.frameworks, project.frameworks);
        updateArrays(parent.databases, project.databases);
        updateDates(parent, project);
        parent.project_count++;
      } else {
        projectMap.set(project._id, project);
      }
    }

    const projects = [];
    for (let p of projectMap.values()) {
      projects.push(p);
    }
    this.saveData(projects, callback);
  }

  saveData(projects, callback) {
    // in parallel:
    // - insertMany: projects
    // - each database: update project count
    // - each framework: update project count
    // - each language: update project count
    // - each project group: update project count

    const saveProjects = (projects, callback) => {
      Project.insertMany(projects)
        .then(() => callback())
        .catch((e) => {
          console.error(e.message); //TODO use this error handling in other files.
          callback();
        });
    }

    const saveDbCounts = (callback) => {
      async.each(this.dbProjectCounts.entries(), updateDb, callback);
    }

    const saveFtCounts = (callback) => {
      async.each(this.ftProjectCounts.entries(), updateFt, callback);
    }

    const saveLnCounts = (callback) => {
      async.each(this.lnProjectCounts.entries(), updateLn, callback);
    }

    const saveGrCounts = (callback) => {
      async.each(this.groupProjectCounts.entries(), updateGr, callback);
    }

    const updateDb = (entry, callback) => {
      Database.updateOne({_id: entry[0]}, {'projects': entry[1]}, callback);
    }

    const updateFt = (entry, callback) => {
      Framework.updateOne({_id: entry[0]}, {'projects': entry[1]}, callback);
    }

    const updateLn = (entry, callback) => {
      Language.updateOne({_id: entry[0]}, {'projects': entry[1]}, callback);
    }

    const updateGr = (entry, callback) => {
      Group.updateOne({_id: entry[0]}, {'projects': entry[1]}, callback);
    }

    async.parallel([
      function(callback) {
        saveProjects(projects, callback);
      },
      function(callback) {
        saveDbCounts(callback);
      },
      function(callback) {
        saveFtCounts(callback);
      },
      function(callback) {
        saveLnCounts(callback);
      },
      function(callback) {
        saveGrCounts(callback);
      }
    ], callback);
  }
}
