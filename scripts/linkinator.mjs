import { LinkChecker } from 'linkinator';
import chalk from 'chalk';
import handler from 'serve-handler';
import http from 'http';

const linkCheckMode = process.argv[2];
const linkExtRe = /https?:\/\//g;

let BASE_URL = null;
const linksInfo = {
  brokenLinks: [],
  linksCount: 0,
};
const path = 'packages/@okta/vuepress-site';
const localhost = 'http://localhost:8080';

const excludedKeywords = [
  '.xml',
  '.yml',
  '/img',
  '/assets',
  '/fonts',
  '/docs/api/postman',
  '/favicon',
  '/blog/',
  '/product/',
  'github.com/okta/okta-developer-docs/edit',
];

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: 'packages/@okta/vuepress-site/dist'
  });
});

switch (linkCheckMode) {
  case 'internal':
      console.log('Running internal link check...');
      BASE_URL = localhost;
  break;

  case 'external':
    console.log('Running external link check...');
    BASE_URL = `${path}/**/*.md`;
  break;
}

if (linkCheckMode === 'internal') {
  server.listen(8080, () => {
    console.log('Running at http://localhost:8080');
  });
}

const checker = new LinkChecker();

checker.on('link', (link) => {
  linksInfo.linksCount++;

  const internalLink = excludedKeywords.filter(
    keyword => link.url.match(keyword)
  );

  if (linkCheckMode === 'internal' && internalLink.length) {
    return;
  }

  if (linkCheckMode === 'internal' && !link.url.match(localhost)) {
    return;
  }

  if (link.url.match(linkExtRe) && link.status === 404) {
    linksInfo.brokenLinks.push({
      url: link.url,
      status: link.status,
      parent: linkCheckMode === 'internal' ? link.parent : `${localhost}${link.parent.slice(path.length, link.parent.lastIndexOf('/'))}`,
    });
  }
});

await checker.check({
  path: BASE_URL,
  recurse: true,
});

if (linksInfo.brokenLinks.length) {
  console.log(`Total links found: ${linksInfo.linksCount}`);
  console.log(`Broken links: ${chalk.bold.red(linksInfo.brokenLinks.length)}`);

  for (const brokenLink of linksInfo.brokenLinks) {
    console.log('');
    console.log(chalk.bold.red(`Link: ${brokenLink.url}`));
    console.log(chalk.cyan(`  Page: ${brokenLink.parent}`));
  }

  process.exit(1);
} else {
  console.log(`No links found`);

  process.exit(0);
}
