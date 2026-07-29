/**
 * Generates /llms.txt for developer.okta.com  —  POST-BUILD.
 *
 * Sourced from the build output so it is consistent by construction:
 *   - Canonical, indexable URLs come from dist/docs-sitemap.xml, which already
 *     honors every `frontmatter.sitemap.exclude` rule (reference/api pages,
 *     redirecting guide landings, framework `main` stubs, test_page) applied in
 *     .vuepress/config.js and strip-guide-parts-from-sitemap.js.
 *   - Any URL that dist/robots.txt Disallows is dropped, so llms.txt never
 *     advertises a path the site tells crawlers not to index.
 *   - Titles/descriptions are read from the page's source frontmatter.
 *
 * Runs in `postbuild`, after strip-guide-parts-from-sitemap.js, so both
 * dist/docs-sitemap.xml (final, stripped) and dist/robots.txt (final, fixed)
 * exist. Output: dist/llms.txt  ->  https://developer.okta.com/llms.txt
 *
 * Uses only fs, path, js-yaml and xml2js (all declared dependencies).
 * Set LLMS_DIST to point at an alternate build dir (used by the fixture test).
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const xml2js = require('xml2js');

const SITE_URL = 'https://developer.okta.com';
const SITE_ROOT = path.join(__dirname, '../..');
const DOCS_DIR = path.join(SITE_ROOT, 'docs');
const DIST = process.env.LLMS_DIST ? path.resolve(process.env.LLMS_DIST) : path.join(SITE_ROOT, 'dist');
const SITEMAP_FILE = path.join(DIST, 'docs-sitemap.xml');
const ROBOTS_FILE = path.join(DIST, 'robots.txt');
const OUT_FILE = path.join(DIST, 'llms.txt');

// [top-level docs/ segment, section heading] — order preserved in the output.
const SECTIONS = [
  ['concepts', 'Concepts'],
  ['guides', 'Guides'],
  ['reference', 'API and reference'],
  ['journeys', 'Journeys'],
  ['release-notes', 'Release notes'],
];
const SECTION_LABEL = new Map(SECTIONS);

function oneLine(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return null;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return null;
  try {
    return yaml.load(raw.slice(3, end).replace(/^\r?\n/, '')) || {};
  } catch (e) {
    return null;
  }
}

function descriptionOf(fm) {
  if (fm.excerpt) return oneLine(fm.excerpt);
  if (fm.description) return oneLine(fm.description);
  if (Array.isArray(fm.meta)) {
    const d = fm.meta.find((m) => m && m.name === 'description' && m.content);
    if (d) return oneLine(d.content);
  }
  return '';
}

function readFrontmatter(file) {
  try {
    return parseFrontmatter(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return null;
  }
}

// Resolve a served URL path back to its source page frontmatter. Walks up the
// path (and checks the guide body's `main/` subdir) so framework/section URLs
// like /docs/guides/<name>/<framework>/main/ resolve to the guide's frontmatter.
function frontmatterForPath(pathname) {
  const segs = pathname.replace(/^\/|\/$/g, '').split('/'); // ['docs','guides','name',...]
  for (let n = segs.length; n >= 2; n--) {
    const rel = segs.slice(1, n); // drop leading 'docs'
    const direct = readFrontmatter(path.join(DOCS_DIR, ...rel, 'index.md'));
    if (direct && direct.title) return direct;
    const inMain = readFrontmatter(path.join(DOCS_DIR, ...rel, 'main', 'index.md'));
    if (inMain && inMain.title) return inMain;
  }
  return null;
}

function readSitemapLocs() {
  const xml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  let locs = [];
  xml2js.parseString(xml, (err, result) => {
    if (err) throw err;
    const urls = (result && result.urlset && result.urlset.url) || [];
    locs = urls.map((u) => u.loc && u.loc[0]).filter(Boolean);
  });
  return locs;
}

function readDisallowPrefixes() {
  if (!fs.existsSync(ROBOTS_FILE)) return [];
  return fs
    .readFileSync(ROBOTS_FILE, 'utf8')
    .split('\n')
    .map((line) => line.match(/^\s*Disallow:\s*(\S+)\s*$/i))
    .filter(Boolean)
    .map((m) => m[1])
    .filter((p) => p && p !== '/'); // ignore "block everything" / empty rules
}

function main() {
  if (!fs.existsSync(SITEMAP_FILE)) {
    throw new Error(`generate-llms: ${SITEMAP_FILE} not found. Run after the build (postbuild).`);
  }
  const disallow = readDisallowPrefixes();
  const isDisallowed = (pathname) => disallow.some((prefix) => pathname.startsWith(prefix));

  // Key = full path for standalone pages; = "guides/<name>" so a guide's many
  // framework permutations collapse to a single entry (first URL wins; a later
  // permutation only backfills a missing description).
  const seen = new Map();
  for (const loc of readSitemapLocs()) {
    if (!loc.startsWith(SITE_URL)) continue;
    const pathname = loc.slice(SITE_URL.length);
    if (!pathname.startsWith('/docs/')) continue;
    if (isDisallowed(pathname)) continue;

    const segs = pathname.replace(/^\/|\/$/g, '').split('/');
    const section = segs[1];
    if (!SECTION_LABEL.has(section)) continue;

    const fm = frontmatterForPath(pathname);
    if (!fm || !fm.title) continue;

    const key = section === 'guides' && segs[2] ? `guides/${segs[2]}` : pathname;
    const entry = { url: loc, section, title: oneLine(fm.title), description: descriptionOf(fm) };
    const prev = seen.get(key);
    if (!prev) {
      seen.set(key, entry);
    } else {
      // Collapse a guide's framework permutations to one deterministic entry:
      // keep the lexicographically smallest URL, but never lose a description.
      const description = prev.description || entry.description;
      const winner = entry.url < prev.url ? entry : prev;
      winner.description = description;
      seen.set(key, winner);
    }
  }

  const bySection = new Map();
  for (const entry of seen.values()) {
    if (!bySection.has(entry.section)) bySection.set(entry.section, []);
    bySection.get(entry.section).push(entry);
  }

  const lines = [
    '# Okta Developer Documentation',
    '',
    '> Secure, scalable, and highly available authentication and user management for any app. ' +
      'This index links the concepts, guides, and API reference needed to build Okta integrations.',
    '',
  ];
  for (const [seg, heading] of SECTIONS) {
    const items = bySection.get(seg);
    if (!items || !items.length) continue;
    items.sort((a, b) => a.title.localeCompare(b.title));
    lines.push(`## ${heading}`, '');
    for (const it of items) {
      lines.push(`- [${it.title}](${it.url})${it.description ? `: ${it.description}` : ''}`);
    }
    lines.push('');
  }

  fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');
  console.log(`llms.txt generated: ${seen.size} pages -> ${path.relative(process.cwd(), OUT_FILE)}`);
}

main();
