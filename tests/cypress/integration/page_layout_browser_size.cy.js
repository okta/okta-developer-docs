import MainPage  from "../page-objects/MainPage";

describe('page layout and browser size spec', () => {
  const mainPage = new MainPage();

  beforeEach(() => {
    mainPage.visit('/test_page/');
    //mainPage.pageReload();
  });

  it('shows the main navigation with desktop browser sizes', () => {
    mainPage.getCommunityLink().should('be.visible');
    mainPage.getHeaderMobileMenuIcon().should('be.not.visible');
  });

  it('shows mobile navigation with mobile browser sizes', () => {
    mainPage.resizeXXsmall();

    mainPage.getCommunityLink().should('be.not.visible');
    mainPage.getHeaderMobileMenuIcon().should('be.visible');

    mainPage.getHeaderMobileMenuIcon().click();

    mainPage.getMobileMenu().should('have.class', 'opened');
    mainPage.getMobileMenu().should('be.visible')
  });
});
