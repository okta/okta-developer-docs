const signUpButtonSelector = '.sign-up--button';
const signInLinkXpath = "//*[text()='Sign in to Okta']";
const oktaMainPageLinkXpath = "//*[text()='Okta.com']";
const pricingLinkXpath = "//*[text()='Pricing']";
const communityLinkXpath = "//*[text()='Community']";


class MainPage {
  isSignupButtonPresent() {
    return cy.get(signUpButtonSelector)
  };
  getHeaderLink(link) {
    return cy.get(`header .header--links a[href="${link}"]`);
  };
  getCommunityLink() {
    return cy.get(`header .header--links li.expandable span.link`);
  }
}

export default MainPage;
