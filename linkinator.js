import { LinkChecker } from 'linkinator';

const EXTERNAL_LINKS = 'packages/**/*.md';
const LINK_EXTERNAL_REGEXP = /^(https?|http):\/\/[^\s$.?#].[^\s]*$/gm;

const checker = new LinkChecker();
const brokenLinks = [];

checker.on('link', (link) => {
  if (link.url.match(LINK_EXTERNAL_REGEXP)) {
    if (link.state === 'BROKEN') {
      brokenLinks.push({
        url: link.url,
        status: link.status,
      })
    }
  }
});

await checker.check({
  path: EXTERNAL_LINKS,
  recurse: true,
});

if (brokenLinks.length) {
  for (const brokenLink of brokenLinks) {
    console.log(`Source: ${brokenLink.url}`);
    console.log(`Status: ${brokenLink.status}`);
    console.log('');
  }
}
