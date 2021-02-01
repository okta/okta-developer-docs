'use strict';

const BasePage = require('./BasePage');

const headerSelector = '.login';
const signInWithButtonLinkText = 'SIGN IN WITH EMAIL';
const signInWithGithubLinkText = 'CONTINUE WITH GITHUB';
const signInWithGoogleLinkText = 'CONTINUE WITH GOOGLE';
const signUpLinkText = 'Sign up';
const redirectUrl = '/login';

class SignInPage extends BasePage {
  constructor() {
    super('/', SignInPage.getPageLoadElement());
  }

  isSignUpLinkPresent() {
    return this.getSignUpLinkElement().isPresent();
  }

  isSignInWithEmailButtonPresent() {
    return this.getEmailSignInButtonElement().isPresent();
  }

  isSignInByGithubButtonPresent() {
    return this.getGithubSignInButtonElement().isPresent();
  }

  isSignInByGoogleButtonPresent() {
    return this.getGoogleSignInButtonElement().isPresent();
  }

  navigate() {
    const pageLoadElement = SignInPage.getPageLoadElement();
    this.load(redirectUrl, pageLoadElement);
    this.waitForPresence(pageLoadElement);
  }

  static getPageLoadElement() {
    return element(by.css(headerSelector));
  }

  getEmailSignInButtonElement() {
    return element(by.linkText(signInWithButtonLinkText));
  }

  getGithubSignInButtonElement() {
    return element(by.linkText(signInWithGithubLinkText));
  }

  getGoogleSignInButtonElement() {
    return element(by.linkText(signInWithGoogleLinkText));
  }

  getSignUpLinkElement() {
    return element(by.linkText(signUpLinkText));
  }
}

module.exports = SignInPage;
