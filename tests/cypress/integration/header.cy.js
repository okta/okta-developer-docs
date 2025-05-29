import MainPage from '../page-objects/MainPage';

describe('header sanity check', () => {
  const mainPage = new MainPage();

  beforeEach( () => {
    mainPage.visit('/test_page/');
  });

  it('validate developer okta main page links', () => {
    mainPage.getSignupButton().should('be.visible');
    mainPage.getHeaderLink('/login/').should('be.visible');
    mainPage.getHeaderLink('https://www.okta.com/').should('be.visible');
    mainPage.getHeaderLink('https://www.okta.com/pricing/#customer-identity-products').should('be.visible');
    mainPage.getCommunityLink().should('have.text', 'Community');
  });

  it('should have pricing link for new tab with href on okta.com pricing section', () => {
    mainPage.getFooterPricingLink().should('have.attr', 'href').and('eq', 'https://www.okta.com/pricing/#workforce-identity-pricing');
    mainPage.getFooterPricingLink().should('have.attr', 'target').and('eq', '_blank');
  });
});
