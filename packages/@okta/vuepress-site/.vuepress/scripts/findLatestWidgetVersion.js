// Per https://oktainc.atlassian.net/browse/OKTA-257391
// Finds latest version of specified major version
// see .vuepress/scripts/build-replacement-vars.js to see usage

const execSync = require('child_process').execSync;

const findLatestWidgetVersion = (majorVersion) => { 
  const cleanVersion = `${majorVersion}`.replace(/\D+/g, '');
  if(cleanVersion !== `${majorVersion}`) { 
    // Preventing command execution via shell command insertion attacks
    throw new Error(`only digits for a major version of the widget permitted! saw: "${majorVersion}"`);
  }

  const publishedVersions = JSON.parse(execSync(`npm view --json @okta/okta-signin-widget@${cleanVersion} version`));
  const latestWidgetVersion = Array.isArray(publishedVersions) ? publishedVersions.sort().slice(-1)[0] : publishedVersions;

  return latestWidgetVersion;
};

module.exports = findLatestWidgetVersion;

