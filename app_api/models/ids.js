/*****************************************************************************
 * Define allowed IDs for languages, frameworks, databases, and projects.
 * Before adding a new document to any of these collections, first add
 * its new ID to one of these lists.
 *
 * This is not quite DRY: the same IDs are present in the json data files that
 * are used to populate the collections. However, this helps manage the data
 * set and ensure its relational integrity.
 ****************************************************************************/

const languages = [
  "bash",
  "c",
  "c_sharp",
  "sass",
  "css",
  "html",
  "java",
  "javascript",
  "mumps",
  "php",
  "python",
  "ruby",
  "sql",
  "typescript",
  "vbscript",
  "vimscript",
  "yaml"
];

const frameworks = [
  "angular",
  "asp",
  "bootstrap",
  "django",
  "dot_net",
  "express",
  "flask",
  "node"
];

const databases = [
  "access",
  "mongodb",
  "mysql",
  "sql_server"
];

const projects = [
  "avocado",
  "kronofoto",
  "icode4fun",
  "vim_journal",
  "vim_timestamp"
];

//module.exports = [languages, frameworks, databases, projects];
