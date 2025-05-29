import MainPage from "../page-objects/MainPage";

describe("navigation bar search spec", () => {
  const mainPage = new MainPage();

  beforeEach(() => {
    mainPage.visit('/test_page/');
  });

  it("does search on desktop browser sizes", () => {
    mainPage.resizeXLarge();

    mainPage.getSearchBarInput().should("exist");

    mainPage.getSearchBarInput().type("Authentication");
    mainPage.submitSearch();

    mainPage.pageReload();

    cy.location().should(location => {
      expect(location.pathname).to.eq("/search/");
      expect(location.hash).to.eq("#q=Authentication");
    });

    mainPage.getSearchResults().should('exist');
  });
});
