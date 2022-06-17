const fs = require('fs');
const path = require('path')

function getNavbarConstPages() {
  const file = path.resolve(__dirname, '../../../vuepress-theme-prose/const/navbar.const.js'); // Main document file
  let content = fs.readFileSync(file, {encoding:'utf8'});
  let splitted = content.split(';');
  let navbarItems = [];
  for (let i = 0; i < splitted.length; i++) {
    let cleared = splitted[i]
      .replace('export const concepts = ', '')
      .replace('export const guides = ', '')
      .replace('export const languagesSdk = ', '')
      .replace('export const reference = ', '')
      .replace('export const releaseNotes = ', '');
      if (cleared !== '') {
        let evaled = eval(cleared);
        navbarItems.push(evaled[0]);
      }
  }
  return navbarItems;
}

function sanitizeTitle(el) {
  if (el.guideName) {
    return el.guideName;
  }
  return el.title.toLowerCase().replace(/ /ig, '-').replace(/\//ig, '-');
}

let generatedPages = [];

function generatedLinks(arr, parent = null) {
  for(let el of arr) {
    if (!el.path) {
      let path = parent.path + sanitizeTitle(el) + '/';
//       if (!el.guideName) {
//         // router.addRoutes([
//         //   { path: path, generated: true },
//         // ]);
//       }
      generatedPages.push({ 
        path: path, 
        frontmatter: {
          generated: true 
        }
      });
      el.path = path;
    }
    if (el.subLinks && el.subLinks.length > 0) {
      generatedLinks(el.subLinks, el);
    }
  }
}
generatedLinks(getNavbarConstPages());

const overviewPages = () => {
  return generatedPages;
}

module.exports = overviewPages;
