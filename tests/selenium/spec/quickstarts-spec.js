const QuickStartsPage = require('../framework/page-objects/QuickStartsPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                   *
 *        DO NOT Remove or disable these tests.                      *
 *                                                                   *
 * These URLs are linked to directly from the Developer Dashboard.   *
 *                                                                   *
 * Changing any of the following links will result in broken links:  *
 *   - quickstart/#/android                                          *
 *   - quickstart/#/angular                                          *
 *   - quickstart/#/ios                                              *
 *   - quickstart/#/okta-sign-in-page/java                           *
 *   - quickstart/#/okta-sign-in-page/dotnet                         *
 *   - quickstart/#/okta-sign-in-page/nodejs                         *
 *   - quickstart/#/okta-sign-in-page/php                            *
 *   - quickstart/#/react                                            *
 *                                                                   *
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

describe('quickstarts page default selections spec', () => {

  const quickstartsPage = new QuickStartsPage('/quickstart/');

  beforeEach(util.itHelper(async () => {
    await quickstartsPage.navigate('/documentation/');
    await quickstartsPage.refresh();
  }));

  it('selects okta-sign-in-page + nodejs + express if nothing is specified', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getNodeExpressJsUrlLongFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if invalid client in hash', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/undefined/nodejs/express');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getSigninPageNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if invalid server in hash', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/okta-sign-in-page/undefined/express');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getSigninPageNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if invalid server framework in hash', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/okta-sign-in-page/nodejs/null');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getSigninPageNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if only okta-sign-in-page is in url', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/okta-sign-in-page');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getSigninPageNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if only widget is in url', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/widget');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getWidgetNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Widget',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if only angular is in url', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/angular');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getAngularNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Angular',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if only React is in url', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/react');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getReactNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'React',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if only Vue is in url', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/vue');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getVueNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Vue',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if only Android is in url', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/android');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getAndroidNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Android',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if only iOS is in url', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/ios');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getIosNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'iOS',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects okta-sign-in-page + nodejs + express if only React Native is in url', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/react-native');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getReactNativeNodeExpressFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'React Native',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects spring if only java is specified', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/okta-sign-in-page/java');
    await quickstartsPage.refresh();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getJavaSpringUrlLongFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      'Java',
      'Spring'
    ]);
  }));

  it('selects express if only node is specified', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/okta-sign-in-page/nodejs');
    await quickstartsPage.refresh();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getNodeExpressJsUrlLongFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('selects ASP.NET Core if only dotnet is specified', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/okta-sign-in-page/dotnet');
    await quickstartsPage.refresh();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getDotNetAspCoreUrlLongFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      '.NET',
      'ASP.NET Core'
    ]);
  }));

});

describe('quickstarts page navigation spec', () => {
  const quickstartsPage = new QuickStartsPage('/quickstart/');

  beforeEach(util.itHelper(async () => {
    await quickstartsPage.resizeMedium();
    await quickstartsPage.load();
    await quickstartsPage.refresh();
  }));

  it('can toggle to client and server setup via right-side nav', util.itHelper(async () => {
    await quickstartsPage.resizeXLarge();
    await quickstartsPage.waitUntilOnScreen(quickstartsPage.getSkipToServerSetupLink());
    await quickstartsPage.selectServerSetupLink();
    await quickstartsPage.waitUntilOnScreen(quickstartsPage.getNodeJsServerLink());
    await quickstartsPage.selectClientSetupLink();
  }));

  it('can select sign-in (hosted) client setup', util.itHelper(async () => {
    await quickstartsPage.selectHostedLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getSignInPageUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Page',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('can select sign-in widget client setup', util.itHelper(async () => {
    await quickstartsPage.selectSignInWidgetLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getSignInWidgetUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Okta Sign-In Widget',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('can select angular client setup', util.itHelper(async () => {
    await quickstartsPage.selectAngularClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getAngularUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Angular',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('can select react client setup', util.itHelper(async () => {
    await quickstartsPage.selectReactClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getReactUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'React',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('can select vue client setup', util.itHelper(async () => {
    await quickstartsPage.selectVueClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getVueUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Vue',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('can select android client setup', util.itHelper(async () => {
    await quickstartsPage.selectAndroidClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getAndroidUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Android',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('can select ios client setup', util.itHelper(async () => {
    await quickstartsPage.selectIosClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getIosUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'iOS',
      'Node JS',
      'Express.js'
    ]);
  }));

  it('can select react native client setup', util.itHelper(async () => {
    await quickstartsPage.selectReactNativeClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getReactNativeUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'React Native',
      'Node JS',
      'Express.js'
    ]);
  }));

});

