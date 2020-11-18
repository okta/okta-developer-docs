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
    expect(await codePage.hasSampleAppLink(), 'expects Sample App element to be present').to.be.true;
  }));

  it('has a quick start guide and sample app', util.itHelper(async () => {
    expect(await codePage.hasSampleAppLink(), 'expects Sample App element to be present').to.be.true;
  }));
});

describe('code page spec (dotnet)', () => {
  const codePage = new CodePage('/code/dotnet/');

  beforeEach(util.itHelper(async () => {
    await codePage.navigate('/code/dotnet/aspnetcore/');
    await codePage.refresh();
  }));

  it("has 'How-to Guide' and 'Sample App' buttons", util.itHelper(async () => {
    expect(await codePage.hasSampleAppButton(), 'expects Sample App button to be present').to.be.true;
    expect(await codePage.hasHowToGuide(), 'expects How-to Guide button to be present').to.be.true;
  }));
});
