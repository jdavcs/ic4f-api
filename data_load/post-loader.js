const striptags = require('striptags');
const mongoose = require('mongoose');
require('../app_api/models/post');
const Post = mongoose.model('Post');
const BaseContentLoader = require('./baseloader');

const re = /(\d{4})-(\d{2})-(\d{2})-([\w-]+)/;
const separator = '<!--more-->';

module.exports = class PostLoader extends BaseContentLoader {

  processData(basename, attributes, body, callback) {
    const arr = basename.match(re);
    const y = parseInt(arr[1]);
    const m = parseInt(arr[2]);
    const d = parseInt(arr[3]);

    const id = arr[1] + '/' + arr[2] + '/' + arr[4];
    const date = new Date(y, m - 1, d);
    const excerpt = striptags(this.extractExcerpt(body));

    const post = new Post({
      '_id': id,
      'date': date, 
      'title': attributes.title,
      'excerpt': excerpt,
      'body': body
    });
    post.save( (err) => {
      if (err) throw err;
      console.log('Added post: ' + attributes.title);
      super.done(callback);
    });
  }

  extractExcerpt(body) {
    let i = body.indexOf(separator);
    if (i == -1) {
      i = body.indexOf('\n\n');
    }
    return body.substring(0, i);
  }
}

