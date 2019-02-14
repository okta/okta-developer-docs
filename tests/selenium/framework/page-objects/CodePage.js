'use strict';

const BasePage = require('./BasePage');

const rowSelector = '.Row';
const quickStartSelector = 'span';
const quickStartText = 'Spring Quickstart';
const sampleAppSelector = 'span';
const sampleAppText = 'Okta Spring Boot Starter';
const createAccountSelector = 'span';
const createAccountText = 'Create Free Account';
const promoBannerSelector = '.DocsPromoBanner';

class CodePage extends BasePage {
  constructor(url) {
    super(url, CodePage.getPageLoadElement());
  }

  navigate(url, pageLoadElement) {
    if (pageLoadElement) {
      this.load(url, pageLoadElement);
    } else {
      this.load(url, CodePage.getPageLoadElement());
    }
  }

  static getPageLoadElement() {
    return element(by.css(rowSelector));
  }

  getQuickStartElement() {
    return element(by.cssContainingText(quickStartSelector, quickStartText));
  }
  getSampleAppElement() {
    return element(by.cssContainingText(sampleAppSelector, sampleAppText));
  }
  getCreateAccountButton() {
    return element(by.cssContainingText(createAccountSelector, createAccountText));
  }

  getPromoBannerLabels() {
    return element.all(by.css(promoBannerSelector));
  }

  hasQuickStart() {
    return this.getQuickStartElement().isPresent();
  }

  hasSampleApp() {
    return this.getSampleAppElement().isPresent();
  }

  hasCreateAccountButton() {
    return this.getCreateAccountButton().isPresent();
  }

  hasPromoBanner() {
    return this.hasElements(this.getPromoBannerLabels());
  }
}

module.exports = CodePage;
