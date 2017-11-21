//TODO change all this to match new style

var express = require('express');
var router = express.Router();

var project = require('../controllers/project');
router.get('/projects/', project.projects);

//router.get('/about/', cProject.about);
//router.get('/', cProject.blog);


//var cOther    = require('../controllers/other');



//var cBlog     = require('../controllers/blog');

/* GET home page. */
//router.get('/', cBlog.index);
// router.get('/:post/', cBlog.post); TODO blog post
// router.get('/projects/:project/', cProjects.project); TODO project page
//router.get('/about/', cOther.about);

module.exports = router;
