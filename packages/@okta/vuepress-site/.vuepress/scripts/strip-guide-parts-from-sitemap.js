const fs = require('fs');
const path = require('path');
const util = require('util');
const xml2js = require('xml2js');
const parser = util.promisify( (new xml2js.Parser()).parseString );

function isValidUrl(url) {
  const guideFormat = new RegExp('/guides/(?:[^/]+/(?:(?:[^/]+/)?[^/]+/)?)?$');
  // loc is an array of 1 element with the xml2js parser
  return !url.loc[0].includes('docs/guides/') || url.loc[0].match(guideFormat);
};


const sitemapFilename = path.join('dist','docs-sitemap.xml');
const rawXml = fs.readFileSync( sitemapFilename, 'utf-8');

parser(rawXml)
  .then( parsed => {
    parsed.urlset.url = parsed.urlset.url.filter( url => isValidUrl(url) );
    const builder = new xml2js.Builder({ xmldec: {'version': '1.0', 'encoding': 'UTF-8' }});
    const xml = builder.buildObject(parsed);
    fs.writeFileSync(sitemapFilename, xml);
  })
  .catch( err => console.warn(err) );
