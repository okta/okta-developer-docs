const QuickStartsPage = require('../framework/page-objects/QuickStartsPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('quickstarts page default selections spec', () => {

  const quickstartsPage = new QuickStartsPage('/quickstart/');

  beforeEach(util.itHelper(async () => {
    await quickstartsPage.navigate('/documentation/');
    await quickstartsPage.refresh();
  }));

  it('redirects to /docs/guides if no hash is provided', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain("/docs/guides/");
  }));

  it('redirects to /docs/guides if has does not have a mapping', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/invalid/hash/provided');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain("/docs/guides/");
  }));

  it('redirects to correct guide', util.itHelper(async () => {
    await quickstartsPage.navigate('/quickstart/#/okta-sign-in-page/nodejs/express');
    await quickstartsPage.refresh();
    expect(await quickstartsPage.getCurrentURL())
      .to.contain("/docs/guides/sign-into-web-app/nodeexpress/before-you-begin/");
  }));

});
