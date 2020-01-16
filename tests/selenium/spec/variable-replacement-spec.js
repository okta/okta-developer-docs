const TextPage = require('../framework/page-objects/TextPage');
const util = require('../framework/shared/util');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('text variable replacement', () => {
  const page = new TextPage('/test_page/');

  beforeEach(util.itHelper(async () => {
    await page.navigate('/test_page/');
    await page.refresh();
  }));
  
  it('replaces text', util.itHelper(async () => {
    expect(await page.elementsContainText(page.replacementExamples(), 'Simple replace: this is a test replacement'), 'expects a simple text replacement').to.be.true;
    expect(await page.elementsContainText(page.replacementExamples(), 'Many per line: this is a test replacementthis is a test replacement this is a test replacement'), 'expects multiple replacements per line').to.be.true;
    expect(await page.elementsContainText(page.replacementExamples(), 'With symbols: -this is a test replacement-'), 'expects replacements adjacent to symbols').to.be.true;
    expect(await page.elementsContainText(page.replacementExamples(), 'in code blocks: this is a test replacement'), 'expects replacements inside code blocks').to.be.true;
  }));

  it('replaces the widget version text', util.itHelper(async () => {
    expect(await page.containsWidgetVersionAfter('widget version: ')).to.be.true;
  }));

});
