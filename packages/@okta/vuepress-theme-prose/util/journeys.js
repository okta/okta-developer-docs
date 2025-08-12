import { commonify, fancify, cssForIcon } from './frameworks';

const PATH_LIKE = '(?:([^\/]*)\/?)';
const FILE_LIKE = '(?:([^\.\/]*)\.?[^\.\/]*$)';
const JOURNEY_FRAGMENTS = '/docs/journeys/';
const DEFAULT_FRAMEWORK = '-';
const DEFAULT_SECTION = '';

export const journeyFromPath = path => {
  let journeyName;
  let framework;
  let sectionName;
  [, journeyName, sectionName ] = path.match(`${JOURNEY_FRAGMENTS}${PATH_LIKE}${PATH_LIKE}$`) || [];
  if( !sectionName ) {
    [, journeyName, framework, sectionName ] = path.match(`${JOURNEY_FRAGMENTS}${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}`) || [];
  }
  framework = framework === DEFAULT_FRAMEWORK ? '' : framework; // Drop useless default
  sectionName = sectionName || DEFAULT_SECTION; // default is useable here
  return { journeyName, framework, sectionName };
};

export const makeJourneyPath = ({ journeyName, framework, sectionName }) => {
  const useJourney = `${JOURNEY_FRAGMENTS}${journeyName}/`;
  const useFramework = framework ? `${framework}/` : '';
  const useSection = `${sectionName || DEFAULT_SECTION}/`;
  return `${useJourney}${useFramework}${useSection}`;
};

export const alphaSort = (a,b) => a > b ? 1 : a < b ? -1 : 0;

const recordJourneysMeta = ({ journeyInfo, page }) => {
  journeyInfo.order = page.frontmatter.journeys || [];
  journeyInfo.featured = page.frontmatter.featured || [];
};

const recordIndividualJourneyMeta = ({ journey, page, journeyName, framework }) => {
  journey.order = page.frontmatter.sections || [];
  journey.makeLink =  framework => makeJourneyPath({ journeyName, framework, sectionName: journey.order[0] });
  journey.excerpt = page.frontmatter.excerpt || '';
  journey.title = page.frontmatter.title || journeyName;
  journey.name = journeyName;
  journey.page = page;
  journey.componentKey = page.key;
};

const recordJourneySectionMeta = ({ section, page, journeyName, sectionName }) => {
  section.name = sectionName;
  section.page = page;
  section.componentKey = page.key;
  section.title = page.frontmatter.title || sectionName;
  section.frameworkByName = section.frameworkByName || {};
  section.snippetByName = section.snippetByName || {};
  section.makeLink = framework => makeJourneyPath({ journeyName, framework, sectionName });
};

const recordJourneySnippetMeta = ({ section, page, framework, journeyName, sectionName, snippet }) => {
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
    link: makeJourneyPath({ journeyName, framework, sectionName }),
    page,
    componentKey: page.key,
  };
  section.snippetByName = section.snippetByName || {};
  section.snippetByName[snippet] = section.snippetByName[snippet] || {};
};

const recordJourneyMeta = ({ journeyInfo, page }) => {
  const journeyParts = new RegExp(`^${JOURNEY_FRAGMENTS}${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}${FILE_LIKE}`);
  const [,journeyName, sectionName, framework, snippet] = page.regularPath.match(journeyParts);
  const isJourneysMeta = !journeyName;
  const isJourneyMeta = journeyName && !sectionName;
  const isSectionMeta = sectionName && !framework;

  if(isJourneysMeta) { return recordJourneysMeta({ journeyInfo, page }); }

  journeyInfo.byName[journeyName] = journeyInfo.byName[journeyName] || { sectionByName: {}, mainFramework: '' };
  const journey = journeyInfo.byName[journeyName];

  if(isJourneyMeta) { return recordIndividualJourneyMeta({ journey, page, journeyName, framework }); }

  // data for this section

  journey.sectionByName[sectionName] = journey.sectionByName[sectionName] || {};
  const section = journey.sectionByName[sectionName];
  if(isSectionMeta) { return recordJourneySectionMeta({ section, page, journeyName, sectionName }); }

  // data about the frameworks in this section
  return recordJourneySnippetMeta({ section, page, framework, journeyName, sectionName, snippet });
};

const collectFrameworksFromSections = ({ sections }) => {
  const includedFrameworks = sections.reduce( (all, section) => {
    Object.keys(section.frameworkByName).forEach( framework => all[framework] = true );
    return all;
  }, {});
  return Object.keys(includedFrameworks).sort(alphaSort);
};

const updateJourneyDerivedMeta = ({ journeyInfo }) => {
  journeyInfo.journeys = journeyInfo.order.map( journeyName => journeyInfo.byName[journeyName] );

  journeyInfo.journeys.forEach( journey => {
    journey.sections = journey.order.map( sectionName => journey.sectionByName[sectionName]);
  });
  journeyInfo.journeys.forEach( journey => {
    journey.sections.forEach( section => {
      // ...each section a list of frameworks in order
      section.frameworks = Object.keys(section.frameworkByName).sort(alphaSort);
      // ...each section a mainFramework
      section.mainFramework = section.frameworks.length && section.frameworks.reduce(
        (min, next) => min < next ? min : next
      );
      // ...each snippet within each section a list of frameworks in order
      Object.entries(section.snippetByName).forEach( ([snippetName, snippet]) => {
        snippet.frameworks = section.frameworks.map( framework => {
            if (!section.frameworkByName[framework][snippetName]) {
                throw new Error(`Journey: ${journey.name}  Snippet: /${framework}/${snippetName}.htm is missing`);
            }
            return section.frameworkByName[framework][snippetName];
        });
      });
      journey.mainFramework = journey.mainFramework || section.mainFramework;
      // ...each journey a collected list of frameworks from the sections
      journey.frameworks = collectFrameworksFromSections({ sections: journey.sections });
    });
  });
};

export const buildJourneyInfo = ({ pages }) => {
  const journeyInfo = { byName: {} };
  const withinJourneys = new RegExp(`^${JOURNEY_FRAGMENTS}`);

  let pa = pages.filter( page => page.regularPath.match(withinJourneys) );

  pages.filter( page => page.regularPath.match(withinJourneys) )
    .forEach( page => recordJourneyMeta({ page, journeyInfo }) );

  updateJourneyDerivedMeta({ journeyInfo });
  return journeyInfo;
};

let journeyInfo;
export const getJourneyInfo = ({ pages }) => {
  return journeyInfo || (journeyInfo = buildJourneyInfo({ pages }));
}
