const mongoose = require('mongoose');

require('../app_api/models/page');
require('../app_api/models/post');
require('../app_api/models/project');

const Loader = require('./pageloader');

let model = mongoose.model('Page');
let dataDir = '../data/pages/';

//require('../db');

const pageLoader = new Loader(model, '../data/pages/');
pageLoader.load();
//


//must disconnect
