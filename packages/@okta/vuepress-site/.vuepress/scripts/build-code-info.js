const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const CODE_ROOT = 'code';

const getFrontMatterFrom = text => text.replace(/.*^---\s/m, '').replace(/^---[\s\S]*/m, '');
const getMetaFor = filePath => yaml.safeLoad(getFrontMatterFrom(fs.readFileSync(`${filePath}/index.md`, { encoding: 'utf8' })));

const getFrameworksFor = dirPath => {
  const entries = fs.readdirSync(dirPath);
  return entries
    .filter(name => !name.includes('.')) // assume: no ext = dir, for more simple code
    .sort((a, b) => a.localeCompare(b, 'en', { 'sensitivity': 'base' }));
};

const codeInfo = {};

// Load frontmatter yaml to JS from root file index page
const allCodeMeta = getMetaFor(CODE_ROOT);
// Use stackSelectorPagesInCode instead of guides
const codePages = allCodeMeta.stackSelectorPagesInCode || [];
codePages.forEach(page => {
  // Load frontmatter yaml to JS from _those_ pages index pages
  const pageMeta = getMetaFor(`${CODE_ROOT}/${page}`);
  pageMeta.page = page;
  codeInfo[`/${CODE_ROOT}/${page}/`] = { ...pageMeta };

  if (pageMeta.sections) {
    pageMeta.sections.forEach(section => {
      // load frontmatter yaml to JS for the index page of the sections of this page
      const sectionMeta = getMetaFor(`${CODE_ROOT}/${page}/${section}`);
      // get all the directories under this section, count them each as a framework
      const frameworks = getFrameworksFor(`${CODE_ROOT}/${page}/${section}`);
      if (!pageMeta.frameworks && frameworks.length) {
        pageMeta.frameworks = frameworks;
        pageMeta.mainFramework = pageMeta.mainFramework || frameworks[0];
      } else if (pageMeta.frameworks && frameworks.length) {
        pageMeta.frameworks = Array.from(new Set([...pageMeta.frameworks, ...frameworks]));
      }
    });
  }

  pageMeta.frameworks = pageMeta.frameworks || [];

  if (pageMeta.sections) {
    pageMeta.sections.forEach(section => {
      const sectionMeta = getMetaFor(`${CODE_ROOT}/${page}/${section}`);
      [...pageMeta.frameworks, '-'].forEach(framework => {
        codeInfo[`/${CODE_ROOT}/${page}/${framework}/${section}/`] = {
          ...sectionMeta,
          sectionTitle: sectionMeta.title,
          pageTitle: pageMeta.title,
          title: `${sectionMeta.title} - ${pageMeta.title}`,
          toAdd: true,
          mainFramework: pageMeta.mainFramework,
          filePath: path.resolve(__dirname, `../../${CODE_ROOT}/${page}/${section}/index.md`)
        };
      });
    });
  }

  codeInfo[`/${CODE_ROOT}/${page}/`] = { ...pageMeta };
});

const additionalPagesForCode = () => {
  const obj = Object.entries(codeInfo)
    .filter(([, info]) => info.toAdd)
    .map(([path, info]) => ({
      ...info,
      path,
      content: ' ',
    }))
    .sort((a, b) => a.path > b.path ? 1 : a.path < b.path ? -1 : 0);

  return obj;
};

module.exports = {
  codeInfo,
  additionalPagesForCode,
};
