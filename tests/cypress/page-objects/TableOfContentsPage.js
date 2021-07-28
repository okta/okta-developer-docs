import { BasePage } from "./BasePage";

export class TableOfContentsPage extends BasePage {
  lastSectionHeadingSelector = '#last-section';
  level1ItemSelector = '.TableOfContents-item.is-level1'

  getLastSectionHeading() {
    return cy.get(this.lastSectionHeadingSelector);
  }

  getLevelOneItem() {
    return cy.get(this.level1ItemSelector);
  }
}
