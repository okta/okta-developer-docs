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

  const latestWidgetVersion = JSON.parse(execSync(`npm view --json @okta/okta-signin-widget@${cleanVersion} version`)).slice(-1)[0];
  return latestWidgetVersion;
};

module.exports = findLatestWidgetVersion;