describe('quickstarts basic server navigation spec', () => {
  const quickstartsPage = new QuickStartsPage('/quickstart/');

  beforeEach(util.itHelper(async () => {
    await quickstartsPage.resizeMedium();
    await quickstartsPage.load();
  }));

  util.itNoHeadless('can select node server setup', util.itHelper(async () => {
    await quickstartsPage.selectNodeJsServerLink();
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getNodeExpressJsUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Node JS',
      'Express.js'
    ]);
  }));

  util.itNoHeadless('can select java server setup', util.itHelper(async () => {
    await quickstartsPage.selectJavaServerLink();
    await quickstartsPage.refresh();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getJavaSpringUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'Java',
      'Spring'
    ]);
  }));

  util.itNoHeadless('can select php server setup', util.itHelper(async () => {
    await quickstartsPage.selectPhpServerLink();
    await quickstartsPage.refresh();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getPhpGenericUrlFragment());
    expect(await quickstartsPage.getActiveLinkText())
      .to.include.members([
      'PHP',
      'Generic PHP'
    ]);
  }));

});

describe('quickstarts server and framework navigation spec', () => {
  const quickstartsPage = new QuickStartsPage('/quickstart/');

  beforeEach(util.itHelper(async () => {
    await quickstartsPage.resizeMedium();
    await quickstartsPage.load();
    await quickstartsPage.refresh();
  }));

  it('shows & selects node server setup', util.itHelper(async () => {
    await quickstartsPage.selectNodeJsServerLink();
    expect(await quickstartsPage.getFrameworkLinkText())
      .to.include.members([
      'Generic Node',
      'Express.js'
    ]);
  }));

  it('shows & selects node frameworks server setup', util.itHelper(async () => {
    await quickstartsPage.selectNodeJsServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectExpressJsNodeServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getNodeExpressJsUrlFragment());

    await quickstartsPage.selectGenericNodeServerLink();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getNodeGenericUrlFragment());

  }));


  it('shows & selects java server setup', util.itHelper(async () => {
    await quickstartsPage.selectJavaServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getFrameworkLinkText())
      .to.include.members([
      'Generic Java',
      'Spring'
    ]);
  }));

  it('shows & selects java frameworks server setup', util.itHelper(async () => {
    await quickstartsPage.selectJavaServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectSpringJavaServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getJavaSpringUrlFragment());

    await quickstartsPage.selectGenericJavaServerLink();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getJavaGenericUrlFragment());

  }));

  it('shows & selects php server setup', util.itHelper(async () => {
    await quickstartsPage.selectPhpServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getFrameworkLinkText())
      .to.include.members([
      'Generic PHP',
    ]);
  }));

  it('shows & selects php frameworks server setup', util.itHelper(async () => {
    await quickstartsPage.selectPhpServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectGenericPhpServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getPhpGenericUrlFragment());
  }));

  it('shows & selects dotnet server setup', util.itHelper(async () => {
    await quickstartsPage.selectDotNetServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getFrameworkLinkText())
      .to.include.members([
      'ASP.NET Core',
      'ASP.NET 4.x'
    ]);
  }));

  it('shows & selects dotnet frameworks server setup', util.itHelper(async () => {
    await quickstartsPage.selectDotNetServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectAspDotNetCoreServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getDotNetAspCoreUrlFragment());

    await quickstartsPage.selectAspDotNetFourServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getCurrentURL())
      .to.contain(QuickStartsPage.getDotNetAspFourUrlFragment());

  }));

  it('retains the combination selected on refresh', util.itHelper(async () => {
    await quickstartsPage.selectJavaServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getFrameworkLinkText())
      .to.include.members([
      'Generic Java',
      'Spring'
    ]);

    await quickstartsPage.refresh();

    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.getFrameworkLinkText())
      .to.include.members([
      'Generic Java',
      'Spring'
    ]);

  }));

});

