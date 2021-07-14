const fs = require('fs');
const yamlParser = require('js-yaml');

const filename = 'conductor.yml';

const pathLike = /^\/[a-zA-Z0-9\-\._#\/]*$/;
const urlOrPathLike = /^(?:https?:\/)?\/[a-zA-Z0-9\-\._#\/]*$/;

let yaml;
let parsed;

// File can be read
try { 
  yaml = fs.readFileSync(filename, { encoding: 'utf8'} );
} catch (e) {
  console.error(`Error reading ${filename}`, e);
  process.exit(1);
}

// File is valid YAML
try { 
  parsed = yamlParser.safeLoad( yaml );
  console.log(`${filename} parse successful`);
} catch (e) { 
  console.error(`Error parsing YAML in ${filename}`, e);
  process.exit(1);
}

// File exports what conductor expects
try { 
  const failures = [];
  // Contains a single key, 'redirects'
  if(JSON.stringify(Object.keys(parsed)) !== '["redirects"]' ) {
    throw new Error('a "redirect" and only a "redirect" property should be defined in the top level object');
  }
  // redirects is an array of from/to pairings
  parsed.redirects.forEach( (pair) => { 
    if(JSON.stringify(Object.keys(pair).sort()) !== '["from","to"]') {
      console.error(JSON.stringify(Object.keys(pair).sort()));
      failures.push(`Error: not a proper from/to pairing: ${JSON.stringify(pair)}`);
    } else { 
      if(!pair.to.match(urlOrPathLike)) { 
        failures.push(`Error: 'to' path is not valid: ${pair.to}`);
      }
      if(!pair.from.match(pathLike)) { 
        failures.push(`Error: 'from' path is not valid: ${pair.from}`);
      }
    }
  });

  if(failures.length) { 
    failures.forEach( fail => console.error(fail) );
    process.exit(1);
  }  
  console.log(`${filename} exports correct values`);
} catch (e) { 
  console.error(`Error in ${filename}`, e);
  process.exit(1);
}

// File obeys the conductor extra requirements
// ...ends on a newline just after content (raw file is appended to with more entries

try { 
  const lastChar = yaml.slice(-1);
  const nextToLast = yaml.slice(-2).slice(0,1);
  if (lastChar !== '\n' || nextToLast === '\n' || nextToLast === '\r') { 
    throw new Error(`Error: ${filename} must end in a new (but not blank) line`);
  }
  console.log(`${filename} end-of-file check successful`);
} catch (e) { 
  console.error(e);
  process.exit(1);
}

