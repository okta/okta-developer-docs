
import { BasePage } from '../page-objects/BasePage';

describe('quickstarts page default selections spec', () => {

  const basePage = new BasePage();

  beforeEach(() => {
    basePage.visit('/');
    basePage.pageReload();
  });

  it('redirects to /docs/guides if no hash is provided', () => {
    basePage.visit('/quickstart/');

    basePage.pageReload();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/docs/guides/');
    });
  });

  it('redirects to /docs/guides if has does not have a mapping', () => {
    basePage.visit('/quickstart/#/invalid/hash/provided');

    basePage.pageReload();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/docs/guides/');
    });
  });

  // it('redirects to correct guide', () => {
  //   basePage.visit('/quickstart/#/okta-sign-in-page/nodejs/express');

  //   basePage.pageReload();

  //   cy.location().should(location => {
  //     expect(location.pathname).to.eq('/docs/guides/sign-into-web-app-redirect/nodeexpress/before-you-begin/');
  //   });
  // });

});
