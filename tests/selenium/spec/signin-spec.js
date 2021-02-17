const SignInPage = require("../framework/page-objects/SignInPage");
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Sign in page check spec', () => {
  const signInPage = new SignInPage();

  beforeEach(util.itHelper(async () => {
    await signInPage.navigate();
  }));

  it('shows all the buttons', util.itHelper(async () => {
    expect(await signInPage.isSignInWithEmailButtonPresent(), 'expects login with email button to be present').to.equal(true);

    expect(await signInPage.isSignInByGithubButtonPresent(), 'expects login with github button to be present').to.equal(true);

    expect(await signInPage.isSignInByGoogleButtonPresent(), 'expects login with google button to be present').to.equal(true);

    expect(await signInPage.isSignUpLinkPresent(), 'expects sign up link to be present').to.equal(true);
  }));

  describe('verify button clicks', () => {

    it('sign in with email button click takes user to okta login', util.itHelper(async () => {
      await signInPage.getEmailSignInButtonElement().click();
      expect(await signInPage.getCurrentURL())
        .to.contain("login.okta.com");
    }));

    it('sign in with github button click takes user to github', util.itHelper(async () => {
      await signInPage.getGithubSignInButtonElement().click();
      expect(await signInPage.getCurrentURL())
        .to.contain("github.com");
    }));

    it('sign in with google button click takes user to google', util.itHelper(async () => {
      await signInPage.getGoogleSignInButtonElement().click();
      expect(await signInPage.getCurrentURL())
        .to.contain("accounts.google.com");
    }));

    it('sign up link click takes user to login page', util.itHelper(async () => {
      await signInPage.getSignUpLinkElement().click();
      expect(await signInPage.getCurrentURL())
        .to.contain("signup");
    }));

  });

  describe('verify button text', () => {

    it('email sign in button text verification', util.itHelper(async () => {
      await signInPage.getEmailSignInButtonElement().getText().then((text) => {
        expect(text, 'button text does not match').to.equal("SIGN IN WITH EMAIL");
      });
    }));

    it('github sign in button text verification', util.itHelper(async () => {
      await signInPage.getGithubSignInButtonElement().getText().then((text) => {
        expect(text, 'button text does not match').to.equal("CONTINUE WITH GITHUB");
      });
    }));

    it('google sign in button text verification', util.itHelper(async () => {
      await signInPage.getGoogleSignInButtonElement().getText().then((text) => {
        expect(text, 'button text does not match').to.equal("CONTINUE WITH GOOGLE");
      });
    }));
  });
});
