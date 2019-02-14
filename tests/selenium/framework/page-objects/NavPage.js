'use strict';

const BasePage = require('./BasePage');

const headerSelector = 'header.Header';

const desktopNavSelector = '.Header-nav.PrimaryNav';
const searchIconSelector = '.SearchIcon';
const searchInputSelector = '#st-search-input-auto';
const resultsBoxSelector = '.SearchResults';
const supportNavSelector = '.Header-nav .expanded';

const supportLinkSelector = 'span';
const supportLinkText = 'Support';

const mobileNavsSelector = '.PrimaryNav-is-active';
const mobileToggleIconsSelector = '.PrimaryNav-toggle';
const menusSelector = '.menu';

class NavPage extends BasePage {
  constructor(url) {
    super(url, NavPage.getPageLoadElement());
  }

  navigate(url, pageLoadElement) {
    if (pageLoadElement) {
      this.load(url, pageLoadElement);
    } else {
      this.load(url, NavPage.getPageLoadElement());
    }
  }

  static getPageLoadElement() {
    return element(by.css(headerSelector));
  }

  getDesktopNav() {
    return element(by.css(desktopNavSelector));
  }

  getMobileNavs() {
    return element.all(by.css(mobileNavsSelector));
  }

  getMobileToggleIcons() {
    return element.all(by.css(mobileToggleIconsSelector));
  }

  getMenuElements() {
    return element.all(by.css(menusSelector));
  }

  getSearchIcon() {
    return element(by.css(searchIconSelector));
  }

  getSearchInput() {
    return element(by.css(searchInputSelector));
  }

  getResults() {
    return element(by.css(resultsBoxSelector))
  }

  getSupportLink() {
    return element(by.cssContainingText(supportLinkSelector, supportLinkText));
  }

  getSupportNav() {
    return element.all(by.css(supportNavSelector))
  }


  isDesktopNavDisplayed() {
    return this.getDesktopNav().isDisplayed();
  }

  isMobileNavDisplayed() {
    return this.hasElements(this.getMobileNavs());
  }

  isMobileToggleIconDisplayed() {
    return this.getMobileToggleIcons().isPresent();
  }

  clickSearchIcon() {
    return this.getSearchIcon().click();
  }

  enterSearchText(searchText) {
    return this.getSearchInput().sendKeys(searchText);
  }

  submitSearch() {
    return this.getSearchInput().sendKeys(protractor.Key.ENTER);
  }

  isSearchFieldPresent() {
    return this.getSearchInput().isPresent();
  }

  areSearchResultsPresent() {
    return this.getResults().isPresent();
  }

  waitForSearchResults() {
    return util.wait(this.getResults);
  }

  clickSupportLink() {
    return this.getSupportLink().click()
  }

  clickMobileToggle() {
    return this.getMobileToggleIcons().click()
  }

  hoverSupportLink() {
    browser.actions().mouseMove(this.getSupportNav().get(0)).perform();
  }

  isSupportMenuDisplayed() {
    return this.getMenuElements().get(1).isDisplayed();
  }
}

module.exports = NavPage;
