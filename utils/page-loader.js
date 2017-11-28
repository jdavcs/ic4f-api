const mongoose = require('mongoose');
require('../app_api/models/page');
const Page = mongoose.model('Page');
const BaseContentLoader = require('./baseloader');

module.exports = class PageLoader extends BaseContentLoader {

  processData(basename, attributes, body, callback) {
    const page = new Page({
      '_id': basename,
      'title': attributes.title,
      'body': body
    });
    page.save( (err) => {
      if (err) throw err;
      console.log('Added page: ' + attributes.title);
      super.done(callback);
    });
  }
}
