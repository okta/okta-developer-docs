'use strict';

const DocsPage = require('../framework/page-objects/DocsPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('tree nav panel(left section)', () => {
    const docsPage = new DocsPage('/docs');
  
    beforeEach(util.itHelper(async () => {
      docsPage.navigate('/docs')
      docsPage.resizeXLarge();
      docsPage.refresh();
    }));

    it('scrolls to selected item on URL navigation', util.itHelper(async () => {
      docsPage.navigate('/docs/reference/api/user-types');
      const selectedItemTitle = 'User Types';
      const expectedLinkClass = 'router-link-exact-active';
      try {
        const webElement = await (await docsPage.getTreeNavLink(selectedItemTitle)).getWebElement();
        expect(await util.isInViewport(webElement)).to.equal(true);
        expect(await webElement.getAttribute('class')).to.contain(expectedLinkClass);
      } catch(err) {
        throw err;
      }
    }));
  });