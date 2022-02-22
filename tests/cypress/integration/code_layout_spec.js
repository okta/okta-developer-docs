import { CodePage } from "../page-objects/CodePage";

describe('code page spec (nodejs)', () => {
  const codePage = new CodePage();

  beforeEach(() => {
    codePage.visit('/code/nodejs/');
    codePage.pageReload();
  });

  it('has a quick start guide and sample app', () => {
    codePage.getSampleAppLink().should('exist');
  });
});

describe('code page spec (ios)', () => {
  const codePage = new CodePage();

  beforeEach(() => {
    codePage.visit('/code/ios/');
    codePage.pageReload();
  });

  it("has 'How-to Guide' and 'Sample App' buttons", () => {
    codePage.getSimpleAppButton().should('exist');
    codePage.getHowToGuide().should('exist');
  });
});
