'use strict';

const TextPage = require('../framework/page-objects/TextPage');
const DocsPage = require('../framework/page-objects/DocsPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
const { browser } = require('protractor');
const { DriverProvider } = require('protractor/built/driverProviders');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('content section', () => {
  const page = new TextPage('/test_page/');
  const docsPage = new DocsPage('/docs');

  xit('displays heading corresponding to URL hash', util.itHelper(async () => {
    page.navigate('/test_page/#last-section');
    page.refresh();
    const id = '#first-section';
    try {
      const inPageLink = await page.getInPageLink(id).getWebElement();
      let heading = page.getHeading(`h2${id}`).getWebElement();
      expect(await util.isInViewport(heading), 'heading is not expected to be visible before in-page link click').to.equal(false);
      inPageLink.click();
      heading = page.getHeading(id).getWebElement();
      expect(await util.isInViewport(heading), 'heading is not visible').to.equal(true);
    } catch(err) {
      throw err;
    }
  }));

  it('preserves correct scroll-to-heading behavior on page change', util.itHelper(async () => {
    docsPage.navigate('/docs/reference/api/groups');
    const id = "#factor-lifecycle-operations";
    try {
      const treeNavLink = await (await docsPage.getTreeNavLink('Factors')).getWebElement();
      console.log('Navigated to factors')
      await console.log('Treenavlink', treeNavLink)
      await browser.sleep(10000)
      await treeNavLink.click();
      console.log('Clicked on tree nav')

      await docsPage.waitForPresence(await docsPage.getHeading(`h2${id}`), 2000)
      console.log('Awaited element by id')
      let heading = await docsPage.getHeading(`h2${id}`).getWebElement();
      console.log('Heading recieved')
      expect(await util.isInViewport(heading), 'heading is not expected to be visible before in-page link click').to.equal(false);
      const inPageLink = await docsPage.getInPageLink(id).getWebElement();
      inPageLink.click();
      heading = await docsPage.getHeading(`h2${id}`).getWebElement();
      expect(await util.isInViewport(heading), 'heading is not visible').to.equal(true);
    } catch(err) {
      throw err;
    }
  }));

  xit('navigates to previous anchor via back button', util.itHelper(async () => {
    page.navigate('/test_page/#last-section');
    page.refresh();
    try {
      await (page.getInPageLink('#first-section').getWebElement()).click();
      browser.navigate().back();
      const heading = await page.getHeading('#last-section').getWebElement();
      expect(await util.isInViewport(heading), 'heading is not visible').to.equal(true);
    } catch(err) {
      throw err;
    }
  }));
});
