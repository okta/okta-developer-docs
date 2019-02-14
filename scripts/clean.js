const remove = require('remove');
const fs = require('fs');

// rm -rf dist
if (fs.existsSync('./dist')) {
    remove.removeSync('./dist');
}

// rm -rf _source/.asset-cache
if (fs.existsSync('./_source/.asset-cache')) {
    remove.removeSync('./_source/.asset-cache');
}
