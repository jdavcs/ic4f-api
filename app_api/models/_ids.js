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
  'cms',   
  'community',
  'compiler',
  'dpa',   
  'edisco',
  'ir',    
  'play',  
  'shopping',
  'static',
  'vim',
  'web_misc'
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
  'vbnet',
  'vbscript',
  'vimscript',
  'yaml'
];

const frameworks = [
  'angular',
  'asp',
  'aspnet',
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
  'alinaavanesyan',
  'aspnet_controls',
  'blog_crawler',
  'codegenerator',
  'cso',
  'datamining_asu',
  'ediscovery',
  'fellowship',
  'fortepan_iowa',
  'ic4f_api',
  'ic4f_ng',
  'ir_asu',
  'ir_uni',
  'ir_uni_medline',
  'kronofoto_admin',
  'kronofoto_api',
  'kronofoto_ng',
  'lordofthewebs',
  'phd',
  'playerc',
  'prsa',
  'sergeycsuniedu',
  'static_websites',
  'symmetryshowroom',
  'twentiment',
  'uni_accounts',
  'uni_alumniassoc',
  'uni_ask',
  'uni_ca_2003',
  'uni_ca_iyc',
  'uni_ca_mycaccess',
  'uni_chfatech',
  'uni_comstudy',
  'uni_csbs',
  'uni_foundation',
  'uni_gradcollege',
  'uni_iowaindtech',
  'uni_newsroom',
  'uni_printservices',
  'uni_rrttc',
  'vim_journal',
  'vim_timestamp',
  'vim_write',
  'visual_sort',
  'visual_tree',
  'witness_id'
];

module.exports = {groups, languages, frameworks, databases, projects};
