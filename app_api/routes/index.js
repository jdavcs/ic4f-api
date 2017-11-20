const express = require('express');
const router = express.Router();
const project = require('../controllers/project');

router
  .route('/languages')
  .get(project.languageList);

router
  .route('/frameworks')
  .get(project.frameworkList);

router
  .route('/databases')
  .get(project.databaseList);

router
  .route('/projects')
  .get(project.list);

router
  .route('/projects/:id')
  .get(project.view);

module.exports = router;
