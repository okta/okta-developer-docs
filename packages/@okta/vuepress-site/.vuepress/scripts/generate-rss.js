const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt(); // Renamed to avoid conflict

// Helper to generate RSS XML from markdown
function generateRssFromMarkdown(mdPath, feedTitle, feedDesc, siteUrl, rssOutputPath) {
  if (!fs.existsSync(mdPath)) {
    console.error(`Markdown file not found: ${mdPath}`);
    return;
  }
  const mdContent = fs.readFileSync(mdPath, 'utf8'); // Renamed to avoid conflict
  // Split by '### ' for weekly/monthly releases, fallback to '## ' if not found
  const sections = mdContent.includes('### ') ? mdContent.split('\n### ') : mdContent.split('\n## ');
  const releases = sections.slice(1).map(section => {
    const [titleLine, ...bodyLines] = section.split('\n');
    const title = titleLine.trim();
    // Try to extract a date from the first table row if possible
    const dateMatch = bodyLines.join('\n').match(/\|\s*\[.*?\]\(.*?\)\s*\|\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})\s*\|/);
    const pubDate = dateMatch ? new Date(dateMatch[1]) : new Date();
    // Convert Markdown to HTML for the description
    const description = mdParser.render(bodyLines.join('\n').trim());
    const itemLink = `${siteUrl}#${title.replace(/[^a-zA-Z0-9]/g, '')}`;
    return { title, pubDate, description, itemLink };
  });

  const rssItems = releases.map(rel => `
    <item>
      <title>${rel.title}</title>
      <link>${rel.itemLink}</link>
      <guid>${rel.itemLink}</guid>
      <pubDate>${rel.pubDate.toUTCString()}</pubDate>
      <description><![CDATA[${rel.description}]]></description>
    </item>
  `).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${feedTitle}</title>
  <link>${siteUrl}</link>
  <description>${feedDesc}</description>
  <pubDate>${new Date().toUTCString()}</pubDate>
  ${rssItems}
</channel>
</rss>
`;

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(rssOutputPath), { recursive: true });
  fs.writeFileSync(rssOutputPath, rss, 'utf8');
  console.log('RSS feed generated at', rssOutputPath);
}

// Classic Engine Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025/index.md'),
  'Okta Developer Docs Release Notes (Classic Engine)',
  'Recent release notes for Okta Classic Engine API',
  'https://developer.okta.com/docs/release-notes/2025/',
  path.join(__dirname, '../public/rss/classic.xml')
);

// Identity Engine Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025-okta-identity-engine/index.md'),
  'Okta Developer Docs Release Notes (Identity Engine)',
  'Recent release notes for Okta Identity Engine API',
  'https://developer.okta.com/docs/release-notes/2025-okta-identity-engine/',
  path.join(__dirname, '../public/rss/identity-engine.xml')
);

// Identity Governance Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025-okta-identity-governance/index.md'),
  'Okta Developer Docs Release Notes (Identity Governance)',
  'Recent release notes for Okta Identity Governance API',
  'https://developer.okta.com/docs/release-notes/2025-okta-identity-governance/',
  path.join(__dirname, '../public/rss/identity-governance.xml')
);

// Privileged Access Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025-okta-privileged-access/index.md'),
  'Okta Developer Docs Release Notes (Privileged Access)',
  'Recent release notes for Okta Privileged Access API',
  'https://developer.okta.com/docs/release-notes/2025-okta-privileged-access/',
  path.join(__dirname, '../public/rss/privileged-access.xml')
);