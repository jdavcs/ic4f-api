const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fm = require('front-matter');
const md = require('marked');
require('../db');
require('../app_api/models/page');

const Page = mongoose.model('Page');
const dataDir = '../data/pages/';

let toProcess = 0; //this global is annoying...

function main() {
  clearPages();
  fs.readdir(dataDir, (err, files) => {
    if (err) throw err;
    toProcess = files.length; 
    for (let f of files) {
      processFile(f);
    }
  });
}

function clearPages() {
  Page.remove({}, (err) => {
    if (err) throw err; 
  });
}

function processFile(filename) {

  let fileExt = '';
  if (filename.endsWith('.md')) {
    fileExt = '.md';
  } else if  (filename.endsWith('.html')) {
    fileExt = '.html';
  }

  const pageId = path.basename(filename, fileExt);
  const filePath = path.resolve(dataDir, filename);

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) throw err;
    const data = fm(content);
    title = data.attributes.title;
    body = data.body;
    if (fileExt === '.md') {
      body = md(body);
    }
    updatePage(pageId, title, body);
  });
}

function updatePage(pageId, title, body) {
  const page = new Page({
    '_id': pageId,
    'title': title,
    'body': body
  });
  page.save( (err) => {
    if (err) throw err;
    console.log('Added page: ' + title);
    done();
  });
}

function done() {
  toProcess--; 
  if (toProcess === 0) {
    mongoose.disconnect();
  }
}

main();
