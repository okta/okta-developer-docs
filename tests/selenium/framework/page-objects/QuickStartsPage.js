'use strict';

const BasePage = require('./BasePage');

const clientSelectorId = 'client-selector';
const footerSelector = '.Footer';
const formSearchId = 'form_search';
const skipToServerSetupLinkText = 'Skip to server setup';

const clientSetupLinkId = 'client_setup_link';
const cleintContentId = 'client_content';
const hostedLinkText = 'Okta Sign-In Page';
const signInWidgetLinkText = 'Okta Sign-In Widget';
const angularClientLinkText = 'Angular';
const reactClientLinkText = 'React';
const vueClientLinkText = 'Vue';
const androidClientLinkText = 'Android';
const iosClientLinkText = 'iOS';
const reactNativeClientLinkText = 'React Native';

const serverSetupLinkId = 'server_setup_link';
const serverContentId = 'server_content';
const nodeJsServerLinkText = 'Node JS';
const expressJsNodeServerLinkText = 'Express.js';
const genericNodeServerLinkText = 'Generic Node';
const javaServerLinkText = 'Java';
const springJavaServerLinkText = 'Spring';
const genericJavaServerLinkText = 'Generic Java';
const phpServerLinkText = 'PHP';
const genericPhpServerLinkText = 'Generic PHP';
const dotNetServerLinkText = '.NET';
const aspDotNetCoreServerLinkText = 'ASP.NET Core';
const aspDotNetFourServerLinkText = 'ASP.NET 4.x';

const activeLinksClass = '.active';
const frameworkLinksSelector = '#framework-selector a';

const signInPageContentHeaderId = 'okta-sign-in-page-quickstart';
const signInWidgetContentHeaderId = 'okta-sign-in-widget-quickstart';
const angularContentHeaderId = 'okta-angular-quickstart';
const reactContentHeaderId = 'okta-react-quickstart';
const vueContentHeaderId = 'okta-vuejs-quickstart';
const androidContentHeaderId = 'okta-android-quickstart';
const iosContentHeaderId = 'okta-ios-quickstart';
const reactNativeContentHeaderId = 'okta-react-native-quickstart';

const nodeExpressJsContentHeaderId = 'okta-nodejsexpressjs-quickstart';
const nodeGenericContentHeaderId = 'okta-nodejs-quickstart';
const javaSpringContentHeaderId = 'okta-javaspring-quickstart';
const javaGenericContentHeaderId = 'okta-java-quickstart';
const phpGenericContentHeaderId = 'okta-php-quickstart';
const dotNetAspCoreContentHeaderId = 'okta-aspnet-core-mvc-quickstart';
const dotNetAspFourContentHeaderId = 'okta-aspnet-4x-quickstart';

const signInPageUrlFragment = '/okta-sign-in-page';
const signInWidgetUrlFragment = '/widget';
const angularUrlFragment = '/angular';
const reactUrlFragment = '/react';
const vueUrlFragment = '/vue';
const androidUrlFragment = '/android';
const iosUrlFragment = '/ios';
const reactNativeUrlFragment = '/react-native';

const nodeExpressJsUrlFragment = '/nodejs/express';
const nodeGenericUrlFragemnt = '/nodejs/generic';
const javaSpringUrlFragment = '/java/spring';
const javaGenericUrlFragment = '/java/generic';
const phpGenericUrlFragment = '/php/generic';
const dotNetAspCoreUrlFragment = '/dotnet/aspnetcore';
const dotNetAspFourUrlFragment = '/dotnet/aspnet4';

const nodeExpressJsUrlLongFragment = 'okta-sign-in-page/nodejs/express';
const javaSpringUrlLongFragment = 'okta-sign-in-page/java/spring';
const dotNetAspCoreUrlLongFragment = 'okta-sign-in-page/dotnet/aspnetcore';

class QuickStartsPage extends BasePage {
  constructor(url) {
    super(url, QuickStartsPage.getPageLoadElement());
  }

  navigate(url, pageLoadElement) {
    if (pageLoadElement) {
      this.load(url, pageLoadElement);
    } else {
      this.load(url, QuickStartsPage.getPageLoadElement());
    }
  }

  static getPageLoadElement() {
    return element(by.css(footerSelector));
  }
  getFormSearch() {
    return element(by.id(formSearchId));
  }
  getSkipToServerSetupLink() {
    return element(by.linkText(skipToServerSetupLinkText));
  }

  getClientSetupLink() {
    return element(by.id(clientSetupLinkId));
  }
  getClientContent() {
    return element(by.id(cleintContentId));
  }
  getHostedLink() {
    return element(by.linkText(hostedLinkText));
  }
  getSignInWidgetLink() {
    return element(by.linkText(signInWidgetLinkText));
  }
  getAngularClientLink() {
    return element(by.linkText(angularClientLinkText));
  }
  getReactClientLink() {
    return element(by.linkText(reactClientLinkText));
  }
  getVueClientLink() {
    return element(by.linkText(vueClientLinkText));
  }
  getAndroidClientLink() {
    return element(by.linkText(androidClientLinkText));
  }
  getIosClientLink() {
    return element(by.linkText(iosClientLinkText));
  }
  getReactNativeClientLink() {
    return element(by.linkText(reactNativeClientLinkText));
  }

