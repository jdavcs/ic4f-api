const mongoose = require('mongoose');

require('../app_api/models/page');
require('../app_api/models/post');
require('../app_api/models/project');

const Loader = require('./baseloader');

let model = mongoose.model('Page');
let dataDir = '../data/pages/';

//require('../db');

const pageLoader = new Loader(Page, '../data/pages/');
pageLoader.load();
//


function dis
//must disconnect
