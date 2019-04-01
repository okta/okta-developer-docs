import { commonify, fancify, iconify, cssForIcon } from './frameworks';

const PATH_LIKE = '(?:([^\/]*)\/?)';
const FRAGMENTS = '/guides/';
const DEFAULT_FRAMEWORK = '-'; 
const DEFAULT_SECTION = 1;

export const guideFromPath = path => {
  const parts = {};

  [, parts.guide, parts.framework, parts.sectionNum] = path.match(`${FRAGMENTS}${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}`) || [];
  parts.framework = parts.framework === DEFAULT_FRAMEWORK ? '' : parts.framework; // Drop useless default
  parts.sectionNum = parts.sectionNum || DEFAULT_SECTION; // default is useable here
  return parts;
};

export const makeGuidePath = ({ guide, framework, sectionNum }) => {
  return `${FRAGMENTS}${guide}/${framework || DEFAULT_FRAMEWORK}/${sectionNum || DEFAULT_SECTION}`;
};

export const alphaSortBy = prop => (a,b) => a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;

export const findOnAncestor = ({ find, node }) => { 
  // Abusing Vue in order to keep life simple for authors
  // pulls values from ancestors so we don't have to pass them down
  node = node.$parent;
  while(node) { 
    if(node[find]) { 
      return node[find];
    }
    node = node.$parent;
  }
};

export const findGuides = ({ pages }) => { 
  // Snag guides directories from filesystem
  const section = new RegExp(`${FRAGMENTS}([^\/]*)/$`);
  return pages.filter( page => page.regularPath.match(section) )
    .map( page => { 
      const name = page.regularPath.match(section)[1];
      const framework = findMainFrameworksOfGuide({ guide: name, pages })[0];
      return { 
        name,
        title: page.frontmatter.title || name,
        excerpt: page.frontmatter.excerpt || '',
        link: makeGuidePath({ guide: name, framework }),
        key: page.key,
        page
      };
    });
}; 

export const findStackSnippets = ({ section, snippet, pages }) => {   
  if( !section ) { 
    return [];
  }
  const prefix = new RegExp(`${section.snippetBase}([^/]*)/${snippet}.html`);
  return [ ...pages        
    .filter( page => page.regularPath.match(prefix) )
    .map( page => {
      const framework = page.regularPath.match(prefix)[1];
      const name = commonify(framework);
      const title = fancify(name);
      return { 
        framework,
        name, 
        title,
        css: cssForIcon(name),
        link: makeGuidePath({ guide: section.guide, framework, sectionNum: section.sectionNum }),
        key: page.key,
        page
      };
    })].sort( alphaSortBy('framework') );
};

export const findGuideSections = ({ guide, pages }) => { 
  // Note: assumes sections are all directories named `sectionNN`
  const section = new RegExp(`${FRAGMENTS}${guide}/([^/]*)/$`);
  return [...pages.filter( page => page.regularPath.match(section) )]
    .sort( alphaSortBy('regularPath') )
    .map( (page, index) => { 
      const name = page.regularPath.match(section)[1];
      const sectionNum = index+1;
      const sectionDir = `${sectionNum}`.padStart(2, '0');
      return { 
        name,
        title: page.frontmatter.title || name,
        makeLink: framework => makeGuidePath({ guide, framework, sectionNum }),
        index, 
        guide,
        sectionNum,
        key: page.key,
        snippetBase: `${FRAGMENTS}${guide}/section${sectionDir}/`,
        page
      };
  });
}; 

export const findMainFrameworksOfGuide = ({ guide, pages }) => {
  // Note: assumes sections are all directories named `sectionNN`
  const prefix = new RegExp(`${FRAGMENTS}${guide}/${PATH_LIKE}${PATH_LIKE}.*?.html$`);
  return Object.keys( 
    // Pull all known frameworks for the given guide, reduce to unique list
    pages.filter( page => page.regularPath.match(prefix) )
      .map( page => page.regularPath.match(prefix)[2] )
      .reduce( (all, framework) => ({ ...all, [framework]: true }), {} )
  ).sort();
};
