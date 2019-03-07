const path = require('path');
const markdownLint = require('./markdown-lint');
const markdownLinkCheck = require('./markdown-link-check');
const rootDir = path.resolve(__dirname, '../packages/@okta/vuepress-site');

markdownLint(rootDir);

const options = {
  // Use our dist output as the URL path  for relative links
  // baseUrl: path.join(process.cwd(), 'dist'),
  baseUrl: '',
  ignorePatterns: [
    { pattern: '^http://localhost:' },
    { pattern: '^https://system-admin.'},
    { pattern: '.*.example.*.com'},
    // Example links
    { pattern: '^http://.*example.*'},
    { pattern: '^https://.*example.*'},
    { pattern: 'https://profile.wordpress.com/john.doe' },
    // Avoid 429s on known repos
    { pattern: '^https://github.com/okta/okta-auth-js'},
    { pattern: '^https://github.com/okta/okta-signin-widget'}
  ],
  replacementPatterns: [
    { pattern: '&#39;',
      replacement: '' },
    { pattern: '&quot;',
      replacement: '' }
  ],
  //options for parsing links in the markdown; see https://marked.js.org/#/USING_ADVANCED.md#options
  parseOpts: {
    mangle: true
  }
};

markdownLinkCheck(rootDir, options);
