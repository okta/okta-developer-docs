import { createContentInfo } from './contentBuilder';

const fragment = '/docs/journeys/';
const type = 'journey';

const makeJourneyPath = ({ journeyName, framework, sectionName }) => {
  return `${fragment}${journeyName}/${framework ? framework + '/' : ''}${sectionName || ''}/`;
};

const { getInfo: getJourneyInfo, fromPath: journeyFromPath } = createContentInfo({
  type,
  fragment,
  getOrderKey: page => page.frontmatter.journeys,
  makePath: makeJourneyPath,
});

export { getJourneyInfo, journeyFromPath };
