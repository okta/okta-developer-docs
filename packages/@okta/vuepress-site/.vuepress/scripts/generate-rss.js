const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
// Enable HTML in markdown-it so <a> tags are not escaped
const mdParser = new MarkdownIt({ html: true });

// Helper to remove markdown comments <!-- ... -->
function stripMarkdownComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

// Helper to convert markdown links to headings into proper HTML links with absolute URLs
function convertSubheadingLinksToHtml(text, siteUrl) {
  // Replace [text](#subheading) with <a href="siteUrl#subheading">text</a>
  return text.replace(/\[([^\]]+)\]\(#([^)]+)\)/g, (match, linkText, anchor) => {
    const htmlAnchor = anchor
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove non-word, non-space, non-dash
      .replace(/\s+/g, '-');    // spaces to dashes
    return `<a href="${siteUrl}#${htmlAnchor}">${linkText}</a>`;
  });
}

// Helper to extract only markdown tables from content
function extractTables(markdown) {
  // Match all markdown tables (lines starting and ending with |, including header and rows)
  const tableRegex = /((?:\|.*\n)+)/g;
  const tables = [];
  let match;
  while ((match = tableRegex.exec(markdown)) !== null) {
    tables.push(match[1]);
  }
  return tables.join('\n');
}

// Helper to generate RSS XML from markdown
function generateRssFromMarkdown(mdPath, feedTitle, feedDesc, siteUrl, rssOutputPath) {
  if (!fs.existsSync(mdPath)) {
    console.error(`Markdown file not found: ${mdPath}`);
    return;
  }
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  // Split by '### ' for weekly/monthly releases, fallback to '## ' if not found
  const sections = mdContent.includes('### ') ? mdContent.split('\n### ') : mdContent.split('\n## ');
  const now = new Date();
  const releases = sections.slice(1).map((section, idx) => {
    const [titleLine, ...bodyLines] = section.split('\n');
    const title = titleLine.trim();
    // Subtract idx days from now for each item
    const pubDate = new Date(now.getTime() - idx * 24 * 60 * 60 * 1000);
    // Only process table content
    let cleanedBody = stripMarkdownComments(bodyLines.join('\n').trim());
    let tablesOnly = extractTables(cleanedBody);
    tablesOnly = convertSubheadingLinksToHtml(tablesOnly, siteUrl);
    const description = mdParser.render(tablesOnly);
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
  <pubDate>${now.toUTCString()}</pubDate>
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
  'Okta Classic Engine API release notes',
  'Recent release notes for Okta Classic Engine API',
  'https://developer.okta.com/docs/release-notes/2025/',
  path.join(__dirname, '../public/rss/classic.xml')
);

// Identity Engine Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025-okta-identity-engine/index.md'),
  'Okta Identity Engine API release notes',
  'Recent release notes for Okta Identity Engine API',
  'https://developer.okta.com/docs/release-notes/2025-okta-identity-engine/',
  path.join(__dirname, '../public/rss/identity-engine.xml')
);

// Identity Governance Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025-okta-identity-governance/index.md'),
  'Okta Identity Governance API release notes',
  'Recent release notes for Okta Identity Governance API',
  'https://developer.okta.com/docs/release-notes/2025-okta-identity-governance/',
  path.join(__dirname, '../public/rss/identity-governance.xml')
);

// Privileged Access Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025-okta-privileged-access/index.md'),
  'Okta Privileged Access API Release Notes',
  'Recent release notes for Okta Privileged Access API',
  'https://developer.okta.com/docs/release-notes/2025-okta-privileged-access/',
  path.join(__dirname, '../public/rss/privileged-access.xml')
);