  getServerSetupLink() {
    return element(by.id(serverSetupLinkId));
  }
  getServerContent() {
    return element(by.id(serverContentId));
  }
  getNodeJsServerLink() {
    return element(by.linkText(nodeJsServerLinkText));
  }
  getExpressJsNodeServerLinkText() {
    return element(by.linkText(expressJsNodeServerLinkText));
  }
  getGenericNodeServerLink() {
    return element(by.linkText(genericNodeServerLinkText));
  }
  getJavaServerLink() {
    return element(by.linkText(javaServerLinkText));
  }
  getSpringJavaServerLink() {
    return element(by.linkText(springJavaServerLinkText));
  }
  getGenericJavaServerLink() {
    return element(by.linkText(genericJavaServerLinkText));
  }
  getPhpServerLink() {
    return element(by.linkText(phpServerLinkText));
  }
  getGenericPhpServerLink() {
    return element(by.linkText(genericPhpServerLinkText));
  }
  getDotNetServerLink() {
    return element(by.linkText(dotNetServerLinkText));
  }
  getAspDotNetCoreServerLink() {
    return element(by.linkText(aspDotNetCoreServerLinkText));
  }
  getAspDotNetFourServerLink() {
    return element(by.linkText(aspDotNetFourServerLinkText));
  }

  getActiveLinks() {
    return element.all(by.css(activeLinksClass));
  }
  async getActiveLinkText() {
    return await this.getElementsText(this.getActiveLinks());
  }
  getFrameworkLinks() {
    return element.all(by.css(frameworkLinksSelector));
  }
  async getFrameworkLinkText() {
    return await this.getElementsText(this.getFrameworkLinks());
  }

  getSignInPageContentHeader() {
    return element(by.id(signInPageContentHeaderId));
  }
  getSignInWidgetContentHeader() {
    return element(by.id(signInWidgetContentHeaderId));
  }
  getAngularContentHeader() {
    return element(by.id(angularContentHeaderId));
  }
  getReactContentHeader() {
    return element(by.id(reactContentHeaderId));
  }
  getVueContentHeader() {
    return element(by.id(vueContentHeaderId));
  }
  getAndroidContentHeader() {
    return element(by.id(androidContentHeaderId));
  }
  getIosContentHeader() {
    return element(by.id(iosContentHeaderId));
  }
  getReactNativeContentHeader() {
    return element(by.id(reactNativeContentHeaderId));
  }

  getNodeExpressJsContentHeader() {
    return element(by.id(nodeExpressJsContentHeaderId));
  }
  getNodeGenericContentHeader() {
    return element(by.id(nodeGenericContentHeaderId));
  }
  getJavaSpringContentHeader() {
    return element(by.id(javaSpringContentHeaderId));
  }
  getJavaGenericContentHeader() {
    return element(by.id(javaGenericContentHeaderId));
  }
  getPhpGenericContentHeader() {
    return element(by.id(phpGenericContentHeaderId));
  }
  getDotNetAspCoreContentHeader() {
    return element(by.id(dotNetAspCoreContentHeaderId));
  }
  getDotNetAspFourContentHeader() {
    return element(by.id(dotNetAspFourContentHeaderId));
  }

  static getSignInPageUrlFragment() {
    return signInPageUrlFragment;
  }
  static getSignInWidgetUrlFragment() {
    return signInWidgetUrlFragment;
  }
  static getAngularUrlFragment() {
    return angularUrlFragment;
  }
  static getReactUrlFragment() {
    return reactUrlFragment;
  }
  static getVueUrlFragment() {
    return vueUrlFragment;
  }
  static getAndroidUrlFragment() {
    return androidUrlFragment;
  }
  static getIosUrlFragment() {
    return iosUrlFragment;
  }
  static getReactNativeUrlFragment() {
    return reactNativeUrlFragment;
  }

  static getNodeExpressJsUrlFragment() {
    return nodeExpressJsUrlFragment;
  }
  static getNodeGenericUrlFragment() {
    return nodeGenericUrlFragemnt;
  }
  static getJavaSpringUrlFragment() {
    return javaSpringUrlFragment;
  }
  static getJavaGenericUrlFragment() {
    return javaGenericUrlFragment;
  }
  static getPhpGenericUrlFragment() {
    return phpGenericUrlFragment;
  }
  static getDotNetAspCoreUrlFragment() {
    return dotNetAspCoreUrlFragment;
  }
  static getDotNetAspFourUrlFragment() {
    return dotNetAspFourUrlFragment;
  }

  static getNodeExpressJsUrlLongFragment() {
    return nodeExpressJsUrlLongFragment;
  }
  static getJavaSpringUrlLongFragment() {
    return javaSpringUrlLongFragment;
  }
  static getDotNetAspCoreUrlLongFragment() {
    return dotNetAspCoreUrlLongFragment;
  }

