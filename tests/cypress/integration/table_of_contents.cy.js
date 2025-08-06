'use strict';

import { TableOfContentsPage } from '../page-objects/TableOfContentsPage';

describe('table of contents navigation spec', () => {
  const tocPage = new TableOfContentsPage();

  beforeEach(() => {
    tocPage.resizeXLarge();  // At smaller sizes, table of contents is hidden
    tocPage.visit('/test_page/');
    tocPage.pageReload();
  });

  it('clicking hash link scrolls to location', () => {
    tocPage.getLastSectionHeading().should('be.not.inViewport');
    tocPage.getLastSectionHeading().click();

    tocPage.getLastSectionHeading().should('be.inViewport');
  });

  it(
    "should scroll to h5 header but displays it parent h3 as active item in onthispage sidebar",
    () => {
      const hash = "#post-operation";
      const h5HeadingId = 'aliquet-metus';
      const routerLinkActiveClass = "router-link-active";

      tocPage.visit("/test_page");

      tocPage.getH5HeadingById(h5HeadingId).then($h5 => {
        const h5Position = $h5.position();
        cy.scrollTo(0, h5Position.top - 60);
      });

      tocPage.getOnThisPageItem(hash).should('have.class', routerLinkActiveClass);
    })
});
