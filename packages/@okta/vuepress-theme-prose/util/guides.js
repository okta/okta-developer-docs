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

const codeFragment = '/code/';
const codeType = 'code';

const makeCodePath = ({ codeName, framework, sectionName }) => {
  return `${codeFragment}${codeName}/${framework ? framework + '/' : ''}${sectionName || ''}/`;
};

const { getInfo: getCodeInfo, fromPath: codeFromPath } = createContentInfo({
  type: codeType,
  fragment: codeFragment,
  getOrderKey: page => page.frontmatter.stackSelectorPagesInCode,
  makePath: makeCodePath,
});

export { getGuidesInfo, guideFromPath, getCodeInfo, codeFromPath };
