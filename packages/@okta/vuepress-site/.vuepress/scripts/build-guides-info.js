const fs = require('fs');
const yaml = require('js-yaml');

// generate info that will provide both the list of additional Pages & any necessary extendPageData
// Convert util/guides to pull from that extended PageData as much as possible (reduce client-side load)
// Add to dev process (when will this require a restart?)
// Note: Perhaps remove the guides-list.json in favor of generating the data in config.js itself!
//
// Also blow up on sanity failures, so we can catch them at build time (even dev build)

const getFrontMatterFrom = text => text.replace(/.*^---\s/m, '').replace(/^---[\s\S]*/m, '');
const getMetaFor = path => yaml.safeLoad(getFrontMatterFrom( fs.readFileSync(`${path}/index.md`, { encoding: 'utf8'} ))); // TODO: Path sep?

const getFrameworksFor = path => {
  const entries = fs.readdirSync(path);
  return entries.filter( name => !name.includes('.')).sort(); // assume: no ext = dir, for more simple code
};

const guideInfo = {};

const allGuidesMeta = getMetaFor('guides');
allGuidesMeta.guides.forEach( guide => {
  const guideMeta = getMetaFor(`guides/${guide}`);
  guideInfo[`/guides/${guide}/`] = {...guideMeta};

  guideMeta.sections.forEach( section => {
    // TODO: Informatively blow up if no such section
    const sectionMeta = getMetaFor(`guides/${guide}/${section}`);
    const frameworks = getFrameworksFor(`guides/${guide}/${section}`);
    if(!guideMeta.frameworks && frameworks.length) {
      // set default if none
      guideMeta.frameworks = frameworks;
      guideMeta.mainFramework = guideMeta.mainFramework || frameworks[0];
    } else if (guideMeta.frameworks && frameworks.length) {
      // TODO: blow up (helpfully) if this doesn't match expected
    } 
  });
  // If a guide had no frameworks in any section
  guideMeta.frameworks = guideMeta.frameworks || [];
  // repeat now that we have a list of frameworks
  guideMeta.sections.forEach( section => {
    const sectionMeta = getMetaFor(`guides/${guide}/${section}`);
    [...guideMeta.frameworks, '-'].forEach( framework => {
      guideInfo[`/guides/${guide}/${framework}/${section}/`] = {
        ...sectionMeta,
        sectionTitle: sectionMeta.title,
        guideTitle: guideMeta.title,
        title: `${sectionMeta.title} - ${guideMeta.title}`,
        toAdd: true, // used to flag additions compared to any existing page definitions
        mainFramework: guideMeta.mainFramework,
      };
    });
  });
});

const additionalPagesForGuides = () => {
  return Object.entries(guideInfo)
    .filter( ([, info]) => info.toAdd )
    .map( ([path, info]) => ({
      ...info,
      path,
      content: ' ',
    }))
    .sort( (a, b) => a.path > b.path ? 1 : a.path < b.path ? -1 : 0 );
};

module.exports = {
  guideInfo,
  additionalPagesForGuides,
};
