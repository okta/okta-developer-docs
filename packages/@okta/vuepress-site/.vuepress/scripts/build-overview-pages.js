const fs = require('fs');
const path = require('path');

function getNavbarConstPages() {
  const file = path.resolve(__dirname, '../../../vuepress-theme-prose/const/navbar.const.js'); // Main document file
  let content = fs.readFileSync(file, {encoding:'utf8'});
  let splitted = content.split(';');
  let navbarItems = [];
  for (let i = 0; i < splitted.length; i++) {
    let cleared = splitted[i]
      .replace('export const concepts = ', '')
      .replace('export const guides = ', '')
      .replace('export const journeys = ', '')
      .replace('export const languagesSdk = ', '')
      .replace('export const reference = ', '')
      .replace('export const releaseNotes = ', '');
      if (cleared !== '') {
        let evaled = eval(cleared);
        if (evaled) {
          navbarItems.push(evaled[0]);
        }
      }
  }
  return navbarItems;
}

function sanitizeTitle(el) {
  if (el.guideName) {
    return el.guideName;
  }

  if (el.journeyName) {
    return el.journeyName;
  }
  return el.title.toLowerCase().replace(/ /ig, '-').replace(/\//ig, '-').replace(/[()]/g, '');
}

let generatedPages = [];

function generatedLinks(arr, parent = null) {
  if (arr) {
    for (let el of arr) {
      if (el) {
        if (!el.path && parent && parent.path) {
          const isGuide = !el.guideName && !parent.path.includes('docs/journeys');
          const isJourney = !el.journeyName && parent.path.includes('docs/journeys');

          if (isGuide || isJourney) {
            const parentTitle = sanitizeTitle(parent);
            const elTitle = sanitizeTitle(el);
            const splittedPath = parent.path.split('/');
            let path = '';

            if ((isGuide && parentTitle !== 'guides') || (isJourney && parentTitle !== 'journeys')) {
              if (parent.path.includes(parentTitle)) {
                path = parent.path.replace(parentTitle, elTitle);
              } else if (parent.path === '/code/') {
                path = `/${splittedPath[1]}/${elTitle}/`;
              } else {
                path = `/${splittedPath[1]}/${splittedPath[2]}/${elTitle}/`;
              }
            } else {
              path = parent.path + elTitle + "/";
            }

            const page = {
              path,
              title: el.title,
              frontmatter: {}
            }
            if (el.customLandingPage) {
              page.frontmatter.customLandingPage = true;
            } else {
              page.frontmatter.generated = true;
            }
            if (el.description) {
              page.description = el.description;
            }
            generatedPages.push(page);
            el.path = path;
          }
        }
        if (!el.path) {
          el.path = parent.path + sanitizeTitle(el) + "/";
        }
        if (el.subLinks && el.subLinks.length > 0) {
          generatedLinks(el.subLinks, el);
        }
      }
    }
  }
}
generatedLinks(getNavbarConstPages());

const overviewPages = () => {
  return generatedPages;
}

module.exports = overviewPages;
