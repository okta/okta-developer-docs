const signUpButtonSelector = '.sign-up--button';
const signInLinkXpath = "//*[text()='Sign in to Okta']";
const oktaMainPageLinkXpath = "//*[text()='Okta.com']";
const pricingLinkXpath = "//*[text()='Pricing']";
const communityLinkXpath = "//*[text()='Community']";

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
