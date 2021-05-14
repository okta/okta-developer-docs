const SignUpPage = require("../framework/page-objects/SignUpPage");
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Sign up page check spec', () => {
  const signUpPage = new SignUpPage();

  beforeEach(util.itHelper(async () => {
    await signUpPage.navigateToOie();
  }));

  it('shows all the fields and button', util.itHelper(async () => {
    expect(await signUpPage.isEmailFieldPresent(), 'expects email field to be present').to.equal(true);

    expect(await signUpPage.isFirstNameFieldPresent(), 'expects first name field to be present').to.equal(true);

    expect(await signUpPage.isLastNameFieldPresent(), 'expects last name field to be present').to.equal(true);

    expect(await signUpPage.isCountryFieldPresent(), 'expects country field to be present').to.equal(true);

    expect(await signUpPage.isSignUpByEmailButtonPresent(), 'expects signup button to be present').to.equal(true);

    expect(await signUpPage.isSignUpByGithubButtonPresent(), 'expects signup with github button to be present').to.equal(false);

    expect(await signUpPage.isSignUpByGoogleButtonPresent(), 'expects signup with google button to be present').to.equal(false);

    expect(await signUpPage.isSignInLinkPresent(), 'expects sign in link to be present').to.equal(true);

    expect(await signUpPage.isCaptchaPresent(), 'expects captcha to be present').to.equal(true);

  }));

  it('shows agree checkbox for Canada', util.itHelper(async () => {
    await signUpPage.getCountryFieldElement().sendKeys("Canada");
    expect(await signUpPage.getAgreeCheckboxElement().getAttribute('style'), 
     'expects I Agree checkbox to be present')
        .to.equal('');
  }));


  it('shows Province selection for Canada', util.itHelper(async () => {
    await signUpPage.getCountryFieldElement().sendKeys("Canada");
    expect(await signUpPage.isStateSelectionPresent(),
        'expects state selection to be present')
            .to.equal(true);
  }));


  it('shows State selection for United States', util.itHelper(async () => {
    await signUpPage.getCountryFieldElement().sendKeys("United States");
    expect(await signUpPage.isStateSelectionPresent(),
     'expects state selection to be present')
        .to.equal(true);
  }));

  it('does not shows State selection for Albania', util.itHelper(async () => {
    await signUpPage.getCountryFieldElement().sendKeys("Albania");
    expect(await signUpPage.isStateSelectionPresent(), 
     'does not expect state selection to be present')
        .to.equal(false);
  }));


  it('does not shows agree checkbox for United States', util.itHelper(async () => {
    await signUpPage.getCountryFieldElement().sendKeys("United States");
    expect(await signUpPage.getAgreeCheckboxElement().getAttribute('style'), 
     'does not expect I Agree checkbox to be present')
        .to.equal('display: none;');
  }));

  describe('verify button clicks and texts', () => {

    beforeEach(util.itHelper(async () => {
        await signUpPage.navigateToOie();
      }));

    it('sign in link click takes user to login page', util.itHelper(async () => {
      await signUpPage.getSignInLinkElement().click();
      expect(await signUpPage.getCurrentURL())
        .to.contain("login");
    }));

  });

});
