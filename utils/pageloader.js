const BaseContentLoader = require('./baseloader');

module.exports = class PageLoader extends BaseContentLoader {

  processData(callback) {
    console.log('cb=' + callback);
   // console.log(filename);

    callback();
  }
}
