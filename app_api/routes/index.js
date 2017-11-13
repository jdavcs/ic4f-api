const express = require('express');
const router = express.Router();
const cProjects = require('../controllers/projects');

router
  .route('/languages')
  .get(cProjects.languageList);

router
  .route('/frameworks')
  .get(cProjects.frameworkList);

router
  .route('/databases')
  .get(cProjects.databaseList);

router
  .route('/projects')
  .get(cProjects.projectList);

router
  .route('/projects/:id')
  .get(cProjects.projectReadOne);

module.exports = router;
