const fs = require('fs');
const yaml = require('js-yaml');

const filename = 'conductor.yml';

try { 
  const redirects = yaml.safeLoad( fs.readFileSync(filename, { encoding: 'utf8'} ));
  console.log(`${filename} parse successful`);
} catch (e) { 
  console.warn(e);
  process.exit(1);
}
