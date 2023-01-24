const BASE_PATH = '/docs/shared/';
const PATH_LIKE = '(?:([^\/]*)\/?)';
const FILE_LIKE = '(?:([^\.\/]*)\.?[^\.\/]*$)';

const recordMeta = ({ contentInfo, page }) => { 
  // This catalog will have only top level files. Can be extented to include sub folders as well
  const contentParts = new RegExp(`^${BASE_PATH}${FILE_LIKE}`);
  const [,contentName] = page.regularPath.match(contentParts);

  // data for this shared content
  contentInfo.byName[contentName] = contentInfo.byName[contentName] || {};
  const content = contentInfo.byName[contentName];
  content.name = contentName; 
  content.page = page;
  content.componentKey = page.key;
};


export const buildSharedContentInfo = ({ pages }) => { 
  const contentInfo = { byName: {} };
  const sharedContentRegex = new RegExp(`^${BASE_PATH}`);

  pages.filter( page => page.regularPath.match(sharedContentRegex) )
    .forEach( page => recordMeta({ page, contentInfo }));
  return contentInfo;
};


let sharedContentInfo;
export const getSharedContentInfo = ({pages}) => {
  return sharedContentInfo || (sharedContentInfo = buildSharedContentInfo({ pages }));
};