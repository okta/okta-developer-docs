const MainPage = require('../framework/page-objects/MainPage');
const util = require('../framework/shared/util');
const { browser, until } = require("protractor");

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('header sanity check', () => {
  const mainPage = new MainPage();

  beforeEach(util.itHelper(async () => {
    await mainPage.navigate();
  }));

  it('validate developer okta main page links', util.itHelper(async () => {
    expect(await mainPage.isSignupButtonPresent(), 'expects signup button to be present on header').to.equal(true);

    expect(await mainPage.isSignInLinkPresent(), 'expects sign-in link to be present on header').to.equal(true);

    expect(await mainPage.isOktaMainPageLinkPresent(), 'expects okta.com link to be present on header').to.equal(true);

    expect(await mainPage.isPricingLinkPresent(), 'expects pricing link to be present on header').to.equal(true);

    expect(await mainPage.isCommunityLinkPresent(), 'expects community link to be present on header').to.equal(true);
  }));


  describe('validate sign up page elements', () => {
    const pricingURL = 'https://www.okta.com/pricing/#customer-identity-products'

    it('sign up button click takes user to sign up page', util.itHelper(async () => {
      await mainPage.getSignUpButtonElement().click();
      expect(await mainPage.getCurrentURL())
        .to.contain("/signup/");
    }));

    it('pricing link click takes user to pricing okta.com page', util.itHelper(async () => {
      await mainPage.getPricingLinkElement().click();
      await browser.wait(
        until.urlContains('https://www.okta.com'),
        2000
      );
      expect(await browser.getCurrentUrl())
        .to.contain(pricingURL);
    }));
  });
});

