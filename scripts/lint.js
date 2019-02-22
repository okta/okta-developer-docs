const path = require('path');
const markdownLint = require('./markdown-lint');

markdownLint(path.resolve(__dirname, '../_source'));
