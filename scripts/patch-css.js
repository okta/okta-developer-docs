const replace = require('replace-in-file');

const optionsForVariablesFile = {
    files: 'node_modules/@okta/odyssey/src/scss/abstracts/_variables.scss',
    from: [
        /\$small-spacing:\s*\$base-spacing\s*\/\s*2\s*;/g,
        /\$tiny-spacing:\s*\$small-spacing\s*\/\s*2\s*;/g,
        /\$em-small-spacing:\s*\$em-base-spacing\s*\/\s*2\s*;/g,
        /\$em-tiny-spacing:\s*\$em-small-spacing\s*\/\s*2\s*;/g,
    ],
    to: [
        `$small-spacing: calc($base-spacing / 2);`,
        `$tiny-spacing: calc($small-spacing / 2);`,
        `$em-small-spacing: calc($em-base-spacing / 2);`,
        `$em-tiny-spacing: calc($em-small-spacing / 2);`
    ],
};

const optionsForFunctionsFile = {
    files: 'node_modules/@okta/odyssey/src/scss/abstracts/_functions.scss',
    from: [
        /\$loops:\s*ceil\(str-length\(\$icon\)\s*\/\s*\$slice\)\s*;/g,
        '($value / $scale-ratio)',
    ],
    to: [
        `$loops: ceil(calc(str-length($icon) / $slice));`,
        `calc($value / $scale-ratio)`
    ],
};

const optionsForDropdownFile = {
    files: 'node_modules/@okta/odyssey/src/scss/components/_dropdown.scss',
    from: [
        '($max-line-length / 2)',
    ],
    to: [
        `calc($max-line-length / 2)`
    ],
};

const optionsForMeterFile = {
    files: 'node_modules/@okta/odyssey/src/scss/components/_meter.scss',
    from: [
        '$tiny-spacing/3',
    ],
    to: [
        `calc($tiny-spacing / 3)`
    ],
};

const optionsForSelectizeFile = {
    files: 'node_modules/@okta/odyssey/src/scss/vendors-ext/_selectize-ext.scss',
    from: [
        /\(\$tiny-spacing \/ 2\)/g,
    ],
    to: [
        `calc($tiny-spacing / 2)`
    ],
};

replace(optionsForVariablesFile)
  .then(results => {
    console.log('CSS Replacement results for _variables.scss:', results);
  })
  .catch(error => {
    console.error('Error occurred while replacing CSS for _variables.scss:', error);
  });

replace(optionsForFunctionsFile)
  .then(results => {
    console.log('CSS Replacement results for _functions.scss:', results);
  })
  .catch(error => {
    console.error('Error occurred while replacing CSS for _functions.scss:', error);
  });

replace(optionsForDropdownFile)
  .then(results => {
    console.log('CSS Replacement results for _dropdown.scss:', results);
  })
  .catch(error => {
    console.error('Error occurred while replacing CSS for _dropdown.scss:', error);
  });

replace(optionsForMeterFile)
  .then(results => {
    console.log('CSS Replacement results for _meter.scss:', results);
  })
  .catch(error => {
    console.error('Error occurred while replacing CSS for _meter.scss:', error);
  });

replace(optionsForSelectizeFile)
  .then(results => {
    console.log('CSS Replacement results for _selectize-ext.scss:', results);
  })
  .catch(error => {
    console.error('Error occurred while replacing CSS for _selectize-ext.scss:', error);
  });
