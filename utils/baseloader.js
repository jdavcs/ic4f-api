const fs = require('fs');
const fm = require('front-matter');
const md = require('marked');
const path = require('path');
const mongoose = require('mongoose');
const Db = require('../db');

// base (abstract) class for loading pages/posts/project pages into mongodb
module.exports = class BaseContentLoader {
  constructor(model, dataDirectory) {
    this.model = model;
    this.dataDir =  dataDirectory;
    this.toProcess = 0;
    this.db = new Db();
  }

  //TODO pass the callback to the end
  load(callback) {
    this.db.connect();
    this.clearCollection();
  }

  //step 1:
  //- removes collection from db
  //- then calls processDir
  clearCollection() {
    this.model.remove({}, (err) => {
      if (err) throw err; 
      console.log('clearCollection done');
      this.processDir();
    });
  }

  //step 2:
  //- reads contents of dir as files 
  //- then calls processFile for each file in files
  processDir() {
    console.log('processDir called');
    fs.readdir(this.dataDir, (err, files) => {
      if (err) throw err;
      this.toProcess = files.length; 
      for (let f of files) {
        this.processFile(f);
      }
    });
  }

  //step 3 (after dataDir is read)
  processFile(filename) {
    const filePath = path.resolve(this.dataDir, filename);
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) throw err;

      //process front-matter
      const data = fm(content);
      const attributes = data.attributes;
      const body = data.body;

      //process markdown

      //send to concrete subclass to process data
      console.log(this);
      this.processData(this.done);
    });

    //read file, then:
    //  1.apply fm, get data
    //  2. apply md to data.body based on file extension 
    //  3. call subclass method to process specific content and update db. 
    //  4. pass done() as callback to #3.
    //
    //const err = new Error('processFile method must be implemented by a subclass');
    //throw err;
  }

  processData() {
  }

  done() {
    console.log('processing done');
    this.toProcess--; 
    if (this.toProcess === 0) {
      mongoose.disconnect();
    }
  }


}

