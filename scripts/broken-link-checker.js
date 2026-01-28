const blc = require('broken-link-checker');
const chalk = require('chalk');

const linkExtRe = new RegExp('https?://.*/[^/]+\\.[a-z]+$');
const trailingSlashRe = new RegExp('/$');

const handler = require('serve-handler');
const http = require('http');

const fs = require('fs');
const path = require('path');
const { parseStringPromise } = require('xml2js');

// Create output log file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logFilePath = path.resolve(`broken-links-${timestamp}.log`);
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Utility function to log to both console and file
function logToFile(message, useChalk = false) {
  console.log(message);
  // Strip chalk colors for file output
  const cleanMessage = useChalk ? message.replace(/\u001b\[[0-9;]*m/g, '') : message;
  logStream.write(cleanMessage + '\n');
}

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, {
    public: "packages/@okta/vuepress-site/dist"
  });
});

var options = {
  excludedKeywords: [
    "*.xml",
    "*.yml",
    "/img",
    "/assets",
    "/fonts",
    "/docs/api/postman",
    "/favicon",
    "/blog/",
    "/product/",
    "/product/*",
    "github.com/okta/okta-developer-docs/edit",
  ],
  // Use realistic browser headers to avoid bot detection
  requestOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    }
  }
};

const linkCheckMode = process.argv.slice(2)[0] || 'all';
logToFile("Link Check Mode: " + linkCheckMode);

if (linkCheckMode === 'internal') {
  logToFile("Running internal link check...");
  options.excludeExternalLinks = true;
} else if (linkCheckMode === 'external') {
  logToFile("Running external link check...");
  options.excludeInternalLinks = true;
} else {
  logToFile("Running both internal and external link check...");
}

var siteUrl = "http://localhost:8080";
const sitemapPath = path.resolve("packages/@okta/vuepress-site/dist/docs-sitemap.xml");

var customData = {
  outputGoodLinks: false,
  normalizeUrls: true, // ensure trailing slash for link/page URLs
  brokenLinks: [],
  firstLink: true,
  pageLinkCount: 0,
  pageExcludedCount: 0,
  pageBrokenCount: 0,
  totalLinkCount: 0,
  totalExcludedCount: 0,
  totalBrokenCount: 0
};

function summarizeBrokenLinks(customData) {
  var brokenLinkMap = new Map();
  for (const result of customData.brokenLinks) {
    var linkUrl;
    var pageUrl;
    if (customData.normalizeUrls) {
      linkUrl = normalizeUrl(result.url.resolved);
      pageUrl = normalizeUrl(result.base.resolved);
    } else {
      linkUrl = result.url.resolved;
      pageUrl = result.base.resolved;
    }
    var pageLinkMap;
    if (!brokenLinkMap.has(linkUrl)) {
      pageLinkMap = new Map();
      pageLinkMap.set(pageUrl, 1);
      brokenLinkMap.set(linkUrl, pageLinkMap);
    } else {
      pageLinkMap = brokenLinkMap.get(linkUrl);
      if (!pageLinkMap.has(pageUrl)) {
        pageLinkMap.set(pageUrl, 1);
      } else {
        pageLinkMap.set(pageUrl, pageLinkMap.get(pageUrl) + 1);
      }
    }
  }
  return brokenLinkMap;
}

function normalizeUrl(url) {
  if (!linkExtRe.test(url) && !trailingSlashRe.test(url)) {
    url += "/";
  }
  return url;
}

