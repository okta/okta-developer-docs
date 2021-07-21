export class BasePage {
  visit(pageUrl) {
    cy.visit(pageUrl);
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
}
