/* To fix: https://oktainc.atlassian.net/browse/OKTA-1071410 */
const fs = require("fs");
const path = require('path');
const robotsPath = path.resolve(__dirname, '../../dist/robots.txt');

if (!fs.existsSync(robotsPath)) {
  console.warn(`robots.txt not found at: ${robotsPath}`);
  return;
}

const content = fs.readFileSync(robotsPath, "utf8");

const fixedContent = content.replace(
  /Sitemap:\s*https:\/developer\.okta\.com\/sitemap_index\.xml/g,
  "Sitemap: https://developer.okta.com/sitemap_index.xml"
);

fs.writeFileSync(robotsPath, fixedContent, "utf8");

console.log("robots.txt sitemap URL fixed successfully");

