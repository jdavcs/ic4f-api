/*****************************************************************************
 * Define allowed IDs for languages, frameworks, databases, and projects.
 * Before adding a new document to any of these collections, first add
 * its new ID to one of these lists.
 *
 * (DRY) Even though the same IDs are present in the json data files that are
 * used to populate the collections, this file is the definitive source of
 * knowledge about document IDs.
 ****************************************************************************/

const languages = [
  'bash',
  'c',
  'c_sharp',
  'sass',
  'css',
  'html',
  'java',
  'javascript',
  'mumps',
  'php',
  'python',
  'ruby',
  'sql',
  'typescript',
  'vb.net',
  'vbscript',
  'vimscript',
  'yaml'
];

const frameworks = [
  'angular',
  'asp',
  'asp.net',
  'django',
  'express',
  'jquery',
  'node'
];
  
const databases = [
  'access',
  'mongodb',
  'mysql',
  'sql_server'
]; 
  
const projects = [
  'algorithm-vis',
  'alina',
  'asp.net-controls',
  'avocado',
  'blog-crawler',
  'ca-programs',
  'codegenerator',
  'csm',
  'fellowship',
  'fortepan-ia',
  'ir-asu',
  'ir-uni',
  'ir-uni-medline',
  'jobcenter',
  'kronofoto',
  'phd',
  'playerc',
  'prssa-cms',
  'static-websites',
  'this',
  'twentiment',
  'uni-accounts',
  'uni-alumniassoc',
  'uni-chfatech',
  'uni-foundation',
  'uni-printservices',
  'uni-sergey',
  'vim-journal',
  'vim-timestamp',
  'vim-write',
  'websites-cms',
  'wikipedia-knn',
  'witness-id'
];

module.exports = {languages, frameworks, databases, projects};
