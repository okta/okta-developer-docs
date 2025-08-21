import { commonify, fancify, cssForIcon } from './frameworks';

const PATH_LIKE = '(?:([^\/]*)\/?)';
const FILE_LIKE = '(?:([^\.\/]*)\.?[^\.\/]*$)';

const alphaSort = (a, b) => a > b ? 1 : a < b ? -1 : 0;

const collectFrameworksFromSections = ({ sections }) => {
  const includedFrameworks = sections.reduce((all, section) => {
    Object.keys(section.frameworkByName).forEach(framework => all[framework] = true);
    return all;
  }, {});
  return Object.keys(includedFrameworks).sort(alphaSort);
};

/**
 * Creates content information object for guides or journeys
 * type - Type can be 'guide' or 'journey'
 * fragment - Fragment can be '/docs/guides/' or '/docs/journeys/'
 * getOrderKey - Function that can be fn: page => page.frontmatter.guides or fn: page => page.frontmatter.journeys
 */
function createContentInfo({
  type,
  fragment,
  getOrderKey,
  makePath
}) {
  const DEFAULT_FRAMEWORK = '-';
  const DEFAULT_SECTION = '';

  const fromPath = path => {
    let name, framework, sectionName;
    [, name, sectionName] = path.match(`${fragment}${PATH_LIKE}${PATH_LIKE}$`) || [];
    if (!sectionName) {
      [, name, framework, sectionName] = path.match(`${fragment}${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}`) || [];
    }
    framework = framework === DEFAULT_FRAMEWORK ? '' : framework;
    sectionName = sectionName || DEFAULT_SECTION;
    return { [`${type}Name`]: name, framework, sectionName };
  };

  const recordMeta = ({ info, page }) => {
    const pattern = new RegExp(`^${fragment}${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}${FILE_LIKE}`);
    const [ , name, sectionName, framework, snippet ] = page.regularPath.match(pattern) || [];

    if (!name) {
      info.order = getOrderKey(page) || [];
      info.featured = page.frontmatter.featured || [];
      return;
    }

    info.byName[name] = info.byName[name] || { sectionByName: {}, mainFramework: '' };
    const content = info.byName[name];

    if (!sectionName) {
      content.order = page.frontmatter.sections || [];
      content.makeLink = fw => makePath({ [`${type}Name`]: name, framework: fw, sectionName: content.order[0] });
      content.excerpt = page.frontmatter.excerpt || '';
      content.title = page.frontmatter.title || name;
      content.name = name;
      content.page = page;
      content.componentKey = page.key;
      return;
    }

    content.sectionByName[sectionName] = content.sectionByName[sectionName] || {};
    const section = content.sectionByName[sectionName];

    if (!framework) {
      section.name = sectionName;
      section.page = page;
      section.componentKey = page.key;
      section.title = page.frontmatter.title || sectionName;
      section.frameworkByName = section.frameworkByName || {};
      section.snippetByName = section.snippetByName || {};
      section.makeLink = fw => makePath({ [`${type}Name`]: name, framework: fw, sectionName });
      return;
    }

    const nameShort = commonify(framework);
    const title = fancify(nameShort);
    section.frameworkByName = section.frameworkByName || {};
    section.frameworkByName[framework] = section.frameworkByName[framework] || {};
    section.frameworkByName[framework][snippet] = {
      framework,
      snippet,
      name: nameShort,
      title,
      label: title,
      css: cssForIcon(nameShort),
      link: makePath({ [`${type}Name`]: name, framework, sectionName }),
      page,
      componentKey: page.key,
    };
    section.snippetByName = section.snippetByName || {};
    section.snippetByName[snippet] = section.snippetByName[snippet] || {};
  };

  const updateDerivedMeta = ({ info }) => {
    const listKey = `${type}s`;
    info[listKey] = info.order.map(name => info.byName[name]);

    info[listKey].forEach(content => {
      content.sections = content.order.map(sectionName => content.sectionByName[sectionName]);
    });

    info[listKey].forEach(content => {
      content.sections.forEach(section => {
        section.frameworks = Object.keys(section.frameworkByName).sort(alphaSort);
        section.mainFramework = section.frameworks.length && section.frameworks.reduce((min, next) => min < next ? min : next);

        Object.entries(section.snippetByName).forEach(([snippetName, snippet]) => {
          snippet.frameworks = section.frameworks.map(framework => {
            if (!section.frameworkByName[framework][snippetName]) {
              throw new Error(`${type}: ${content.name}  Snippet: /${framework}/${snippetName}.htm is missing`);
            }
            return section.frameworkByName[framework][snippetName];
          });
        });
        content.mainFramework = content.mainFramework || section.mainFramework;
        content.frameworks = collectFrameworksFromSections({ sections: content.sections });
      });
    });
  };

  const buildInfo = ({ pages }) => {
    const info = { byName: {} };
    const withinType = new RegExp(`^${fragment}`);

    pages.filter(page => page.regularPath.match(withinType))
         .forEach(page => recordMeta({ page, info }));

    updateDerivedMeta({ info });
    return info;
  };

  let cachedInfo;
  const getInfo = ({ pages }) => cachedInfo || (cachedInfo = buildInfo({ pages }));

  return { getInfo, fromPath };
}

export { createContentInfo };
