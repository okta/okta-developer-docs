import { commonify, fancify, iconify, cssForIcon } from './frameworks';

const PATH_LIKE = '(?:([^\/]*)\/?)';
const FILE_LIKE = '(?:([^\.\/]*)\.?[^\.\/]*$)';
const FRAGMENTS = '/docs/guides/';
const DEFAULT_FRAMEWORK = '-'; 
const DEFAULT_SECTION = '';

export const guideFromPath = path => {
  let guideName;
  let framework;
  let sectionName;
  [, guideName, sectionName ] = path.match(`${FRAGMENTS}${PATH_LIKE}${PATH_LIKE}$`) || [];
  if( !sectionName ) { 
    [, guideName, framework, sectionName ] = path.match(`${FRAGMENTS}${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}`) || [];
  }
  framework = framework === DEFAULT_FRAMEWORK ? '' : framework; // Drop useless default
  sectionName = sectionName || DEFAULT_SECTION; // default is useable here
  return { guideName, framework, sectionName };
};

export const makeGuidePath = ({ guideName, framework, sectionName }) => {
  const useGuide = `${FRAGMENTS}${guideName}/`;
  const useFramework = framework ? `${framework}/` : '';
  const useSection = `${sectionName || DEFAULT_SECTION}/`;
  return `${useGuide}${useFramework}${useSection}`;
};

export const alphaSort = (a,b) => a > b ? 1 : a < b ? -1 : 0;

const recordGuidesMeta = ({ guidesInfo, page }) => { 
  guidesInfo.order = page.frontmatter.guides || [];
  guidesInfo.featured = page.frontmatter.featured || [];
};

const recordGuideMeta = ({ guide, page, guideName, framework }) => { 
  guide.order = page.frontmatter.sections || [];
  guide.makeLink =  framework => makeGuidePath({ guideName, framework, sectionName: guide.order[0] });
  guide.excerpt = page.frontmatter.excerpt || '';
  guide.title = page.frontmatter.title || guideName;
  guide.name = guideName; 
  guide.page = page;
  guide.componentKey = page.key;
};

const recordSectionMeta = ({ section, page, guideName, sectionName }) => { 
  section.name = sectionName;
  section.page = page;
  section.componentKey = page.key;
  section.title = page.frontmatter.title || sectionName;
  section.frameworkByName = section.frameworkByName || {};
  section.snippetByName = section.snippetByName || {};
  section.makeLink = framework => makeGuidePath({ guideName, framework, sectionName });
};

const recordSnippetMeta = ({ section, page, framework, guideName, sectionName, snippet }) => { 
  const name = commonify(framework);
  const title = fancify(name);
  section.frameworkByName = section.frameworkByName || {};
  section.frameworkByName[framework] = section.frameworkByName[framework] || {};
  section.frameworkByName[framework][snippet] = { 
    framework,
    snippet,
    name, 
    title,
    label: title,
    css: cssForIcon(name),
    link: makeGuidePath({ guideName, framework, sectionName }),
    page, 
    componentKey: page.key,
  };
  section.snippetByName = section.snippetByName || {};
  section.snippetByName[snippet] = section.snippetByName[snippet] || {};
};

const recordMeta = ({ guidesInfo, page }) => { 
  const guideParts = new RegExp(`^${FRAGMENTS}${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}${FILE_LIKE}`);
  const [,guideName, sectionName, framework, snippet] = page.regularPath.match(guideParts);
  const isGuidesMeta = !guideName;
  const isGuideMeta = guideName && !sectionName;
  const isSectionMeta = sectionName && !framework;

  // data for all guides
  if(isGuidesMeta) { return recordGuidesMeta({ guidesInfo, page }); }

  // data for this guide
  guidesInfo.byName[guideName] = guidesInfo.byName[guideName] || { sectionByName: {}, mainFramework: '' };
  const guide = guidesInfo.byName[guideName];

  if(isGuideMeta) { return recordGuideMeta({ guide, page, guideName, framework }); }

  // data for this section

  guide.sectionByName[sectionName] = guide.sectionByName[sectionName] || {};
  const section = guide.sectionByName[sectionName];
  if(isSectionMeta) { return recordSectionMeta({ section, page, guideName, sectionName }); }

  // data about the frameworks in this section
  return recordSnippetMeta({ section, page, framework, guideName, sectionName, snippet });
};

const collectFrameworksFromSections = ({ sections }) => { 
  const includedFrameworks = sections.reduce( (all, section) => { 
    Object.keys(section.frameworkByName).forEach( framework => all[framework] = true );
    return all;
  }, {});
  return Object.keys(includedFrameworks).sort(alphaSort);
};

const updateDerivedMeta = ({ guidesInfo }) => { 
  // List of guides in order
  guidesInfo.guides = guidesInfo.order.map( guideName => guidesInfo.byName[guideName] );

  // Each guide gets a list of sections in order
  guidesInfo.guides.forEach( guide => { 
    guide.sections = guide.order.map( sectionName => guide.sectionByName[sectionName]);
  });
  // Each guide assigns:
  guidesInfo.guides.forEach( guide => { 
    guide.sections.forEach( section => { 
      // ...each section a list of frameworks in order
      section.frameworks = Object.keys(section.frameworkByName).sort(alphaSort);
      // ...each section a mainFramework
      section.mainFramework = section.frameworks.length && section.frameworks.reduce(
        (min, next) => min < next ? min : next
      );
      // ...each snippet within each section a list of frameworks in order
      Object.entries(section.snippetByName).forEach( ([snippetName, snippet]) => {
        snippet.frameworks = section.frameworks.map( framework => section.frameworkByName[framework][snippetName] );
      });
      // ...each guide a mainFramework from the sections
      guide.mainFramework = guide.mainFramework || section.mainFramework;
      // ...each guide a collected list of frameworks from the sections
      guide.frameworks = collectFrameworksFromSections({ sections: guide.sections });
    });
  });
};

export const buildGuidesInfo = ({ pages }) => { 
  const guidesInfo = { byName: {} };
  const withinGuides = new RegExp(`^${FRAGMENTS}`);

  const filtered = pages.filter( page => page.regularPath.match(withinGuides) );
  filtered
    .forEach( page => recordMeta({ page, guidesInfo }) );

  updateDerivedMeta({ guidesInfo });
  return guidesInfo;
};

let guidesInfo; // singleton for getGuideInfo()
export const getGuidesInfo = ({ pages }) => { 
  if (!guidesInfo) {
    guidesInfo = buildGuidesInfo({pages});
    console.warn('GUIDES INFO');
    console.log(guidesInfo);
  }
  return guidesInfo;
  //return guidesInfo || (guidesInfo = buildGuidesInfo({ pages }));
}
