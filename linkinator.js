import { LinkChecker } from 'linkinator';

const EXTERNAL_LINKS = 'packages/**/*.md';
const LINK_EXTERNAL_REGEXP = /^(https?|http):\/\/[^\s$.?#].[^\s]*$/gm;

const checker = new LinkChecker();

checker.on('link', (link) => {
  if (link.status !== 200) {
    if (link.url.match(LINK_EXTERNAL_REGEXP)) {
      console.log(link);
    }
  }
});

await checker.check({
  path: EXTERNAL_LINKS,
  recurse: true,
});
