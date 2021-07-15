'use strict';

const util = require('../shared/util');
const baseUrl = (!process.env.BASE_URL) ? 'http://localhost:8080' : process.env.BASE_URL;
const WAIT_TIMEOUT_MILLISECONDS_DEFAULT = 30 * 1000;

class BasePage {
  constructor(relativeURL, pageLoadElement) {
    this.setPageLoadElement(pageLoadElement);
    if (relativeURL) {
      this.url = baseUrl + relativeURL;
    } else {
      this.url = baseUrl;
    }
    browser.waitForAngularEnabled(false);
  }

  setPageLoadElement(element) {
    if (element) {
      this.$pageLoadElement = element;
    } else {
      this.$pageLoadElement = null;
    }
  }

  load(relativeUrl, pageLoadElement) {
    browser.waitForAngularEnabled(false);
    if (relativeUrl) {
      this.url = baseUrl + relativeUrl;
    }
    browser.get(this.url);
    if (pageLoadElement) {
      this.setPageLoadElement(pageLoadElement);
    }
    return this.waitForPageLoad();
  }

  waitForPageLoad() {
    return util.wait(this.$pageLoadElement, WAIT_TIMEOUT_MILLISECONDS_DEFAULT);
  }

  waitForPresence(elem, timeoutMilliseconds) {
    if (timeoutMilliseconds === undefined) {
      return util.wait(elem, WAIT_TIMEOUT_MILLISECONDS_DEFAULT);
    } else {
      return util.wait(elem, timeoutMilliseconds);
    }
  }

  setWindowSize(width, height) {
    browser.driver.manage().window().setSize(width, height);
  }

  waitUntilOnScreen(elementFinder, timeoutMilliseconds) {
    if (timeoutMilliseconds === undefined) {
      browser.wait(util.isOnScreen(elementFinder), WAIT_TIMEOUT_MILLISECONDS_DEFAULT);
    } else {
      browser.wait(util.isOnScreen(elementFinder), timeoutMilliseconds);
    }
  }

  waitUntilOffScreen(elementFinder, timeoutMilliseconds) {
    if (timeoutMilliseconds === undefined) {
      browser.wait(util.EC.not(util.isOnScreen(elementFinder)), WAIT_TIMEOUT_MILLISECONDS_DEFAULT);
    } else {
      browser.wait(util.EC.not(util.isOnScreen(elementFinder)), timeoutMilliseconds);
    }
  }

  getElementsText(elements) {
    return elements.reduce(function (textArray, element) {
      return element.getText().then(text => {
        return textArray.concat(text);
      });
    }, []);
  }

  getVisibleElements(elements) {
    return elements.filter(element => {
      return element.getText().then(text => {
          return element.isDisplayed();
      })
    });
  }

  elementsContainText(elements, expectedTextArray) {
    if (!Array.isArray(expectedTextArray)) {
      expectedTextArray = [expectedTextArray];
    }
    return elements.filter((element, index) => {
        return element.getText().then(text => expectedTextArray.indexOf(text) > -1);
    }).then(function (elementList) {
        return elementList.length == expectedTextArray.length;
    });
  }

  urlContains(str) {
    return util.EC.urlContains(str)();
  }

  getCurrentURL() {
    return browser.getCurrentUrl().then(url => url.replace(baseUrl, ''));
  }

  // These are values used in css for managing different browser sizes -
  // 'xx-small': 480px,
  // 'x-small': 600px,
  // 'small': 768px,
  // 'medium': 1024px,
  // 'large': 1200px,
  // 'x-large': 1400px,
  // 'xx-large': 1600px
  // setSize() calls fail on headless chrome due to chromedriver issue
  resizeMedium() {
    if (!process.env.CHROME_HEADLESS) {
      browser.driver.manage().window().setSize(1024, 640);
    }
  }

  resizeXXsmall() {
    if (!process.env.CHROME_HEADLESS) {
      browser.driver.manage().window().setSize(480, 640);
    }
  }

  resizeXLarge() {
    if (!process.env.CHROME_HEADLESS) {
      browser.driver.manage().window().setSize(1400, 840);
    }
  }

  hasElements(elements) {
    return elements.then(element => element.length > 0);
  }

  refresh() {
    /*
     * Do not use `browser.refresh()` since it assumes the page uses Angular (we don't).
     * Instead, directly use the WebDriver wrapper via `browser.driver.navigate().refresh()`.
     * Source: https://www.protractortest.org/#/api?view=ProtractorBrowser.prototype.refresh
     */
    return browser.driver.navigate().refresh();
  }

  async smartClick(element) {
    const ref = await element.getAttribute('href');
    if (ref == null) {
      element.click();
    } else {
      browser.get(ref);
    }
  }

  getInPageLink(hash) {
    return element(by.css(`a[href='${hash}']:not(.header-anchor)`));
  }

  getOnThisPageItem(hash) {
    const onThisPageSidebarSelector = '.on-this-page-navigation';
    return element(by.css(`${onThisPageSidebarSelector} a[href="${hash}"]`));
  }

  getHeading(selector) {
    return element(by.css(selector));
  }


}
module.exports = BasePage;
