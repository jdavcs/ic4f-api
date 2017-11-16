console.log('router file');
//TODO change all this to match new style

var express = require('express');
var router = express.Router();

var cProjects = require('../controllers/projects');
router.get('/projects/', cProjects.projectList);
router.get('/about/', cProjects.about);
router.get('/', cProjects.blog);


//var cOther    = require('../controllers/other');



//var cBlog     = require('../controllers/blog');

/* GET home page. */
//router.get('/', cBlog.index);
// router.get('/:post/', cBlog.post); TODO blog post
// router.get('/projects/:project/', cProjects.project); TODO project page
//router.get('/about/', cOther.about);

module.exports = router;
