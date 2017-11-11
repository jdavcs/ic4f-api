module.exports.index = function(req, res) {
  res.render('index', { title: 'Recent Posts',
    content: " encode/decode this before serving"}
  );
};