describe('quickstart page content spec', () => {

  const quickstartsPage = new QuickStartsPage('/quickstart/');

  beforeEach(util.itHelper(async () => {
    await quickstartsPage.resizeMedium();
    await quickstartsPage.load();
  }));

  it('should load the sign-in page content when I click Sign-In Page', util.itHelper(async () => {
    await quickstartsPage.selectHostedLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.isShowingSignInPageContent(),
      'Sign-in Page content not found').to.be.true;
  }));

  it('should load the sign-in widget content when I click Sign-In Widget', util.itHelper(async () => {
    await quickstartsPage.selectSignInWidgetLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.isShowingSignInWidgetContent(),
      'Sign-in Widget content not found').to.be.true;
  }));

  it('should load the Angular content when I click Angular', util.itHelper(async () => {
    await quickstartsPage.selectAngularClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.isShowingAngularContent(),
      'Angular content not found').to.be.true;
  }));

  it('should load the React content when I click React', util.itHelper(async () => {
    await quickstartsPage.selectReactClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.isShowingReactContent(),
      'React content not found').to.be.true;
  }));

  it('should load the Vue content when I click Vue', util.itHelper(async () => {
    await quickstartsPage.selectVueClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.isShowingVueContent(),
      'Vue content not found').to.be.true;
  }));

  it('should load the Android content when I click Android', util.itHelper(async () => {
    await quickstartsPage.selectAndroidClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.isShowingAndroidContent(),
      'Android content not found').to.be.true;
  }));

  xit('should load the iOS content when I click iOS', util.itHelper(async () => {
    await quickstartsPage.selectIosClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.isShowingIosContent(),
      'iOS content not found').to.be.true;
  }));

  it('should load the React Native content when I click React Native', util.itHelper(async () => {
    await quickstartsPage.selectReactNativeClientLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getClientContent());
    expect(await quickstartsPage.isShowingReactNativeContent(),
      'React Native content not found').to.be.true;
  }));


  it('should load the Node/Express content when I click Node/Express', util.itHelper(async () => {
    await quickstartsPage.selectNodeJsServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectExpressJsNodeServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.isShowingNodeExpressJsContent(),
      'Node/Express content not found').to.be.true;
  }));

  it('should load the Node/Generic content when I click Node/Generic', util.itHelper(async () => {
    await quickstartsPage.selectNodeJsServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectGenericNodeServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.isShowingNodeGenericContent(),
      'Node/Generic content not found').to.be.true;
  }));

  it('should load the Java/Spring content when I click Java/Spring', util.itHelper(async () => {
    await quickstartsPage.selectJavaServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectSpringJavaServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.isShowingJavaSpringContent(),
      'Java/Spring content not found').to.be.true;
  }));

  it('should load the Java/Generic content when I click Java/Generic', util.itHelper(async () => {
    await quickstartsPage.selectJavaServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectGenericJavaServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.isShowingJavaGenericContent(),
      'Java/Generic content not found').to.be.true;
  }));

  it('should load the .NET/ASP Core content when I click .NET/ASP Core', util.itHelper(async () => {
    await quickstartsPage.selectDotNetServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectAspDotNetCoreServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.isShowingDotNetAspCoreContent(),
      '.NET/ASP Core content not found').to.be.true;
  }));

  it('should load the .NET/ASP 4 content when I click .NET/ASP 4', util.itHelper(async () => {
    await quickstartsPage.selectDotNetServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    await quickstartsPage.selectAspDotNetFourServerLink();
    await quickstartsPage.waitForPresence(quickstartsPage.getServerContent());
    expect(await quickstartsPage.isShowingDotNetAspFourContent(),
      '.NET/ASP 4 content not found').to.be.true;
  }));

});
