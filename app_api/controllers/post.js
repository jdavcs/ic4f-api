const mongoose = require('mongoose');
const Post = mongoose.model('Post');

function list(req, res, next){
  Post.getList((err, data) => {
    if (err) {
      res.status(404);
      res.json(err);
    } else {
      res.status(200);
      res.json(data);
    }
  });
};

function view(req, res, next){
//  if (req.params && req.params.id) {
//    Post
//      .findById(req.params.id)
//      .exec((err, doc) => {
//        if (!doc) {
//          res
//            .status(404)
//            .json({"message": "project not found"});
//          return;
//        } else if (err) {
//          res
//            .status(404)
//            .json(err);
//          return;
//        }
//        res
//          .status(200)
//          .json(doc);
//      });
//  } else {
//    res
//      .status(404)
//      .json({"message": "project id not in request"});
//  }
};

module.exports = {
  list,
  view
};
