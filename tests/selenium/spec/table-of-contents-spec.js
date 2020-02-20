'use strict';
const TableOfContentsPage = require('../framework/page-objects/TableOfContentsPage');
const SideBarPage = require('../framework/page-objects/SideBarPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('table of contents navigation spec', () => {
  const tocPage = new TableOfContentsPage('/test_page/');

  beforeEach(util.itHelper(async () => {
    await tocPage.resizeXLarge();  // At smaller sizes, table of contents is hidden
    await tocPage.navigate('/test_page/');
    await tocPage.refresh();
  }));

  it.skip('has basic table of contents in the test page', util.itHelper(async () => {
    expect(await tocPage.getLevelOneItemText(), 'Level one item text').to.equal('Test Page');
    expect(await tocPage.getLevelTwoItemsText(), 'Level two items text').to.include.members([
      'First Section',
      'Second Section',
      'Third Section',
      'Last Section'
    ]);
  }));

  // util.itNoHeadless('has table of contents with multi level items', util.itHelper(async () => {
  //   expect(await tocPage.getLevelThreeVisibleItemsText(), 'Level three visible items').to.not.contain.members([
  //     'Sub Section 1',
  //     'Sub Section 2'
  //   ]);

  //   await tocPage.clickLastSectionLink();
  //   await tocPage.waitForPresence(tocPage.getSubSectionOneLink());
  //   expect(await tocPage.getLevelThreeVisibleItemsText(), 'Level three visible items').to.contain.members([
  //     'Sub Section 1',
  //     'Sub Section 2'
  //   ]);

  //   await tocPage.clickSubSectionOneLink();
  //   await tocPage.waitForPresence(tocPage.getImageSectionLink());
  //   await tocPage.waitForPresence(tocPage.getLinkSectionLink());
  //   expect(await tocPage.getLevelFourVisibleItemsText(), 'Level four visible items').to.contain.members([
  //     'Image Section',
  //     'Link Section'
  //   ]);

  //   expect(await tocPage.isTopOfPageLinkDisplayed(), 'Top of Page link displayed').to.be.true;

  //   await tocPage.goToTopOfPage();
  //   expect(await tocPage.getLevelThreeVisibleItemsText(), 'Level three visible items').to.not.contain.members([
  //     'Sub Section 1',
  //     'Sub Section 2'
  //   ]);
  // }));

  it('clicking hash link scrolls to location', util.itHelper(async () => {
    await tocPage.getLastSectionHeading().getWebElement().then(elem => {
      util.isInViewport(elem).then(inViewport => {
        expect(inViewport, 'Last Section Heading to NOT be in viewport').to.be.false;
      });
    });
    await tocPage.clickLastSectionLink();
    await tocPage.getLastSectionHeading().getWebElement().then(elem => {
      util.isInViewport(elem).then(inViewport => {
        expect(inViewport, 'Last Section Heading to be in viewport').to.be.true;
      });
    });
  }));
});
