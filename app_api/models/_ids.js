/*****************************************************************************
 * Define allowed IDs for project groups, languages, frameworks, databases, and
 * projects.  Before adding a new document to any of these collections, first
 * add its new ID to one of these lists.
 *
 * (DRY) Even though the same IDs are present in the csv/json data files that
 * are used to populate the collections, this file is the definitive source of
 * knowledge about document IDs.
 ****************************************************************************/

const groups = [
 'algvis',
 'compiler',
 'cms',   
 'dpa',   
 'edisco',
 'play',  
 'vim',   
 'static',
 'ir'    
];

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
  'slim'
];
  
const databases = [
  'access',
  'mongodb',
  'mysql',
  'sql_server'
]; 
  
const projects = [
  'algorithm_vis',
  'alina_www',
  'aspnet_controls',
  'blog_crawler',
  'camp_adventure_2004',
  'camp_adventure_iyc',
  'codegenerator',
  'cso',
  'datamining_asu',
  'ediscovery',
  'fellowship_code',
  'fortepan_ia',
  'ic4f_api',
  'ic4f_ng',
  'ir_asu',
  'ir_uni',
  'ir_uni_medline',
  'kronofoto_admin',
  'kronofoto_api',
  'kronofoto_ng',
  'lordofthewebs',
  'phd_code',
  'playerc',
  'prssa_cms',
  'prssa_websites',
  'sergey_www_edu',
  'static_websites',
  'symmetryshowroom',
  'twentiment',
  'uni_accounts',
  'uni_alumniassoc',
  'uni_ask',
  'uni_chfatech',
  'uni_comstudy',
  'uni_foundation_cms',
  'uni_gradcollege',
  'uni_printservices',
  'vim_journal',
  'vim_timestamp',
  'vim_write',
  'websites_cms',
  'witness_id'
];

module.exports = {groups, languages, frameworks, databases, projects};
