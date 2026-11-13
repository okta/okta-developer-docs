const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { DateTime } = require('luxon');

module.exports = (options, ctx) => {
  return {
    // Replaces @vuepress/last-updated, which runs a blocking `git log` per page
    // (~3800 pages). Same git command and output, but run asynchronously with
    // bounded concurrency and memoized per source file.
    async extendPageData($page) {
      $page.fullHeaders = resolveHeaders($page);

      const timestamp = await getGitLastUpdatedTimeStamp($page._filePath);
      if (timestamp) {
        $page.lastUpdated = DateTime.fromMillis(timestamp)
          .setLocale($page._computed.$lang)
          .toLocaleString(DateTime.DATE_FULL);
        $page.lastUpdatedTimestamp = timestamp;
      }
    }
  };
};

function resolveHeaders(page) {
  const headers = groupHeaders(page.headers || []);
  return [
    {
      type: "group",
      collapsable: false,
      title: page.title,
      path: null,
      children: headers.map(h => ({
        type: "auto",
        title: h.title,
        basePath: page.path,
        path: page.path + "#" + h.slug,
        children: h.children || []
      }))
    }
  ];
}

function groupHeaders(headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h));
  let lastH2;
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h;
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h);
    }
  });
  return headers.filter(h => h.level === 2);
}

const GIT_CONCURRENCY = Math.max(4, os.cpus().length * 2);
const gitQueue = [];
const timestampCache = new Map();
let gitActive = 0;

function getGitLastUpdatedTimeStamp(filePath) {
  if (!filePath) {
    return Promise.resolve(undefined);
  }
  if (!timestampCache.has(filePath)) {
    timestampCache.set(filePath, new Promise(resolve => {
      gitQueue.push({ filePath, resolve });
      drainGitQueue();
    }));
  }
  return timestampCache.get(filePath);
}

function drainGitQueue() {
  while (gitActive < GIT_CONCURRENCY && gitQueue.length) {
    const { filePath, resolve } = gitQueue.shift();
    gitActive++;
    let stdout = '';
    const child = spawn(
      'git',
      ['log', '-1', '--format=%at', path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    );
    let settled = false;
    const done = value => {
      if (settled) {
        return;
      }
      settled = true;
      gitActive--;
      resolve(value);
      drainGitQueue();
    };
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.on('error', () => done(undefined));
    child.on('close', () => done(parseInt(stdout, 10) * 1000));
  }
}
