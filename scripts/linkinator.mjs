import { LinkChecker } from 'linkinator';
import chalk from 'chalk';

const linkCheckMode = process.argv[2];
const linkExtRe = /https?:\/\//g;

let BASE_URL = null;
const linksInfo = {
  brokenLinks: [],
  linksCount: 0,
};
const path = 'packages/@okta/vuepress-site';
const localhost = 'http://localhost:8080';

switch (linkCheckMode) {
  case 'external':
    console.log('Running external link check...');
    BASE_URL = `${path}/**/*.md`;
  break;
}

const checker = new LinkChecker();

checker.on('link', (link) => {
  linksInfo.linksCount++;

  if (link.url.match(linkExtRe) && link.status === 404) {
    linksInfo.brokenLinks.push({
      url: link.url,
      status: link.status,
      parent: `${localhost}${link.parent.slice(path.length, link.parent.lastIndexOf('/'))}`,
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
