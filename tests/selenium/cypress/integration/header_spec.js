import MainPage from '../page-objects/MainPage';

describe('header sanity check', () => {
  const mainPage = new MainPage();

  beforeEach( () => {
    cy.visit('/')
  });

  it('validate developer okta main page links', () => {
    mainPage.isSignupButtonPresent().should('be.visible');
    mainPage.getHeaderLink('/login/').should('be.visible');
    mainPage.getHeaderLink('https://www.okta.com/').should('be.visible');
    mainPage.getHeaderLink('/pricing/').should('be.visible');
    mainPage.getCommunityLink().should('have.text', 'Community');
  });

});
