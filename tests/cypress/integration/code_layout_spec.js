import { CodePage } from "../page-objects/CodePage";

describe('code page spec (java/spring/)', () => {
  const codePage = new CodePage();

  beforeEach(() => {
    codePage.visit('/code/java/spring/');
    codePage.pageReload();
  });

  it('has a quick start guide and sample app', () => {
    codePage.getSampleAppLink().should('exist');
  });
});

describe('code page spec (dotnet)', () => {
  const codePage = new CodePage();

  beforeEach(() => {
    codePage.visit('/code/dotnet/aspnetcore/');
    codePage.pageReload();
  });

  it("has 'How-to Guide' and 'Sample App' buttons", () => {
    codePage.getSimpleAppButton().should('exist');
    codePage.getHowToGuide().should('exist');
  });
});
