const mongoose = require('mongoose');
require('../app_api/models/project');
const Project = mongoose.model('Project');
const BaseContentLoader = require('./baseloader');

module.exports = class ProjectLoader extends BaseContentLoader {

  processData(basename, attributes, body, callback) {
    Project.update({_id: basename}, {content: body}, (err, dbResponse) => {
      if (err) throw err;
      console.log('Updated project page: ' + basename);
      super.done(callback);
    });
  }
}
