'use strict';

const BasePage = require('./BasePage');
const util = require('../shared/util');

const tableOfContentsSelector = '.has-tableOfContents';
const footerSelector = '.Footer';
const h1Selector = 'h1';
const h2Selector = 'h2';
const h3Selector = 'h3';
const linkHeaderSelector = 'h4 a';
const deprecatedLabelSelector = '.api-label-deprecated';
const betaLabelSelector = '.api-label-beta';
const eaLabelSelector = '.api-label-ea';
const corsLabelSelector = '.api-label-cors';
const getLabelSelector = '.api-uri-get';
const postLabelSelector = '.api-uri-post';
const deleteLabelSelector = '.api-uri-delete';
const promoBannerLabelSelector = '.DocsPromoBanner';
const treeNavSelector = '.tree-nav';
const treeNavLinkSelector = '.tree-nav-link';
const showTreeNavSelector = '.crumb-show-contents';


class DocsPage extends BasePage {
  constructor(url) {
    super(url, DocsPage.choosePageLoadElement(url));
  }

  navigate(url, pageLoadElement) {
    if (pageLoadElement) {
      this.load(url, pageLoadElement);
    } else {
      this.load(url, DocsPage.choosePageLoadElement(url));
    }
  }

  static choosePageLoadElement(url) {
    var pageLoadElement;
    if (url === undefined || url.includes('docs')) {
      pageLoadElement = DocsPage.getHomePageLoadElement();
    } else {
      pageLoadElement = DocsPage.getOtherPageLoadElement();
    }
    return pageLoadElement;
  }

  static getHomePageLoadElement() {
    return element(by.css(footerSelector));
  }
  static getOtherPageLoadElement() {
    return element(by.css(tableOfContentsSelector));
  }

  getH1Elements() {
    return element.all(by.css(h1Selector));
  }
  getH2Elements() {
    return element.all(by.css(h2Selector));
  }
  getH3Elements() {
    return element.all(by.css(h3Selector));
  }

  getDeprecatedLabels() {
    return element.all(by.css(deprecatedLabelSelector));
  }
  getBetaLabels() {
    return element.all(by.css(betaLabelSelector));
  }
  getEaLabels() {
    return element.all(by.css(eaLabelSelector));
  }
  getCorsLabels() {
    return element.all(by.css(corsLabelSelector));
  }
  getGetLabels() {
    return element.all(by.css(getLabelSelector));
  }
  getPostLabels() {
    return element.all(by.css(postLabelSelector));
  }
  getDeleteLabels() {
    return element.all(by.css(deleteLabelSelector));
  }
  getPromoBannerLabels() {
    return element.all(by.css(promoBannerLabelSelector));
  }

  hasHeader(str) {
    return EC.or(
      () => this.h1Contains(str),
      () => this.h2Contains(str),
      () => this.h3Contains(str)
    )();
  }

  h1Contains(strs) {
    return this.elementsContainText(this.getH1Elements(), strs);
  }

  h2Contains(strs) {
    return this.elementsContainText(this.getH2Elements(), strs);
  }

  h3Contains(strs) {
    return this.elementsContainText(this.getH3Elements(), strs);
  }

  clickLinkHeader(str) {
    const el = element(by.cssContainingText(linkHeaderSelector, str));
    return el.click();
  }

  hasDeprecatedTags() {
    return this.hasElements(this.getDeprecatedLabels());
  }

  hasBetaTags() {
    return this.hasElements(this.getBetaLabels());
  }

  hasEATags() {
    return this.hasElements(this.getEaLabels());
  }

  hasCORSTags() {
    return this.hasElements(this.getCorsLabels());
  }

  hasGetTags() {
    return this.hasElements(this.getGetLabels());
  }

  hasPostTags() {
    return this.hasElements(this.getPostLabels());
  }

  hasDeleteTags() {
    return this.hasElements(this.getDeleteLabels());
  }

  hasPromoBanner() {
    return this.hasElements(this.getPromoBannerLabels());
  }

  async getTreeNavLink(linkText) {
    await util.wait(element(by.css(treeNavLinkSelector)), 2000);
    return element(by.cssContainingText(treeNavLinkSelector, linkText));
  }

  async toggleTreeNavMobile() {
    const showContentsElement = element(by.css(showTreeNavSelector));
    return await showContentsElement.click();
  }

  async isTreeNavVisible() {
    const treeNavElement = (await element.all(by.css(treeNavSelector)).getWebElements())[0]
    if (treeNavElement) {
      return await util.isInViewport(treeNavElement);
    }
    return false;
  }
}

module.exports = DocsPage;
