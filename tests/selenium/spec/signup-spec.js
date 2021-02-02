const SignUpPage = require("../framework/page-objects/SignUpPage");
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Sign up page check spec', () => {
  const signUpPage = new SignUpPage();

  beforeEach(util.itHelper(async () => {
    await signUpPage.navigate();
  }));

  it('shows all the fields and button', util.itHelper(async () => {
    expect(await signUpPage.isEmailFieldPresent(), 'expects email field to be present').to.equal(true);

    expect(await signUpPage.isFirstNameFieldPresent(), 'expects first name field to be present').to.equal(true);

    expect(await signUpPage.isLastNameFieldPresent(), 'expects last name field to be present').to.equal(true);

    expect(await signUpPage.isCountryFieldPresent(), 'expects country field to be present').to.equal(true);

    expect(await signUpPage.isSignUpByEmailButtonPresent(), 'expects signup button to be present').to.equal(true);

    expect(await signUpPage.isSignUpByGithubButtonPresent(), 'expects signup with github button to be present').to.equal(true);

    expect(await signUpPage.isSignUpByGoogleButtonPresent(), 'expects signup with google button to be present').to.equal(true);

    expect(await signUpPage.isSignInLinkPresent(), 'expects sign in link to be present').to.equal(true);

    expect(await signUpPage.isCaptchaPresent(), 'expects captcha to be present').to.equal(true);

  }));

  describe('verify button clicks', () => {

    it('sign up with github button click takes user to github', util.itHelper(async () => {
      await signUpPage.getGithubSignUpButtonElement().click();
      expect(await signUpPage.getCurrentURL())
        .to.contain("github.com/login");
    }));

    it('sign up with google button click takes user to google', util.itHelper(async () => {
      await signUpPage.getGoogleSignUpButtonElement().click();
      expect(await signUpPage.getCurrentURL())
        .to.contain("accounts.google.com");
    }));

    it('sign in link click takes user to login page', util.itHelper(async () => {
      await signUpPage.getSignInLinkElement().click();
      expect(await signUpPage.getCurrentURL())
        .to.contain("login");
    }));

  });

  describe('verify button text', () => {

    it('email signup button text verification', util.itHelper(async () => {
      expect(await signUpPage.getSignUpByEmailButtonElement().getAttribute('value'), 'button text does not match').to.equal("sign up");
    }));

    it('github signup button text verification', util.itHelper(async () => {
      await signUpPage.getGithubSignUpButtonElement().getText().then((text) => {
        expect(text, 'button text does not match').to.equal("CONTINUE WITH GITHUB");
      });
    }));

    it('google signup button text verification', util.itHelper(async () => {
      await signUpPage.getGoogleSignUpButtonElement().getText().then((text) => {
        expect(text, 'button text does not match').to.equal("CONTINUE WITH GOOGLE");
      });
    }));
  });
});
