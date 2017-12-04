const parse = require('csv-parse/lib/sync');
const fs = require('fs');

require('../app_api/models/project');
//const Db = require('../db');
//const db = new Db();

const DB_PREFIX = '_db: '; // databases
const FT_PREFIX = '_ft: '; // frameworks & tools
const LN_PREFIX = '_ln: '; // languages

function main(csvFile) {


  const csvData = fs.readFileSync(csvFile, 'utf8')
  
  //const data = parse(csvData, {columns:true});
  const data = parse(csvData);


  // I can assume that indexes of db/ft/ln columns are sequential.
  let dbMin = Number.MAX_VALUE;
  let dbMax = 0;
  let ftMin = Number.MAX_VALUE;
  let ftMax = 0;
  let lnMin = Number.MAX_VALUE;
  let lnMax = 0;

  const dbs = new Map();
  const fts = new Map();
  const lns = new Map();

  for (let i=0; i<data[0].length; i++) {
    const key = data[0][i];
    if (isDatabase(key)) {
      dbs.set(i, extractTerm(key, DB_PREFIX));
      dbMin = Math.min(dbMin, i);
      dbMax = Math.max(dbMax, i);
    } else if (isFramework(key)) {
      fts.set(i, extractTerm(key, FT_PREFIX));
      ftMin = Math.min(ftMin, i);
      ftMax = Math.max(ftMax, i);
    } else if (isLanguage(key)) {
      lns.set(i, extractTerm(key, LN_PREFIX));
      lnMin = Math.min(lnMin, i);
      lnMax = Math.max(lnMax, i);
    }
  }

  for (let i=1; i<data.length; i++) {
    console.log(data[i][3]);

    project = {};

    for (let j=lnMin; j<=lnMax; j++) {
      if (data[i][j] === '1') {
        //console.log('\t' + lns.get(j));
      }
    }


    project.save();
  }

}


function updateDb(docs) {


}

function isDatabase(key) {
  return key.startsWith(DB_PREFIX);
}

function isFramework(key) {
  return key.startsWith(FT_PREFIX);
}

function isLanguage(key) {
  return key.startsWith(LN_PREFIX);
}

function extractTerm(key, prefix) {
  return key.substring(prefix.length);
}



//const json = JSON.stringify(data, null, '\t');
//console.log(json);
  //
main('projects.csv');
