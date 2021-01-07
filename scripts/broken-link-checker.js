const blc = require('broken-link-checker');
const chalk = require('chalk');

const linkExtRe = new RegExp('https?://.*/[^/]+\\.[a-z]+$');
const trailingSlashRe = new RegExp('/$');

const handler = require('serve-handler');
const http = require('http');

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
    "/pricing/", // TO REMOVE AFTER REDESIGN
    "/product/",
    "/product/*",
    "/okta-integration-network/", // TO REMOVE AFTER REDESIGN
    "github.com/okta/okta-developer-docs/edit",
  ]
};

const linkCheckMode = process.argv.slice(2) == '' ? 'all' : process.argv.slice(2);
console.log("Link Check Mode: " + linkCheckMode);

if (linkCheckMode == 'internal') {
  console.log("Running internal link check...");
  options.excludeExternalLinks = true;
} else if (linkCheckMode == 'external') {
  console.log("Running external link check...");
  options.excludeInternalLinks = true;
} else {
  console.log("Running both internal and external link check...");
}

var siteUrl = "http://localhost:8080";
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

var siteChecker = new blc.SiteChecker(options, {
  robots: function(robots, customData){},
  html: function(tree, robots, response, pageUrl, customData){},
  junk: function(result, customData){},
  link: function(result, customData){
    if (customData.firstLink) {
      customData.firstLink = false;
    }
    if (result.broken) {
      customData.brokenLinks.push(result);
      customData.pageBrokenCount++;
    } else if (result.excluded) {
      customData.pageExcludedCount++;
    } else {
      //good link
      if (customData.outputGoodLinks) {
      }
    }
    customData.pageLinkCount++;
  },
  page: function(error, pageUrl, customData){
    if (customData.pageLinkCount > 0) {
      customData.totalLinkCount += customData.pageLinkCount;
      customData.totalExcludedCount += customData.pageExcludedCount;
      customData.totalBrokenCount += customData.pageBrokenCount;
      customData.pageLinkCount = 0;
      customData.pageExcludedCount = 0;
      customData.pageBrokenCount = 0;
    }
    customData.firstLink = true;
  },
  site: function(error, siteUrl, customData){
    if (customData.totalLinkCount > 0) {
      console.log("SUMMARY");
      console.log("Total Links Found: " + customData.totalLinkCount);
      if (customData.totalBrokenCount > 0) {
        console.log("Broken Links: " + chalk.bold.red(customData.totalBrokenCount));
        console.log();
        var brokenMap = summarizeBrokenLinks(customData);
        for (const [outerKey, outerValue] of brokenMap.entries()) {
          console.log(chalk.bold.red(" Link: " + outerKey));
          for (const [innerKey, innerValue] of outerValue.entries()) {
            console.log(chalk.cyan("  Page: " + innerKey + " (" + innerValue + ")"));
          }
          console.log();
        }
        this.fail = true;
      } else {
        console.log("Broken Links: " + chalk.bold.green(customData.totalBrokenCount));
        this.fail = false;
      }
    } else {
      console.log("No links found.");
    }
  },
  end: function(){
    if (this.fail) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  },
});


server.listen(8080, () => {
  console.log('Running at http://localhost:8080');
});

siteChecker.enqueue(siteUrl, customData);
