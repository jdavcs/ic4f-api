const fs = require('fs');
const fm = require('front-matter');
const md = require('marked');
const path = require('path');
const mongoose = require('mongoose');

class BaseContentLoader {

  constructor(model, dataDir) {
    this.model = model;
    this.dataDir = dataDir;
    this.toProcess = 0;
  }

  sayHello() { console.log('hello'); }

  load(callback) {
    this.clearCollection();
    fs.readdir(this.dataDir, (err, files) => {
      if (err) throw err;
      this.toProcess = files.length; 
      for (let f of files) {
        this.processFile(f);
      }
    });
  }

  clearCollection() {
    this.model.remove({}, (err) => {
      if (err) throw err; 
    });
  }

  processFile(filename) {
    console.log(filename);
  }
}


module.exports = BaseContentLoader;
