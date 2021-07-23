export class BasePage {
  visit(pageUrl) {
    cy.visit(pageUrl);
  }

  pageReload() {
    cy.reload();
  }

  resizeMedium() {
    cy.viewport(1024, 640);
  }

  resizeXXsmall() {
    cy.viewport(480, 640);
  }

  resizeXLarge() {
    cy.viewport(1400, 840);
  }

  getInPageLink(hash) {
    return cy.get(`a[href='${hash}']:not(.header-anchor)`);
  }

  getH2HeadingById(id) {
    return cy.get(`h2#${id}`);
  }
}
