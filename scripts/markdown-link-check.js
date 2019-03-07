const path = require('path');
const { readFileSync } = require('fs');
const chalk = require('chalk');
const readdir = require('recursive-readdir');
const markdownLinkCheck = require('markdown-link-check');
const waitUntil = require('wait-until');

const HtmlEntities = require('html-entities').AllHtmlEntities;
const htmlEntities = new HtmlEntities();


const includeFiles = [
  '.md'
];

const excludeFiles = [
  '/3rd_party_notices',
  '/posts',
  '/books'
];

const noNewResultsThreshold = 5;
const noNewResultsTimeInterval = 2000;
const checkForDoneTimeInterval = 2000;
const checkForDoneIterations = 60;

var resultsCount = 0;
var previousResultsCount = -1;
var noNewResultsCount = 0;
var intervalTimer;
var isDone = false;

function header(str) {
  console.log(`\n${chalk.bold(str)}`);
}

function outputError(result) {
  console.log(`[${chalk.red('✖')}] ${result.link}`);
}

async function getFiles(dir) {
  const files = await readdir(dir);
  const filesToCheck = [];

  for (let file of files) {
    var shouldOmit = false;
    await excludeFiles.forEach(item => {
      if (!shouldOmit && file.includes(item)) {
        shouldOmit = true;
      }
    });
    if (!shouldOmit) {
      await includeFiles.forEach(item => {
        if (file.includes(item)) {
          filesToCheck.push(file);
        }
      });
    }
  }
  return filesToCheck;
}

async function runMarkdownLinkCheck(dir, options) {
  const files = await getFiles(dir);
  header(`Checking source for broken links (${__filename})`);
  header(`Found ${files.length} files to check in ${dir}`);

  var isError = false;
  intervalTimer = startResultsTrigger();

  files.map((file) => {
    const contents = readFileSync(file, 'utf8');
    const linkErrors = [];
    markdownLinkCheck(contents, options, (err, results) => {
      if (err) { throw new Error(err) }
      return Promise.all(results.map(result => {
        resultsCount ++;
        if (result.status === 'dead') {
          linkErrors.push(result);
          isError = true;
        }
      })).then(() => {
        if (linkErrors.length > 0) {
          console.log(`FILE: ${chalk.bold.red(file)}`);
          return Promise.all(linkErrors.map(error => {
            outputError(error);
          }));
        }
      });
    });
  });

  waitUntil(checkForDoneTimeInterval, checkForDoneIterations, function condition() {
    return (isDone ? true : false);
  }, function done(result) {
    if (result) {
      if (isError) {
        console.log(chalk.bold.red('\nValidation problems found!\n'));
        process.exit(1);
      } else {
        console.log(chalk.bold.green('\nNo problems found!\n'));
      }
    } else {
      console.log(chalk.bold.red('\nValidation did not complete within the allowed time. ('
        + checkForDoneTimeInterval * checkForDoneIterations / 1000 + ' seconds)\n'));
      process.exit(1);
    }
  });
}

function startResultsTrigger() {
  return setInterval(checkForNoMoreResults, noNewResultsTimeInterval);
}

function checkForNoMoreResults() {
  if (resultsCount === previousResultsCount) {
    noNewResultsCount ++;
    if (noNewResultsCount >= noNewResultsThreshold) {
      isDone = true;
      clearInterval(intervalTimer);
    }
  } else {
    previousResultsCount = resultsCount;
    noNewResultsCount = 0;
  }
}

module.exports = runMarkdownLinkCheck;
