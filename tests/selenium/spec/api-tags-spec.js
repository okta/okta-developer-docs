const DocsPage = require('../framework/page-objects/DocsPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('API tags check spec', () => {
  const docsPage = new DocsPage('/docs/');

  it('shows the Beta lifecycle tags', util.itHelper(async () => {
    await docsPage.navigate(util.fixUrl('/docs/reference/api/policy'));
    expect(await docsPage.hasBetaTags(), 'expects Beta tag to be present on page').to.be.true;
  }));

  it('shows the Early Access lifecycle tags', util.itHelper(async () => {
    await docsPage.navigate(util.fixUrl('/docs/reference/api/users'));
    expect(await docsPage.hasEATags(), 'expects EA tag to be present on page').to.be.true;
  }));

  it('shows the Deprecated lifecycle tags', util.itHelper(async () => {
    await docsPage.navigate(util.fixUrl('/docs/reference/api/sessions'));
    expect(await docsPage.hasDeprecatedTags(), 'expects Deprecated tag to be present on page').to.be.true;
  }));

  it('shows the CORS tags', util.itHelper (async () => {
    await docsPage.navigate(util.fixUrl('/docs/reference/api/sessions'));
    expect(await docsPage.hasCORSTags(), 'expects CORS tag to be present on page').to.be.true;
  }));

  it('shows the API URI GET tags', util.itHelper(async () => {
    await docsPage.navigate(util.fixUrl('/docs/reference/api/sessions'));
    expect(await docsPage.hasGetTags(), 'expects GET tag to be present on page').to.be.true;
  }));

  it('shows the API URI POST tags', util.itHelper(async () => {
    await docsPage.navigate(util.fixUrl('/docs/reference/api/sessions'));
    expect(await docsPage.hasPostTags(), 'expects POST tag to be present on page').to.be.true;
  }));

  it('shows the API URI DELETE tags', util.itHelper(async () => {
    await docsPage.navigate(util.fixUrl('/docs/reference/api/sessions'));
    expect(await docsPage.hasDeleteTags(), 'expects DELETE tag to be present on page').to.be.true;
  }));
});
