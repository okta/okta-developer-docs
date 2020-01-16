'use strict';

const BasePage = require('./BasePage');

const rowSelector = '.Row';

// page with text we're examining
class TextPage extends BasePage {
  constructor(url) {
    super(url, TextPage.getPageLoadElement());
  }

  navigate(url, pageLoadElement) {
    if (pageLoadElement) {
      this.load(url, pageLoadElement);
    } else {
      this.load(url, TextPage.getPageLoadElement());
    }
  }

  static getPageLoadElement() {
    return element(by.css(rowSelector));
  }

  replacementExamples() { 
    return element.all(by.css('#replacement-examples ~ p'));
  }

  async containsWidgetVersionAfter(text) { 
    const sectionText = await this.getElementsText(element.all(by.css('#replacement-examples ~ p')));
    // Note: This will not work if text involves characters meaningful to RegExp
    return !!sectionText.join('').match(new RegExp(`${text}\\d+\\.\\d+\\.\\d+`));
  }
}

module.exports = TextPage;
