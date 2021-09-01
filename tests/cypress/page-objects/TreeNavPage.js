import { BasePage } from "./BasePage";

export class TreeNavPage extends BasePage {
  getTreeNavLinkByItemText(text) {
    return cy.get('.sidebar-area .tree-nav ul.sections a.tree-nav-link span').contains(text)
  }

  getTreeNav() {
    return cy.get('.sidebar-area');
  }

  toggleTreeNavMobile() {
    cy.get('.crumb-show-contents').click();
  }
}
