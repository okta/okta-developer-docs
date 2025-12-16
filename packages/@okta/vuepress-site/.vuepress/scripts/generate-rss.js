const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt({ html: true });

function stripMarkdownComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function convertSubheadingLinksToHtml(text, siteUrl) {
  return text.replace(/\[([^\]]+)\]\(#([^)]+)\)/g, (match, linkText, anchor) => {
    const htmlAnchor = anchor
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return `<a href="${siteUrl}#${htmlAnchor}">${linkText}</a>`;
  });
}

function extractTables(markdown) {
  const lines = markdown.split('\n');
  const tables = [];
  let currentTable = [];
  for (let line of lines) {
    if (line.trim().startsWith('|')) {
      currentTable.push(line);
    } else {
      if (currentTable.length > 0) {
        tables.push(currentTable.join('\n'));
        currentTable = [];
      }
    }
  }
  if (currentTable.length > 0) {
    tables.push(currentTable.join('\n'));
  }
  return tables.join('\n\n');
}

function removeTableHeaders(tableMarkdown) {
  const lines = tableMarkdown.split('\n');
  if (lines.length > 2 && lines[0].trim().startsWith('|') && lines[1].trim().startsWith('|')) {
    return lines.slice(2).join('\n');
  }
  return tableMarkdown;
}

function formatRowsFirstColumnOnlyWithBr(tableRows) {
  return tableRows
    .split('\n')
    .map(row => {
      const cells = row.split('|').map(cell => cell.trim()).filter(Boolean);
      if (cells.length >= 1) {
        return `${cells[0]}`;
      }
      return '';
    })
    .filter(Boolean)
    .join('<br>');
}

function extractPublishedDate(section) {
  const match = section.match(/<!--\s*Published on:\s*([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z)\s*-->/);
  if (match && match[1]) {
    const date = new Date(match[1]);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  return null;
}
// Helper to create anchor with hyphens for spaces and numbers, and lowercase first letter
function createAnchor(title) {
  let anchor = title
    .trim()
    .replace(/[^\w\s.-]/g, '') // remove non-word except dot and dash
    .replace(/\s+/g, '-')      // spaces to hyphens
    .replace(/(\d{4})\.(\d{2})\.(\d{1,2})/g, '$1-$2-$3') // 2025.10.0 -> 2025-10-0
    .replace(/\./g, '-')       // dots to hyphens
    .replace(/-+/g, '-');      // collapse multiple hyphens

  // Lowercase the first character
  anchor = anchor.charAt(0).toLowerCase() + anchor.slice(1);
  return anchor;
}

function generateRssFromMarkdown(mdPath, feedTitle, feedDesc, siteUrl, rssOutputPath) {
  if (!fs.existsSync(mdPath)) {
    console.error(`Markdown file not found: ${mdPath}`);
    return;
  }
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  const sections = mdContent.includes('### ') ? mdContent.split('\n### ') : mdContent.split('\n## ');

  // Prepare releases array with parsed dates and markdown order
  const releasesRaw = sections.slice(1).map((section, idx) => {
    const [titleLine, ...bodyLines] = section.split('\n');
    const title = titleLine.trim();
    const pubDate = extractPublishedDate(section);
    let cleanedBody = stripMarkdownComments(bodyLines.join('\n').trim());
    let tablesOnly = extractTables(cleanedBody);
    tablesOnly = tablesOnly
      .split('\n\n')
      .map(table => {
        const rows = removeTableHeaders(table).trim();
        return formatRowsFirstColumnOnlyWithBr(rows);
      })
      .join('<br>');
    tablesOnly = convertSubheadingLinksToHtml(tablesOnly, siteUrl);
    const anchor = createAnchor(title);
    const itemLink = `${siteUrl}#${anchor}`;
    return { title, pubDate, description: tablesOnly, itemLink, idx };
  });

  // Find oldest published date
  const publishedDates = releasesRaw
    .map(r => r.pubDate)
    .filter(d => d)
    .sort((a, b) => a - b);
  const oldestDate = publishedDates.length > 0 ? publishedDates[0] : new Date();

  // Assign fallback dates for items without a published date
  const fallbackItems = releasesRaw.filter(r => !r.pubDate);
  fallbackItems.forEach((item, i) => {
    const fallbackDate = new Date(
      oldestDate.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000
    );
    item.pubDate = fallbackDate;
  });

  // Sort releases by their original order in markdown
  const releases = releasesRaw.sort((a, b) => a.idx - b.idx);

  // Get the pubDate of the first item (after sorting)
  const firstItemDate = releases.length > 0 ? releases[0].pubDate : new Date();

  const rssItems = releases.map(rel => `
    <item>
      <title>${rel.title}</title>
      <link>${rel.itemLink}</link>
      <guid>${rel.itemLink}</guid>
      <pubDate>${rel.pubDate.toUTCString()}</pubDate>
      <description><![CDATA[${rel.description}]]></description>
    </item>
  `).join('\n');

  // Use the first item's pubDate for the channel pubDate
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${feedTitle}</title>
  <link>${siteUrl}</link>
  <description>${feedDesc}</description>
  <pubDate>${firstItemDate.toUTCString()}</pubDate>
  ${rssItems}
</channel>
</rss>
`;

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

// Okta Access Gateway Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025-okta-access-gateway/index.md'),
  'Okta Access Gateway API release notes',
  'Recent release notes for Okta Access Gateway',
  'https://developer.okta.com/docs/release-notes/2025-okta-access-gateway/',
  path.join(__dirname, '../public/rss/access-gateway.xml')
);

// Okta Aerial Release Notes
generateRssFromMarkdown(
  path.join(__dirname, '../../docs/release-notes/2025-okta-aerial/index.md'),
  'Okta Aerial API release notes',
  'Recent release notes for Okta Aerial',
  'https://developer.okta.com/docs/release-notes/2025-okta-aerial/',
  path.join(__dirname, '../public/rss/aerial.xml')
);