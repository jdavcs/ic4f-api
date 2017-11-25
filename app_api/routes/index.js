const express = require('express');
const router = express.Router();
const project = require('../controllers/project');
const page = require('../controllers/page');
const post = require('../controllers/post');

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
  .route('/projects/:projectId')
  .get(project.view);

router
  .route('/posts')
  .get(post.list);

router
  .route('/posts/:year/:month/:slug')
  .get(post.view);

router
  .route('/:route')
  .get(page.view);

module.exports = router;
