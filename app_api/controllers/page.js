const mongoose = require('mongoose');
const Page = mongoose.model('Page');

function view(req, res, next){
  console.log('call 3');
  if (req.params && req.params.route) {
    Page
      .findOne({'route': req.params.route})
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
