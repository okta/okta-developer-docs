'use strict';

const BasePage = require('./BasePage');

const rowSelector = '.Row';
const quickStartSelector = 'span';
const quickStartText = 'Spring Quickstart';
const howToGuideSelector = 'span';
const howToGuideText = 'How To Guide';
const sampleAppSelector = 'span';
const sampleAppLinkText = 'Okta Spring Boot Starter';
const sampleAppButtonText = 'Sample App';
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

  getHowToGuideButton() {
    return element(by.cssContainingText(howToGuideSelector, howToGuideText));
  }
  getQuickStartElement() {
    return element(by.cssContainingText(quickStartSelector, quickStartText));
  }
  getSampleAppElement() {
    return element(by.cssContainingText(sampleAppSelector, sampleAppLinkText));
  }

  getSampleAppButton() {
    return element(by.cssContainingText(sampleAppSelector, sampleAppButtonText));
  }

  getPromoBannerLabels() {
    return element.all(by.css(promoBannerSelector));
  }

  hasHowToGuide() {
    return this.getHowToGuideButton().isPresent();
  }

  hasQuickStart() {
    return this.getQuickStartElement().isPresent();
  }

  hasSampleAppLink() {
    return this.getSampleAppElement().isPresent();
  }

  hasSampleAppButton() {
    return this.getSampleAppButton().isPresent();
  }

  hasPromoBanner() {
    return this.hasElements(this.getPromoBannerLabels());
  }
}

module.exports = CodePage;
