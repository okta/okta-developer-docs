import MainPage from '../page-objects/MainPage';

describe('header sanity check', () => {
  const mainPage = new MainPage();

  beforeEach( () => {
    cy.visit('/')
  });

  it('validate developer okta main page links', () => {
    mainPage.getSignupButton().should('be.visible');
    mainPage.getHeaderLink('/login/').should('be.visible');
    mainPage.getHeaderLink('https://www.okta.com/').should('be.visible');
    mainPage.getHeaderLink('https://www.okta.com/pricing/#customer-identity-products').should('be.visible');
    mainPage.getCommunityLink().should('have.text', 'Community');
  });

  it('Should open new tab with okta.com inside', () => {
    mainPage.getFooterPricingLink().click()
  });
});
