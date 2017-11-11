module.exports.index = function(req, res) {
  res.render('projects', { title: 'My Projects',
    content: " encode/decode this before serving"}
  );
};
