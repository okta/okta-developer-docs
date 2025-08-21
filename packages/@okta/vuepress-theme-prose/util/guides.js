import { createContentInfo } from './contentBuilder';

const fragment = '/docs/guides/';
const type = 'guide';

const makeGuidePath = ({ guideName, framework, sectionName }) => {
  return `${fragment}${guideName}/${framework ? framework + '/' : ''}${sectionName || ''}/`;
};

const { getInfo: getGuidesInfo, fromPath: guideFromPath } = createContentInfo({
  type,
  fragment,
  getOrderKey: page => page.frontmatter.guides,
  makePath: makeGuidePath,
});

export { getGuidesInfo, guideFromPath };
