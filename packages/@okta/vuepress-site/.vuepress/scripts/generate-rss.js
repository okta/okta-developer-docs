const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt({ html: true });

// Helper to remove markdown comments <!-- ... -->
function stripMarkdownComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

// Helper to convert markdown links to headings into proper HTML links with absolute URLs
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

// Helper to extract all markdown tables, including those at the start of the content
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

// Helper to remove table headers from markdown tables
function removeTableHeaders(tableMarkdown) {
  const lines = tableMarkdown.split('\n');
  if (lines.length > 2 && lines[0].trim().startsWith('|') && lines[1].trim().startsWith('|')) {
    return lines.slice(2).join('\n');
  }
  return tableMarkdown;
}

// Helper to format table rows as plain text with only the first column and HTML line breaks
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

// Helper to extract "Published on:" date from a section or fallback to the whole file
function extractPublishedDate(section, fallbackContent) {
  let match = section.match(/Published on:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/);
  if (!match && fallbackContent) {
    match = fallbackContent.match(/Published on:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/);
  }
  if (match && match[1]) {
    const date = new Date(match[1]);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  return null;
}

// Helper to find the oldest "Published on:" date in all sections
function findOldestPublishedDate(sections, fallbackContent) {
  let oldest = null;
  for (const section of sections) {
    const date = extractPublishedDate(section, fallbackContent);
    if (date && (!oldest || date < oldest)) {
      oldest = date;
    }
  }
  return oldest;
}

// Helper to generate RSS XML from markdown
function generateRssFromMarkdown(mdPath, feedTitle, feedDesc, siteUrl, rssOutputPath) {
  if (!fs.existsSync(mdPath)) {
    console.error(`Markdown file not found: ${mdPath}`);
    return;
  }
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  // Split by '### ' for releases, fallback to '## ' if not found
  const sections = mdContent.includes('### ') ? mdContent.split('\n### ') : mdContent.split('\n## ');

  const now = new Date();

  // Find the oldest published date in all sections
  const fallbackStartDate = (() => {
    const oldestDate = findOldestPublishedDate(sections.slice(1), mdContent);
    if (oldestDate) {
      return new Date(oldestDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    // If no published date at all, fallback to now minus a week
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  })();

  let fallbackDateCounter = 0;

  // Process sections in order as in markdown (top section first)
  const releases = sections.slice(1).map((section, idx) => {
    const [titleLine, ...bodyLines] = section.split('\n');
    const title = titleLine.trim();

    // Use "Published on:" date if available, else fallback to incremented weekly date
    let pubDate = extractPublishedDate(section, mdContent);
    let usedFallbackDate = false;
    if (!pubDate) {
      pubDate = new Date(fallbackStartDate.getTime() + fallbackDateCounter * 7 * 24 * 60 * 60 * 1000);
      usedFallbackDate = true;
      fallbackDateCounter++;
    }

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
    const description = tablesOnly;
    const itemLink = `${siteUrl}#${title.replace(/[^a-zA-Z0-9]/g, '')}`;
    return { title, pubDate, description, itemLink, usedFallbackDate };
  });

  const rssItems = releases.map(rel => `
    <item>
      <title>${rel.title}</title>
      <link>${rel.itemLink}</link>
      <guid>${rel.itemLink}</guid>
      ${!rel.usedFallbackDate ? `<pubDate>${rel.pubDate.toUTCString()}</pubDate>` : ''}
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