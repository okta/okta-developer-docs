"use strict";

const TextPage = require("../framework/page-objects/TextPage");
const DocsPage = require("../framework/page-objects/DocsPage");
const util = require("../framework/shared/util");

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
const { browser, until } = require("protractor");

chai.use(chaiAsPromised);
var expect = chai.expect;

describe("content section", () => {
  const page = new TextPage("/test_page/");
  const docsPage = new DocsPage("/docs");

  it('displays heading corresponding to URL hash', util.itHelper(async () => {
    page.navigate('/test_page/#last-section');
    page.refresh();
    const id = '#first-section';
    try {
      const inPageLink = await page.getInPageLink(`/test_page/${id}`).getWebElement();
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
      treeNavLink.click();
      await docsPage.waitForPresence(await docsPage.getHeading(`h2${id}`), 2000)
      let heading = await docsPage.getHeading(`h2${id}`).getWebElement();
      expect(await util.isInViewport(heading), 'heading is not expected to be visible before in-page link click').to.equal(false);
      const inPageLink = await docsPage.getInPageLink(`/docs/reference/api/factors/${id}`).getWebElement();
      inPageLink.click();
      heading = await docsPage.getHeading(`h2${id}`).getWebElement();
      expect(await util.isInViewport(heading), 'heading is not visible').to.equal(true);
    } catch(err) {
      throw err;
    }
  }));

  it('navigates to previous anchor via back button', util.itHelper(async () => {
    page.navigate('/test_page/');
    page.refresh();
    try {
      await (page.getInPageLink('/test_page/#third-section').getWebElement()).click();
      browser.navigate().back();
      const heading = await page.getHeading('#second-section').getWebElement();
      expect(await util.isInViewport(heading), 'heading is not visible').to.equal(true);
    } catch(err) {
      throw err;
    }
  }));

  it(
    "should scroll to h5 header but displays it parent h3 as active item in onthispage sidebar",
    util.itHelper(async () => {
      const hash = "#post-operation";
      const ulId = "#submenu_third-section";
      const routerLinkActiveClass = "router-link-active";
      page.navigate("/test_page");

      try {
        const aliquetMetusCoords = await element(
          by.css(`#aliquet-metus`)
        ).getLocation();

        await browser.driver.executeScript(
          `window.scrollTo(0, ${aliquetMetusCoords.y - 60})`
        );
        await browser.wait(
          until.elementIsVisible(
            element(
              by.css(`.on-this-page-navigation ul${ulId}`)
            ).getWebElement()
          ),
          2000
        );

        const postOperationWebEl = await (
          await page.getOnThisPageItem(hash)
        ).getWebElement();

        expect(
          await postOperationWebEl.getAttribute("class"),
          "proper onthispage item not active"
        ).to.contain(routerLinkActiveClass);
      } catch (err) {
        throw err;
      }
    })
  );
});
