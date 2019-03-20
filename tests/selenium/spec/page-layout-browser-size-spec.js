const NavPage = require('../framework/page-objects/NavPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('page layout and browser size spec', () => {
  const navPage = new NavPage('/test_page/');

  beforeEach(util.itHelper(async () => {
    await navPage.navigate('/test_page/');
    await navPage.refresh();
  }));

  it('shows the main navigation with desktop browser sizes', util.itHelper(async () => {
    await navPage.resizeMedium();

    expect(await navPage.isDesktopNavDisplayed(), 'expects Desktop Nav to be displayed').to.be.true;
    expect(await navPage.isMobileNavDisplayed(), 'expects Mobile Nav to NOT be displayed').to.be.false;

    // Verify that support link dropdown is visible
    expect(await navPage.isSupportMenuDisplayed(), 'expects Support menu NOT to be displayed').to.be.false;
    await navPage.hoverSupportLink();
    expect(await navPage.isSupportMenuDisplayed(), 'expects Support menu to be displayed').to.be.true;
  }));

  // PhantomJS does not support the CSS transform we use to hide the top nav
  // Chrome headless doesn't support window resize
  // util.itNoHeadless('shows mobile navigation with mobile browser sizes', util.itHelper(async () => {
  it('shows mobile navigation with mobile browser sizes', util.itHelper(async () => {
    await navPage.resizeXXsmall();
    expect(await navPage.isMobileToggleIconDisplayed(), 'expects Mobile toggle to be displayed').to.be.true;
    await navPage.clickMobileToggle();
    expect(await navPage.isMobileNavDisplayed(), 'expects Mobile nav to be displayed').to.be.true;
  }));
});
