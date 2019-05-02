const blc = require('broken-link-checker');
const chalk = require('chalk');

function summarizeBrokenLinks(customData) {
  var brokenLinkMap = new Map();
  for (const result of customData.brokenLinks) {
    const linkUrl = result.url.resolved;
    const pageUrl = result.base.resolved;
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
    "/pricing/",
    "/product/",
    "/product/*"
  ]
};
var siteUrl = "http://localhost:8080";
var customData = {
  outputGoodLinks: false,
  brokenLinks: [],
  firstLink: true,
  pageLinkCount: 0,
  pageExcludedCount: 0,
  pageBrokenCount: 0,
  totalLinkCount: 0,
  totalExcludedCount: 0,
  totalBrokenCount: 0
};

var siteChecker = new blc.SiteChecker(options, {
  robots: function(robots, customData){},
  html: function(tree, robots, response, pageUrl, customData){},
  junk: function(result, customData){},
  link: function(result, customData){
    if (customData.firstLink) {
      console.log("Getting links from: " + result.base.resolved);
      customData.firstLink = false;
    }
    if (result.broken) {
      console.log(chalk.bold.red("─BROKEN─ ") + chalk.cyan(result.url.resolved));
      customData.brokenLinks.push(result);
      customData.pageBrokenCount++;
    } else if (result.excluded) {
      customData.pageExcludedCount++;
    } else {
      //good link
      if (customData.outputGoodLinks) {
        console.log(chalk.bold.green("───OK─── ") + chalk.gray(result.url.resolved));
      }
    }
    customData.pageLinkCount++;
  },
  page: function(error, pageUrl, customData){
    if (customData.pageLinkCount > 0) {
      console.log("Finished! " + customData.pageLinkCount + " link(s) found. " + customData.pageBrokenCount + " broken.");
      console.log();
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
    }
  },
});

siteChecker.enqueue(siteUrl, customData);
