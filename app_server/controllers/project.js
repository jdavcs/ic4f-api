require('dotenv').config({path: '../.env'});
const request = require('request');


exports.viewProject = function viewProject(req, res, next) {
  const address = 'projects/' + req.params.projectId;

  getData(address, function (err, results) { 
    if (err) { 
      return next(err);
    }
    renderOneProject(req, res, results);
  });
}

function getData(address, callback) {
  const requestOptions = {
    url: process.env.API_BASEURL + address,
    json: {} //parses response body as json; sets content-type to app/json
  };
  request(
    requestOptions, 
    (err, response, body) => {
      if (err) {
        callback(err);
      } else {
        if (response.statusCode === 200) {
          callback(null, body);
        }
        else {
          const err = new Error('Project not found');
          err.message = 'The requested resource does not exist: ' + address;
          err.status = 404;
          callback(err, null)
        }
      } 
    }
  );
};

function renderOneProject(req, res, data) {
  res.render('projectView', { 
    title: data.name,
    ogImageUrl: getOGImageURL(data),
    project: data,
    projectYears: getProjectYears(data),
    projectTechnology: getProjectTech(data),
    projectCodeLink: getProjectCodeLink(data),
    projectHasCodeLink: hasCode(data),
    navClassBlog: '',
    navClassProject: 'active',
    navClassAbout: ''
  });
};

function getOGImageURL(project) {
  //TODO move OG filename to config
  const OG_IMAGE = 'ogimage.png';
  return `${process.env.WEB_BASEURL}static/projects/${project._id}/${OG_IMAGE}`;
}

function getProjectYears(project) {
  let yearMax = project.year_end;
  if (yearMax === 9999) {
    yearMax = new Date().getFullYear();
  }

  if (project.year_start === yearMax) {
    return project.year_start;
  }
  else {
    return `${project.year_start} - ${yearMax}`;
  }
}

function getProjectCodeLink(project) {
  if (project.github_repo !== '') {
    return `<a href="${process.env.GITHUB_BASEURL}/${project.github_repo}"><span class="github">GitHub</span> repo</a>`;
  }
  else if (project.github_oldcode !== '') {
    const url = `${process.env.GITHUB_BASEURL}/${process.env.GITHUB_OLDCODE_REPO_SUBDIR}/${project.github_oldcode}`;
    return `<a href="${url}"><span class="github">GitHub</span> old code repo</a>`;
  }
  return '';
}

function getProjectTech(p) {
  let tech = '';
  if (p.frameworks.length > 0) {
    tech = listFrameworks(p) + ' / ';
  }
  if (p.databases.length > 0) {
    tech += listDatabases(p) + ' / ';
  }
  return tech += listLanguages(p);
}

function listFrameworks(project) {
  return project.frameworks.map(item => item.name).join(', ');
}

function listDatabases(project) {
  return project.databases.map(item => item.name).join(', ');
}

function hasCode(project) {
  return project.github_repo !== '' || project.github_oldcode !== '';
}

function listLanguages(p) {
  const newList = [];
  let foundHtml = false;
  const langColors = getColors();

  for (let lang of p.languages) {
    /* combine HTML and CSS into HTML/CSS. Because why not! */
    let name = lang.name;
    if (lang._id === 'html') {
      foundHtml = true;
      name = 'HTML/CSS';
    }
    else if (foundHtml && lang._id === 'css') {
      name = '';
    }

    if (name != '') { /* this ignores 'CSS' set to empty */
      name = `<span class="${langColors.get(lang._id)}">${name}</span>`;
      newList.push(name);
    }
  }
  return newList.join(', ');
}

function getColors() {
  const langColors = new Map();
  langColors.set('bash', 'lang-bash'); 
  langColors.set('c', 'lang-c');
  langColors.set('c_sharp', 'lang-cs');
  langColors.set('html', 'lang-htmlcss');
  langColors.set('css', 'lang-htmlcss');
  langColors.set('java', 'lang-java');
  langColors.set('javascript', 'lang-javascript');
  langColors.set('mumps', 'lang-mumps');
  langColors.set('php', 'lang-php');
  langColors.set('python', 'lang-python');
  langColors.set('ruby', 'lang-ruby');
  langColors.set('sql', 'lang-sql');
  langColors.set('sass', 'lang-sass');
  langColors.set('typescript', 'lang-typescript');
  langColors.set('vbnet', 'lang-vbnet');
  langColors.set('vbscript', 'lang-vbscript');
  langColors.set('vimscript', 'lang-vimscript');
  langColors.set('yaml', 'lang-yaml');
  return langColors;
}
