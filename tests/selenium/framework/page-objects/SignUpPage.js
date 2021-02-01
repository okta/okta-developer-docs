'use strict';

const BasePage = require('./BasePage');

const headerSelector = '.signup';
const emailFieldId = 'email';
const firstNameFieldId = 'firstName';
const lastNameFieldId = 'lastName';
const countryFieldId = 'country';
const signUpByEmailButtonId = 'signup';
const signUpWithGitHubButtonText = 'CONTINUE WITH GITHUB';
const signUpWithGoogleButtonText = 'CONTINUE WITH GOOGLE';
const signInLinkText = 'Sign in';

class SignUpPage extends BasePage {
  constructor() {
    super('/', SignUpPage.getPageLoadElement());
  }

  isEmailFieldPresent() {
    return element(by.id(emailFieldId)).isPresent();
  }

  isFirstNameFieldPresent() {
    return element(by.id(firstNameFieldId)).isPresent();
  }

  isLastNameFieldPresent() {
    return element(by.id(lastNameFieldId)).isPresent();
  }

  isCountryFieldPresent() {
    return element(by.id(countryFieldId)).isPresent();
  }

  isSignUpByEmailButtonPresent() {
    return element(by.id(signUpByEmailButtonId)).isPresent();
  }

  isSignUpByGithubButtonPresent() {
    return this.getGithubSignUpButtonElement().isPresent();
  }

  isSignUpByGoogleButtonPresent() {
    return this.getGoogleSignUpButtonElement().isPresent();
  }

  isSignInLinkPresent() {
    return this.getSignInLinkElement().isPresent();
  }

  navigate(url) {
    const pageLoadElement = SignUpPage.getPageLoadElement();
    this.load(url, pageLoadElement);
    this.waitForPresence(pageLoadElement);
  }

  static getPageLoadElement() {
    return element(by.css(headerSelector));
  }

  getGithubSignUpButtonElement() {
    return element(by.linkText(signUpWithGitHubButtonText));
  }

  getGoogleSignUpButtonElement() {
    return element(by.linkText(signUpWithGoogleButtonText));
  }

  getSignInLinkElement() {
    return element(by.linkText(signInLinkText));
  }
}

module.exports = SignUpPage;
