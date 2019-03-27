const PATH_LIKE = '(?:([^\/]*)\/?)';
const FRAGMENTS = '/guides/';
const DEFAULT_LANG = '-';
const DEFAULT_SECTION = 1;

export const guideFromHash = hash => {
  const parts = {};

  [, parts.guide, parts.lang, parts.sectionNum] = hash.match(`#${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}`) || [];
  parts.lang = parts.lang === DEFAULT_LANG ? '' : parts.lang; // Drop useless default
  parts.sectionNum = parts.sectionNum || DEFAULT_SECTION; // default is useable here
  return parts;
};

export const makeGuideHash = ({ guide, lang, sectionNum }) => {
  return `#${guide}/${lang || DEFAULT_LANG}/${sectionNum || DEFAULT_SECTION}`;
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
      return { 
        name,
        title: page.frontmatter.title || name,
        blurb: page.frontmatter.blurb || '',
        link: makeGuideHash({ guide: name }),
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
      const lang = page.regularPath.match(prefix)[1];
      return { 
        lang,
        name: lang,
        link: makeGuideHash({ guide: section.guide, lang, sectionNum: section.sectionNum }),
        key: page.key,
        page
      };
    })].sort( alphaSortBy('lang') );
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
        makeLink: lang => makeGuideHash({ guide, lang, sectionNum }),
        index, 
        guide,
        sectionNum,
        key: page.key,
        snippetBase: `${FRAGMENTS}${guide}/section${sectionDir}/`,
        page
      };
  });
}; 

export const findMainLanguagesOfGuide = ({ guide, pages }) => {
  // Note: assumes sections are all directories named `sectionNN`
  const prefix = new RegExp(`${FRAGMENTS}${guide}/${PATH_LIKE}${PATH_LIKE}.*?.html$`);
  return Object.keys( 
    // Pull all known langages for the given guide, reduce to unique list
    pages.filter( page => page.regularPath.match(prefix) )
      .map( page => page.regularPath.match(prefix)[2] )
      .reduce( (all, lang) => ({ ...all, [lang]: true }), {} )
  ).sort();
};
