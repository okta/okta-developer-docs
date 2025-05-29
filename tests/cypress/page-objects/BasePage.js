export class BasePage {
  visit(pageUrl) {
    cy.visit(pageUrl);
  }

//   pageReload() {
//     cy.reload();
//   }

  // See css breakpoints section from packages/@okta/vuepress-theme-prose/assets/css/abstracts/_breakpoints.scss
  resizeMedium() {
    cy.viewport(1023, 640);
  }
  resizeXXsmall() {
    cy.viewport(320, 640);
  }
  resizeXLarge() {
    cy.viewport(1920, 840);
  }

  getInPageLink(hash) {
    return cy.get(`a[href='${hash}']:not(.header-anchor)`);
  }

  getH2HeadingById(id) {
    return cy.get(`h2#${id}`);
  }

  getH5HeadingById(id) {
    return cy.get(`h5#${id}`);
  }
}