async function runChecker() {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const parsed = await parseStringPromise(xml);
  const urls = parsed.urlset.url.map((u) => u.loc[0]);
  const EXCLUDED_PAGES = [
    "/books/api-security/gateways/",
    "/docs/release-notes/2016/",
    "/docs/release-notes/2017/",
    "/docs/release-notes/2018/",
    "/docs/release-notes/2019/",
    "/docs/release-notes/2020/",
    "/docs/release-notes/2021/",
    "/docs/release-notes/2021-okta-identity-engine/",
    "/docs/release-notes/2022/",
    "/docs/release-notes/2022-okta-identity-engine/",
    "/docs/release-notes/2023/",
    "/docs/release-notes/2023-okta-identity-engine/"
  ];

  // Replace prod domain with localhost:8080
  const localUrls = urls.map((u) =>
    u.replace("https://developer.okta.com", siteUrl)
  ).filter((url) => !EXCLUDED_PAGES.some(page => url.endsWith(page)));

  let processed = 0;

  const htmlUrlChecker = new blc.HtmlUrlChecker(options, {
    link: function (result, customData) {
      if (result.broken) {
        customData.brokenLinks.push(result);
        customData.totalBrokenCount++;
      }
      customData.totalLinkCount++;
      
      // Verbose logging for external links
      if (!result.internal && linkCheckMode === 'external') {
        const statusCode = result.http && result.http.response ? result.http.response.statusCode : 'N/A';
        const statusText = result.http && result.http.response ? result.http.response.statusMessage : result.error?.message || 'Unknown';
        const brokenLabel = result.broken ? chalk.red('[BROKEN]') : chalk.green('[OK]');
        
        // Build detailed message with redirect and header info
        let detailMessage = `  ${brokenLabel} ${result.url.resolved} (${statusCode} ${statusText})`;
        
        // Log redirect info if available
        if (result.http && result.http.response) {
          const location = result.http.response.headers?.location;
          if (location) {
            detailMessage += ` -> redirects to: ${location}`;
          }
          // Log content-type for debugging
          const contentType = result.http.response.headers?.['content-type'];
          if (contentType) {
            detailMessage += ` [${contentType}]`;
          }
          // Log response size
          const contentLength = result.http.response.headers?.['content-length'];
          if (contentLength) {
            detailMessage += ` (${contentLength} bytes)`;
          }
        }
        
        logToFile(detailMessage, true);
        
        // Extra diagnostics for help.okta.com links that return 200 but might be broken
        if (result.url.resolved && result.url.resolved.includes('help.okta.com/okta_help.htm') && statusCode === 200) {
          const headers = result.http?.response?.headers || {};
          logToFile(`    DEBUG: Full URL: ${result.url.resolved}`, false);
          logToFile(`    DEBUG: Response headers: ${JSON.stringify(headers, null, 2)}`, false);
          if (result.http?.response) {
            logToFile(`    DEBUG: Status: ${result.http.response.statusCode} ${result.http.response.statusMessage}`, false);
          }
        }
      }
    },
    page: function (error, pageUrl, customData) {
      processed++;
      if (linkCheckMode === 'external') {
        logToFile(`\nPage: ${pageUrl}`);
      } else {
        logToFile(`Checked: ${processed}/${localUrls.length}`);
      }
      if (error) {
        logToFile(`Error on ${pageUrl}: ${error}`);
      }
      if (processed === localUrls.length) {
        logToFile("SUMMARY");
        logToFile("Total Links Found: " + customData.totalLinkCount);
        if (customData.totalBrokenCount > 0) {
          logToFile("Broken Links: " + customData.totalBrokenCount, true);
          logToFile("");
          var brokenMap = summarizeBrokenLinks(customData);
          for (const [outerKey, outerValue] of brokenMap.entries()) {
            logToFile(" Link: " + outerKey, true);
            for (const [innerKey, innerValue] of outerValue.entries()) {
              logToFile("  Page: " + innerKey + " (" + innerValue + ")", true);
            }
          }
          logToFile(`\nLog saved to: ${logFilePath}`);
          logStream.end();
          process.exit(1);
        } else {
          logToFile("Broken Links: 0", true);
          logToFile(`\nLog saved to: ${logFilePath}`);
          logStream.end();
          process.exit(0);
        }
      }
    },
  });

  for (const url of localUrls) {
    htmlUrlChecker.enqueue(url, customData);
  }
}

server.listen(8080, () => {
  logToFile('Running at http://localhost:8080');
  runChecker();
});
