import { BasePage } from "./BasePage";

const signUpButtonSelector = '.sign-up--button';
class MainPage extends BasePage {
  visit() {
    cy.visit('/');
  }
  getSignupButton() {
    return cy.get(signUpButtonSelector)
  };
  getHeaderLink(link) {
    return cy.get(`header .header--links a[href="${link}"]`);
  };
  getCommunityLink() {
    return cy.get(`header .header--links li.expandable span.link`);
  }
  getFooterPricingLink() {
    return cy.get('footer ul.link-list a[href="https://www.okta.com/pricing/#customer-identity-products"]');
  }
  getSearchBarInput() {
    return cy.get('header .search--slideout').find('input');
  }
  submitSearch() {
    this.getSearchBarInput()
          .should('be.visible')
          .type('{enter}');
  }
  getSearchResults() {
    return cy.get('.CoveoResultList .coveo-result-list-container > .coveo-list-layout.CoveoResult')
  }
}

export default MainPage;
