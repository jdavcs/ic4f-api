var express = require('express');
var router = express.Router();

var cBlog     = require('../controllers/blog');
var cProjects = require('../controllers/projects');
var cOther    = require('../controllers/other');

/* GET home page. */
router.get('/', cBlog.index);
// router.get('/:post/', cBlog.post); TODO blog post
router.get('/projects/', cProjects.index);
// router.get('/projects/:project/', cProjects.project); TODO project page
router.get('/about/', cOther.about);

module.exports = router;
