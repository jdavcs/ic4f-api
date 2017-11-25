// This scirpt:
// 1. Get list of filenames from the 'data/posts' directory
// 2. For each filename:
//    2.1. Extract date + slug from filename
//    2.1. Read the file content
//    2.2. Update the corresponding post in the db.
// 3. When all files are processed, close db connection.

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fm = require('front-matter');
require('../db');
require('../app_api/models/post');

const Post = mongoose.model('Post');
const dataDir = '../data/posts/';
const fileExt = '.md';

const re = /(\d{4})-(\d{2})-(\d{2})-([\w-]+)/;

let toProcess = 0; //this global is annoying...

function main() {
  clearPosts();
  fs.readdir(dataDir, (err, files) => {
    if (err) throw err;
    toProcess = files.length; 
    for (let f of files) {
      processFile(f);
    }
  });
}

function clearPosts() {
  Post.remove({}, (err) => {
    if (err) throw err; 
  });
}

function processFile(filename) {
  const projectId = path.basename(filename, fileExt);
  const filePath = path.resolve(dataDir, filename);

  const arr = filename.match(re);
  const y = parseInt(arr[1]);
  const m = parseInt(arr[2]);
  const d = parseInt(arr[3]);
  const date = new Date(y, m - 1, d);
  const slug = arr[4];

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) throw err;
    const data = fm(content);
    title = data.attributes.title;
    body = data.body;
    updatePost(slug, date, title, body);
  });
}

function updatePost(slug, date, title, body) {
  const post = new Post({
    'slug': slug,
    'date': date, 
    'title': title,
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
