//TODO change all this to match new style

const express = require('express');
const router = express.Router();

const project = require('../controllers/project');
const blog = require('../controllers/blog');

router.get('/', blog.posts);
router.get('/projects/', project.projects);
router.get('/projects/:projectId', project.viewProject);

module.exports = router;
