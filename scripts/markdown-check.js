const path = require('path');
const rootDir = path.resolve(__dirname, '../packages/@okta/vuepress-site');

const markdownLint = require('./markdown-lint');
console.log("Running markdown lint...");
markdownLint(rootDir);
