import { BasePage } from "./BasePage";

export class DocsPage extends BasePage {
  getOnThisPageItem(hash) {
    const onThisPageSidebarSelector = '.on-this-page-navigation';
    return cy.get(`${onThisPageSidebarSelector} a[href="${hash}"]`);
  }
}
