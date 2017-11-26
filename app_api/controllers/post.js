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
  console.log('MARKER 8');
  if (req.params && req.params.year && req.params.month && req.params.slug) {
    const id = req.params.year + '/' + req.params.month + '/' + req.params.slug;
    console.log('ID ' + req.baseUrl);

    Post
      .findById(id)
      .exec((err, doc) => {
        if (!doc) {
          res
            .status(404)
            .json({"message": "post not found"});
          return;
        } else if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        res
          .status(200)
          .json(doc);
      });
  } else {
    res
      .status(404)
      .json({"message": "post params not in request"});
  }
};

module.exports = {
  list,
  view
};
