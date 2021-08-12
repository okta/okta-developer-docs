import { DocsPage } from "./DocsPage";

export class TableOfContentsPage extends DocsPage {
  getLastSectionHeading() {
    return cy.get('#last-section');
  }

  getLevelOneItem() {
    return cy.get('.TableOfContents-item.is-level1');
  }
}
