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
const redirectUrl = '/signup';
const captchaIFrameXpath = "//*[@for='recaptcha']/div/div/div/iframe";
const agreeCheckboxDivCss = ".consent--section-agree";
const stateSelectionId = "state";

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
    return this.getCountryFieldElement().isPresent();
  }

  isSignUpByEmailButtonPresent() {
    return this.getSignUpByEmailButtonElement().isPresent();
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

  isCaptchaPresent() {
    return this.getCaptchaIframeElement().isPresent();
  }

  isStateSelectionPresent() {
    return this.getStateSelectionElement().isPresent();
  }

  navigate() {
    const pageLoadElement = SignUpPage.getPageLoadElement();
    this.load(redirectUrl, pageLoadElement);
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

  getSignUpByEmailButtonElement() {
    return element(by.id(signUpByEmailButtonId));
  }

  getCountryFieldElement() {
    return element(by.id(countryFieldId));
  }

  getCaptchaIframeElement() {
    return element(by.xpath(captchaIFrameXpath));
  }

  getAgreeCheckboxElement() {
    return element(by.css(agreeCheckboxDivCss));
  }

  getStateSelectionElement() {
    return element(by.id(stateSelectionId));
  }

  getSignInLinkElement() {
    return element(by.linkText(signInLinkText));
  }
}

module.exports = SignUpPage;
