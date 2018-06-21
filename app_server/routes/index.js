const express = require('express');
const router = express.Router();

const project = require('../controllers/project');

router.get('/projects/:projectId', project.viewProject);

module.exports = router;