  activeLinksContain(links) {
    return this.elementsContainText(this.getActiveLinks(), links);
  }
  frameworkLinksContain(links) {
    return this.elementsContainText(this.getFrameworkLinks(), links);
  }

  selectClientSetupLink() {
    return this.getClientSetupLink().click();
  }
  selectHostedLink(){
    return this.getHostedLink().click();
  }
  selectSignInWidgetLink() {
    return this.getSignInWidgetLink().click();
  }
  selectAngularClientLink() {
    return this.getAngularClientLink().click();
  }
  selectReactClientLink() {
    return this.getReactClientLink().click();
  }
  selectVueClientLink() {
    return this.getVueClientLink().click();
  }
  selectAndroidClientLink() {
    return this.getAndroidClientLink().click();
  }
  selectIosClientLink() {
    return this.getIosClientLink().click();
  }
  selectReactNativeClientLink() {
    return this.getReactNativeClientLink().click()
  }

  selectServerSetupLink() {
    return this.getServerSetupLink().click();
  }
  selectNodeJsServerLink() {
    return this.getNodeJsServerLink().click();
  }
  selectExpressJsNodeServerLink() {
    this.waitForPresence(this.getNodeJsServerLink());
    return this.getExpressJsNodeServerLinkText().click();
  }
  selectGenericNodeServerLink() {
    this.waitForPresence(this.getNodeJsServerLink());
    return this.getGenericNodeServerLink().click();
  }
  selectJavaServerLink() {
    return this.getJavaServerLink().click();
  }
  selectSpringJavaServerLink() {
    this.waitForPresence(this.getSpringJavaServerLink());
    return this.getSpringJavaServerLink().click();
  }
  selectGenericJavaServerLink() {
    this.waitForPresence(this.getJavaServerLink());
    return this.getGenericJavaServerLink().click();
  }
  selectPhpServerLink() {
    return this.getPhpServerLink().click();
  }
  selectGenericPhpServerLink() {
    return this.getGenericPhpServerLink().click();
  }
  selectDotNetServerLink() {
    return this.getDotNetServerLink().click();
  }
  selectAspDotNetCoreServerLink() {
    this.waitForPresence(this.getDotNetServerLink());
    return this.getAspDotNetCoreServerLink().click();
  }
  selectAspDotNetFourServerLink() {
    this.waitForPresence(this.getDotNetServerLink());
    return this.getAspDotNetFourServerLink().click();
  }

  isShowingSignInPageContent() {
    this.waitForPresence(this.getSignInPageContentHeader());
    return this.getSignInPageContentHeader().isPresent();
  }
  isShowingSignInWidgetContent() {
    this.waitForPresence(this.getSignInWidgetContentHeader());
    return this.getSignInWidgetContentHeader().isPresent();
  }
  isShowingAngularContent() {
    this.waitForPresence(this.getAngularContentHeader());
    return this.getAngularContentHeader().isPresent();
  }
  isShowingReactContent() {
    this.waitForPresence(this.getReactContentHeader());
    return this.getReactContentHeader().isPresent();
  }
  isShowingVueContent() {
    this.waitForPresence(this.getVueContentHeader());
    return this.getVueContentHeader().isPresent();
  }
  isShowingAndroidContent() {
    this.waitForPresence(this.getAndroidContentHeader());
    return this.getAndroidContentHeader().isPresent();
  }
  isShowingIosContent() {
    this.waitForPresence(this.getIosContentHeader());
    return this.getIosContentHeader().isPresent();
  }
  isShowingReactNativeContent() {
    this.waitForPresence(this.getReactNativeContentHeader());
    return this.getReactNativeContentHeader().isPresent();
  }

  isShowingNodeExpressJsContent() {
    this.waitForPresence(this.getNodeExpressJsContentHeader());
    return this.getNodeExpressJsContentHeader().isPresent();
  }
  isShowingNodeGenericContent() {
    this.waitForPresence(this.getNodeGenericContentHeader());
    return this.getNodeGenericContentHeader().isPresent();
  }
  isShowingJavaSpringContent() {
    this.waitForPresence(this.getJavaSpringContentHeader());
    return this.getJavaSpringContentHeader().isPresent();
  }
  isShowingJavaGenericContent() {
    this.waitForPresence(this.getJavaGenericContentHeader());
    return this.getJavaGenericContentHeader().isPresent();
  }
  isShowingPhpGenericContent() {
    this.waitForPresence(this.getPhpGenericContentHeader());
    return this.getPhpGenericContentHeader().isPresent();
  }
  isShowingDotNetAspCoreContent() {
    this.waitForPresence(this.getDotNetAspCoreContentHeader());
    return this.getDotNetAspCoreContentHeader().isPresent();
  }
  isShowingDotNetAspFourContent() {
    this.waitForPresence(this.getDotNetAspFourContentHeader());
    return this.getDotNetAspFourContentHeader().isPresent();
  }

}
module.exports = QuickStartsPage;
