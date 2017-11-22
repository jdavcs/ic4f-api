//TODO change all this to match new style

var express = require('express');
var router = express.Router();

var project = require('../controllers/project');
var blog = require('../controllers/blog');

router.get('/', blog.posts);
router.get('/projects/', project.projects);
router.get('/projects/:projectId', project.viewProject);

module.exports = router;
