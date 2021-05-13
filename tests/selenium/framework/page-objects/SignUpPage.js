'use strict';

const { example } = require('joi');
const { element, by } = require('protractor');
const BasePage = require('./BasePage');

const headerSelector = '.signup';
const emailFieldId = 'email';
const firstNameFieldId = 'firstName';
const lastNameFieldId = 'lastName';
const countryFieldId = 'country';
const signupWithGoogleButtonId = 'continue-google';
const signupWithGithubButtonId = 'continue-github';
const signUpByEmailButtonId = 'submitbutton';
const signInLinkText = 'Sign in';
const oieLinkText = 'Learn more about Identity engine';
const redirectUrl = '/signup';
const oieRedirectUrl = '/signup/oie.html';
const captchaIFrameXpath = "//*[@for='recaptcha']/div/div/div/iframe";
const dialogContainerClass = '.dialog-container';
const dialogTermsConditionsHeader = `${dialogContainerClass} .dialog--header`
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

  isOieLinkPresent() {
    return this.getOieLinkElement().isPresent();
  }

  isCaptchaPresent() {
    return this.getCaptchaIframeElement().isPresent();
  }

  isStateSelectionPresent() {
    return this.getStateSelectionElement().isPresent();
  }

  isDialogWindowPresent() {
    return this.getDialogWindow().isPresent();
  }

  navigate() {
    const pageLoadElement = SignUpPage.getPageLoadElement();
    this.load(redirectUrl, pageLoadElement);
    this.waitForPresence(pageLoadElement);
  }

  navigateToOie() {
    const pageLoadElement = SignUpPage.getPageLoadElement();
    this.load(oieRedirectUrl, pageLoadElement);
    this.waitForPresence(pageLoadElement);
  }

  static getPageLoadElement() {
    return element(by.css(headerSelector));
  }

  getDialogWindow() {
    return element(by.css(dialogContainerClass));
  }

  getDialogWindowHeader() {
    return element(by.css(dialogTermsConditionsHeader));
  }

  getGithubSignUpButtonElement() {
    return element(by.id(signupWithGithubButtonId));
  }

  getGoogleSignUpButtonElement() {
    return element(by.id(signupWithGoogleButtonId));
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

  getOieLinkElement() {
    return element(by.linkText(oieLinkText));
  }
}

module.exports = SignUpPage;
