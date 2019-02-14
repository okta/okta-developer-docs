const NavPage = require('../framework/page-objects/NavPage');

describe.skip('navigation bar search spec', () => {
  const navPage = new NavPage();

  beforeEach(() => {
    navPage.load();
  });

  // TODO
  // Add test for desktop search post-launch
  // We can't test search right now due to a self signed certificate
  // used for the test domain (staging site)
  // After launch, this will be resolved and we can add the test back

  // Disabled in chrome headless due to chromedriver bug - https://bugs.chromium.org/p/chromedriver/issues/detail?id=1772
  // We do not need to test mobile search.
  // The selector and user experience is the same as desktop
  // util.itNoHeadless('does search on desktop browser sizes', () => {
  //   navPage.resizeXLarge();
  //   // After resize it's better to call load() which waits for the presence of a page element
  //   // Sometimes, the searchIcon isn't present immediately after resize
  //   navPage.load();

  //   navPage.clickSearchIcon();
  //   expect(navPage.isSearchFieldPresent()).toBe(true);

  //   navPage.enterSearchText('Authentication');
  //   navPage.submitSearch();

  //   // Search results are not immediately available. We need this wait for a short period
  //   //navPage.waitForSearchResults();
  //  // expect(navPage.getCurrentURL()).toBe('/search/#stq=Authentication');
  //   //expect(navPage.areSearchResultsPresent()).toBe(true);
  // });



});
