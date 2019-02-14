'use strict';

const BasePage = require('./BasePage');

const tableOfContentsSelector = '.TableOfContents';
const level1ItemSelector = '.TableOfContents-item.is-level1';
const level2ItemsSelector = '.TableOfContents-item.is-level2';
const level3ItemsSelector = '.TableOfContents-item.is-level3';
const level4ItemsSelector = '.TableOfContents-item.is-level4';

const topOfPageLinkText = 'Top of Page';
const subSectionOneLinkText = 'Sub Section 1';
const lastSectionLinkText = 'Last Section';
const imageSectionLinkText = 'Image Section';
const linkSectionLinkText = 'Link Section';

class TableOfContentsPage extends BasePage {
  constructor(url) {
    super(url, TableOfContentsPage.getPageLoadElement());
  }

  navigate(url, pageLoadElement) {
    if (pageLoadElement) {
      this.load(url, pageLoadElement);
    } else {
      this.load(url, TableOfContentsPage.getPageLoadElement());
    }
  }

  static getPageLoadElement() {
    return element(by.css(tableOfContentsSelector));
  }

  getLevelOneItem() {
    return element(by.css(level1ItemSelector));
  }
  getLevelTwoItems() {
    return element.all(by.css(level2ItemsSelector));
  }
  getLevelThreeItems() {
    return element.all(by.css(level3ItemsSelector));
  }
  getLevelFourItems() {
    return element.all(by.css(level4ItemsSelector));
  }

  getTopOfPageLink() {
    return element(by.linkText(topOfPageLinkText));
  }
  getSubSectionOneLink() {
    return element(by.linkText(subSectionOneLinkText));
  }
  getLastSectionLink() {
    return element.all(by.linkText(lastSectionLinkText));
  }
  getImageSectionLink() {
    return element(by.linkText(imageSectionLinkText));
  }
  getLinkSectionLink() {
    return element(by.linkText(linkSectionLinkText));
  }

  getLevelOneItemText() {
    return this.getLevelOneItem().getText();
  }
  getLevelTwoItemsText() {
    return this.getElementsText(this.getLevelTwoItems());
  }
  getLevelThreeVisibleItemsText() {
    return this.getElementsText(this.getVisibleElements(this.getLevelThreeItems()));
  }
  getLevelFourVisibleItemsText() {
    return this.getElementsText(this.getVisibleElements(this.getLevelFourItems()));
  }

  isTopOfPageLinkDisplayed() {
    return this.getTopOfPageLink().isDisplayed();
  }

  goToTopOfPage() {
    return this.getTopOfPageLink().click();
  }
  clickSubSectionOneLink() {
    return this.getSubSectionOneLink().click();
  }
  clickLastSectionLink() {
    return this.getLastSectionLink().get(0).click();
  }

}

module.exports = TableOfContentsPage;
