const signUpButtonSelector = '.sign-up--button';
class MainPage {
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
}

export default MainPage;
