'use strict';

const BasePage = require('./BasePage');

const sideBarSelector = '.Sidebar';
const sideBarNavsSelector = '.Sidebar-nav';
const footerSelector = '.Footer';

const authReferenceLinkText = 'Sign in Your Users';
const apiReferenceLinkText = 'Manage Okta Resources';

const sideBarReferencesSelector = '#Sidebar_References li.is-active';
const sideBarResourcesSelector = '#Sidebar_Resources li.is-active';

const authReferenceUrl = '/docs/api/resources/oidc';
const apiReferenceUrl = '/docs/api/resources/roles';

class SideBarPage extends BasePage {
  constructor(url) {
    super(url, SideBarPage.getPageLoadElement());
  }

  navigate(url, pageLoadElement) {
    if (pageLoadElement) {
      this.load(url, pageLoadElement);
    } else {
      this.load(url, SideBarPage.getPageLoadElement());
    }
  }

  static getPageLoadElement() {
    return element(by.css(sideBarSelector));
  }

  getFooter() {
    return element(by.css(footerSelector));
  }

  getSideBarNavs() {
    return element.all(by.css(sideBarNavsSelector));
  }
  getUseCasesNav() {
    return this.getSideBarNavs().get(0);
  }
  getReferencesNav() {
    return this.getSideBarNavs().get(1);
  }
  getStandardsNav() {
    return this.getSideBarNavs().get(2);
  }

  getAuthReferenceLink() {
    return element(by.linkText(authReferenceLinkText));
  }

  getApiReferenceLink() {
    return element(by.linkText(apiReferenceLinkText));
  }

  getSideBarReferences() {
    return element.all(by.css(sideBarReferencesSelector));
  }

  getSideBarResources() {
    return element.all(by.css(sideBarResourcesSelector));
  }


  async clickAuthenticationReferenceLink() {
    this.smartClick(await this.getAuthReferenceLink());
  }

  async clickApiReferenceLink() {
    this.smartClick(await this.getApiReferenceLink());
  }

  getUseCaseLinkCount() {
    return this.getUseCasesNav().all(by.tagName('li')).count();
  }
  getReferencesLinkCount() {
    return this.getReferencesNav().all(by.tagName('li')).count();
  }
  getStandardsLinkCount() {
    return this.getStandardsNav().all(by.tagName('li')).count();
  }
  getAuthReferenceLinkCount() {
    return this.getSideBarReferences().count();
  }
  getApiReferenceLinkCount() {
    return this.getSideBarResources().count();
  }

  static getAuthReferenceUrl() {
    return authReferenceUrl;
  }
  static getApiReferenceUrl() {
    return apiReferenceUrl;
  }

}

module.exports = SideBarPage;
