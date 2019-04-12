const path = require('path');
const rootDir = path.resolve(__dirname, '../packages/@okta/vuepress-site');

const checkMode = process.argv.slice(2) == '' ? 'all' : process.argv.slice(2);
console.log("Check Mode: " + checkMode);

if (checkMode == 'all' || checkMode == 'lint') {
  console.log("Running markdown lint...");
  const markdownLint = require('./markdown-lint');
  markdownLint(rootDir);
}

if (checkMode == 'all' || checkMode == 'link-check') {
  console.log("Running markdown link-check...");
  const markdownLinkCheck = require('./markdown-link-check');

  const options = {
    baseUrl: 'http://localhost:8080',
    ignorePatterns: [
      { pattern: '^http://localhost:' },
      { pattern: '^https://system-admin.' },
      { pattern: '.*.example.*.com' },
      // Example links
      { pattern: '^http://.*example.*' },
      { pattern: '^https://.*example.*' },
      { pattern: 'https://profile.wordpress.com/john.doe' },
      // Avoid 429s on known repos
      { pattern: '^https://github.com/okta/okta-auth-js' },
      { pattern: '^https://github.com/okta/okta-signin-widget' },

    ],
    replacementPatterns: [
      {
        pattern: '&#39;',
        replacement: ''
      },
      {
        pattern: '&quot;',
        replacement: ''
      }
    ],
    httpHeaders: [
      {
        urls: [
          'http://localhost:8080',
          '/'
        ],
        headers: {
          'Accept': '*/*'
        }
      }
    ],
    //options for parsing links in the markdown; see https://marked.js.org/#/USING_ADVANCED.md#options
    parseOpts: {
      mangle: true
    }
  };

  markdownLinkCheck(rootDir, options);
}
