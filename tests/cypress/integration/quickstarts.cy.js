
import { BasePage } from '../page-objects/BasePage';

describe('quickstarts page default selections spec', () => {

  const basePage = new BasePage();

  beforeEach(() => {
    basePage.visit('/');
  });

  it('redirects to /docs/guides if no hash is provided', () => {
    basePage.visit('/quickstart/');

    cy.location().should(location => {
      expect(location.pathname).to.eq('/docs/guides/');
    });
  });

  it('redirects to /docs/guides if has does not have a mapping', () => {
    basePage.visit('/quickstart/#/invalid/hash/provided');

    cy.location().should(location => {
      expect(location.pathname).to.eq('/docs/guides/');
    });
  });

});
