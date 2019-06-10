'use strict';
const SideBarPage = require('../framework/page-objects/SideBarPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

// Currently only tests pre-Guides sidebar
const pageWithSideBarUrl = '/docs/api/resources/apps';

describe('sidebar navigation spec', () => {
  const sideBarPage = new SideBarPage(util.fixUrl(pageWithSideBarUrl));

  beforeEach(util.itHelper(async () => {
    await sideBarPage.resizeXLarge(); // At smaller sizes, sidebar navigation is hidden
    await sideBarPage.navigate(util.fixUrl(pageWithSideBarUrl));
    await sideBarPage.refresh();
  }));

  it('has links in side navigation', util.itHelper(async () => {
    await sideBarPage.waitForPresence(await sideBarPage.getUseCasesNav());
    // We check if each section has at least 1 link. We can enhance this in the future to check for a specific number of links
    expect(await sideBarPage.getUseCaseLinkCount(), 'expects Use Case Link count to be > 0').to.be.greaterThan(0);
    expect(await sideBarPage.getReferencesLinkCount(), 'expects References Link count to be > 0').to.be.greaterThan(0);
    expect(await sideBarPage.getStandardsLinkCount(), 'expects Standards Link count to be > 0').to.be.greaterThan(0);
  }));

  it('contains Authentication Reference sub-links on reference side navigation', util.itHelper(async () => {
    // Sub-links are shown when the user clicks on the main link on the side bar
    await sideBarPage.clickAuthenticationReferenceLink();
    await sideBarPage.waitForPresence(await sideBarPage.getSideBarReferences().get(0));
    expect(await sideBarPage.getCurrentURL()).to.equal(util.fixUrl(SideBarPage.getAuthReferenceUrl()));
    expect(await sideBarPage.getAuthReferenceLinkCount(), 'expects Auth Reference Link count to be > 0').to.be.greaterThan(0);
    expect(await sideBarPage.getApiReferenceLinkCount(), 'expects API Reference Link count to be = 0').to.be.equal(0);
  }));

  it('contains API Reference sub-links on reference side navigation', util.itHelper(async () => {
    await sideBarPage.clickApiReferenceLink();
    await sideBarPage.waitForPresence(await sideBarPage.getSideBarResources().get(0));
    expect(await sideBarPage.getCurrentURL()).to.equal(util.fixUrl(SideBarPage.getApiReferenceUrl()));
    expect(await sideBarPage.getAuthReferenceLinkCount(), 'expects Auth Reference Link count to be = 0').to.be.equal(0);
    expect(await sideBarPage.getApiReferenceLinkCount(), 'expects API Reference Link count to be > 0').to.be.greaterThan(0);
  }));
});
