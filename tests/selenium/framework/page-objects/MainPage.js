'use strict';

const BasePage = require('./BasePage');

const headerSelector = '.redesign';
const signUpButtonSelector = '.sign-up--button';
const signInLinkXpath = "//*[text()='Sign in to Okta']";
const oktaMainPageLinkXpath = "//*[text()='Okta.com']";
const pricingLinkXpath = "//*[text()='Pricing']";
const communityLinkXpath = "//*[text()='Community']";

class MainPage extends BasePage {
  constructor() {
    super('/', MainPage.getPageLoadElement());
  }

  isSignupButtonPresent() {
    return this.getSignUpButtonElement().isPresent();
  }

  isSignInLinkPresent() {
    return this.getSignInLinkElement().isPresent();
  }

  isOktaMainPageLinkPresent() {
    return this.getOktaMainPageLinkElement().isPresent();
  }

  isPricingLinkPresent() {
    return this.getPricingLinkElement().isPresent();
  }

  isCommunityLinkPresent() {
    return this.getCommunityLinkElement().isPresent();
  }

  navigate(url) {
    const pageLoadElement = MainPage.getPageLoadElement();
    this.load(url, pageLoadElement);
    this.waitForPresence(pageLoadElement);
  }

  static getPageLoadElement() {
    return element(by.css(headerSelector));
  }

  getSignUpButtonElement() {
    return element(by.css(signUpButtonSelector));
  }

  getSignInLinkElement() {
    return element(by.xpath(signInLinkXpath));
  }

  getOktaMainPageLinkElement() {
    return element(by.xpath(oktaMainPageLinkXpath));
  }

  getPricingLinkElement() {
    return element(by.xpath(pricingLinkXpath));
  }

  getCommunityLinkElement() {
    return element(by.xpath(communityLinkXpath));
  }
}

module.exports = MainPage;
