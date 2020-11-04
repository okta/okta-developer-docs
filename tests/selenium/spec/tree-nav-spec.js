'use strict';

const DocsPage = require('../framework/page-objects/DocsPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('tree nav panel(left section)', () => {
    const docsPage = new DocsPage('/docs');
    const activeLinkClass = 'router-link-exact-active';
  
    beforeEach(util.itHelper(async () => {
      docsPage.navigate('/docs')
      docsPage.resizeXLarge();
      docsPage.refresh();
    }));

    it('scrolls to selected item on URL navigation', util.itHelper(async () => {
      docsPage.navigate('/docs/reference/api/user-types');
      const selectedItemTitle = 'User Types';
      try {
        const webElement = await (await docsPage.getTreeNavLink(selectedItemTitle)).getWebElement();
        expect(await util.isInViewport(webElement)).to.equal(true);
        expect(await webElement.getAttribute('class')).to.contain(activeLinkClass);
      } catch(err) {
        throw err;
      }
    }));

    describe('in mobile vieports', () => {
      beforeEach(util.itHelper(async () => {
        docsPage.navigate('/docs/concepts')
        docsPage.resizeXXsmall();
        docsPage.refresh();
      }));
      util.itNoHeadless("can be toggled via Breadcrumbs' 'Show Contents' link", util.itHelper(async () => {
        try {
          expect(await docsPage.isTreeNavVisible()).to.equal(false);
          await docsPage.toggleTreeNavMobile();
          expect(await docsPage.isTreeNavVisible()).to.equal(true);
          await docsPage.toggleTreeNavMobile();
          expect(await docsPage.isTreeNavVisible()).to.equal(false);
          await docsPage.toggleTreeNavMobile();
          let treeNavLink = await docsPage.getTreeNavLink('Authentication');
          await treeNavLink.click();
          expect(await docsPage.isTreeNavVisible()).to.equal(false);
          treeNavLink = await (await docsPage.getTreeNavLink('Authentication')).getWebElement();
          expect(await treeNavLink.getAttribute('class')).to.contain(activeLinkClass);
        } catch (err) {
          throw err;
        }
      }));
    })
  });
