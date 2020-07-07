const CodePage = require('../framework/page-objects/CodePage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('code page spec (java/spring/)', () => {
  const codePage = new CodePage('/code/java/spring/');

  beforeEach(util.itHelper(async () => {
    await codePage.navigate('/code/java/spring/');
    await codePage.refresh();
  }));

  it('has a quick start guide and sample app', util.itHelper(async () => {
    expect(await codePage.hasSampleApp(), 'expects Sample App element to be present').to.be.true;
    expect(await codePage.hasCreateAccountButton(), 'expects Create Account button to be present').to.be.true;
  }));
});
