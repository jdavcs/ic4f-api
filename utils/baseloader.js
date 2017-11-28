const fs = require('fs');
const fm = require('front-matter');
const md = require('marked');
const path = require('path');

// requires an open connection

// base (abstract) class for loading pages/posts/project pages into mongodb
module.exports = class BaseContentLoader {
  constructor(model, dataDirectory) {
    this.model = model;
    this.dataDir =  dataDirectory;
    this.filesToProcess = 0;
  }

  //step 0: call first step
  load(clear, callback) {
    if (clear) {
      this.clearCollection(callback);
    } else {
      this.processDir(callback);
    }
  }

  //step 1: remove collection from db; then call processDir
  clearCollection(callback) {
    this.model.remove({}, (err) => {
      if (err) throw err; 
      this.processDir(callback);
    });
  }

  //step 2: read contents of dir; then call processFile for each file
  processDir(callback) {
    fs.readdir(this.dataDir, (err, files) => {
      if (err) throw err;
      this.filesToProcess = files.length; 
      for (let f of files) {
        this.processFile(f, callback);
      }
    });
  }

  //step 3: process common stuff, then call processData (in subclass)
  processFile(filename, callback) {
    const filePath = path.resolve(this.dataDir, filename);
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) throw err;

      //extract front-matter
      const data = fm(content);

      //get extension and basename
      let basename = filename;
      const i = filename.lastIndexOf('.');
      if (i > 0) {
        let extension = filename.substring(i);
        basename = path.basename(filename, extension);
        //if markdown: convert to html
        if (extension === '.md') {
          data.body = md(data.body);
        }
      }

      //send to subclass to process data
      this.processData(basename, data.attributes, data.body, callback);
    });
  }

  //step 4: save to database (must be implemented in a subclass)
  processData() {
    const err = new Error('processData must be implemented in a subclass');
    throw err;
  }

  //step 5: close connection after last file is processed
  done(callback) {
    this.filesToProcess--; 
    if (this.filesToProcess === 0) {
      console.log('Collection documents loaded');
      callback();
    }
  }
}
