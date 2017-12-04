const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const csvFile = 'test.csv';
const csvData = fs.readFileSync(csvFile, 'utf8')

//const data = parse(csvData, {columns:true});
const data = parse(csvData);

const json = JSON.stringify(data);

console.log(json);
