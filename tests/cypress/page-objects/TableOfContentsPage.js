import { BasePage } from "./BasePage";

export class TableOfContentsPage extends BasePage {
  getLastSectionHeading() {
    return cy.get('#last-section');
  }

  getLevelOneItem() {
    return cy.get('.TableOfContents-item.is-level1');
  }
}
