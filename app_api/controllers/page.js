const mongoose = require('mongoose');
const Page = mongoose.model('Page');

function view(req, res, next){
  console.log(req.params);
  if (req.params && req.params.pageId) {
    Page
      .findOne({'_id': req.params.pageId})
      .exec((err, doc) => {
        if (!doc) {
          res
            .status(404)
            .json({"message": "page not found"});
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
      .json({"message": "page route not in request"});
  }
};

module.exports = {
  view
};
