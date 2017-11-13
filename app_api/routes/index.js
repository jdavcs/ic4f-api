const express = require('express');
const router = express.Router();
const cProjects = require('../controllers/projects');

router
  .route('/projects')
  .get(cProjects.projectList);

router
  .route('/projects/:id')
  .get(cProjects.projectReadOne);

module.exports = router;
