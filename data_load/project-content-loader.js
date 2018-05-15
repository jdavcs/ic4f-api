const mongoose = require('mongoose');
require('../app_api/models/project'); //TODO do i need this?
const Project = mongoose.model('Project');
const BaseContentLoader = require('./baseloader');

module.exports = class ProjectContentLoader extends BaseContentLoader {

  processData(basename, attributes, body, callback) {
    Project.updateOne({_id: basename}, {content: body}, (err) => {
      if (err) throw err;
      console.log('Added project content for: ' + basename);
      super.done(callback);
    });
  }
}
