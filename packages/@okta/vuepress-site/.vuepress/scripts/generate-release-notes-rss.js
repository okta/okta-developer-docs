const fs = require('fs');
const path = require('path');

// Paths
const mdPath = path.join(__dirname, '../../docs/release-notes/2025/index.md');
const rssPath = path.join(__dirname, '../public/rss.xml');
const siteUrl = 'https://developer.okta.com/docs/release-notes/2025/';

// Read Markdown
const md = fs.readFileSync(mdPath, 'utf8');

// Parse releases (simple: split by '## ' heading)
const releases = md.split('\n## ').slice(1).map(section => {
  const [titleLine, ...bodyLines] = section.split('\n');
  const date = titleLine.trim();
  const description = bodyLines.join('\n').trim();
  return { date, description };
});

// Build RSS XML
const rssItems = releases.map(rel => `
  <item>
    <title>${rel.date}</title>
    <link>${siteUrl}#${rel.date.replace(/[^a-zA-Z0-9]/g, '')}</link>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <description><![CDATA[${rel.description}]]></description>
  </item>
`).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Okta Developer Docs Release Notes</title>
  <link>${siteUrl}</link>
  <description>Recent release notes for Okta Classic Engine API release notes</description>
  ${rssItems}
</channel>
</rss>
`;

// Write RSS file
fs.writeFileSync(rssPath, rss, 'utf8');
console.log('RSS feed generated at', rssPath);