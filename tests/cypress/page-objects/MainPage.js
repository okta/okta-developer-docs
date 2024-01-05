import { BasePage } from "./BasePage";

const signUpButtonSelector = ".sign-up--button";
class MainPage extends BasePage {
  constructor() {
    super();
  }

  visit(path) {
    path ? super.visit(path) : cy.visit("/");
  }
  getSignupButton() {
    return cy.get(signUpButtonSelector);
  }
  getHeaderLink(link) {
    return cy.get(`header .header--links a[href="${link}"]`);
  }
  getCommunityLink() {
    return cy.get(`header .header--links .menu--desktop li.expandable span.link`);
  }
  getFooterPricingLink() {
    return cy.get(
      'footer ul.link-list a[href="https://www.okta.com/pricing/#workforce-identity-pricing"]'
    );
  }
  getFeedbackWidget() {
    return cy.get('#feedback-tab');
  }
  getSearchBarInput() {
    return cy.get("header .search--slideout").find("input");
  }
  submitSearch() {
    this.getSearchBarInput()
      .should("be.visible")
      .type("{enter}");
  }
  getSearchResults() {
    return cy.get(
      ".CoveoResultList .coveo-result-list-container > .coveo-list-layout.CoveoResult"
    );
  }
  getHeaderMobileMenuIcon() {
    return cy.get(`header .mobile--toggles .mobile--toggle`);
  }
  getMobileMenu() {
    return cy.get('header .menu--slideout');
  }
}

export default MainPage;
