const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fm = require('front-matter');
const md = require('marked');
const Db = require('../db');


//setup db connection 
if (process.env.NODE_ENV === 'production') {
  let dbURI = 'something else';
} else {
  let dbURI = 'mongodb://localhost/ic4f';
}

let dbURI = 'mongodb://localhost/ic4f';
const db = new Db(dbURI);
db.connect();





require('../app_api/models/post');
const Post = mongoose.model('Post');
const dataDir = '../data/posts/';

const re = /(\d{4})-(\d{2})-(\d{2})-([\w-]+)/;
const separator = '<!--more-->';

let toProcess = 0; //this global is annoying...

function main() {
  clearCollection(Post);
  fs.readdir(dataDir, (err, files) => {
    if (err) throw err;
    toProcess = files.length; 
    for (let f of files) {
      processFile(f);
    }
  });
}

function clearCollection(coll) {
  coll.remove({}, (err) => {
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

  const filePath = path.resolve(dataDir, filename);

  const arr = filename.match(re);
  const y = parseInt(arr[1]);
  const m = parseInt(arr[2]);
  const d = parseInt(arr[3]);
  const date = new Date(y, m - 1, d);
  const id = arr[1] + '/' + arr[2] + '/' + arr[4];

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) throw err;
    const data = fm(content);
    title = data.attributes.title;
    body = data.body;
    excerpt = extractExcerpt(body);
    updatePost(id, date, title, excerpt, body);
  });
}

function extractExcerpt(body) {
  let i = body.indexOf(separator);
  if (i == -1) {
    i = body.indexOf('\n\n');
  }
  return body.substring(0, i);
}

function updatePost(id, date, title, excerpt, body) {
  const post = new Post({
    '_id': id,
    'date': date, 
    'title': title,
    'excerpt': excerpt,
    'body': body
  });
  post.save( (err) => {
    if (err) throw err;
    console.log('Added post: ' + title);
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
