import { TreeNavPage } from "../page-objects/TreeNavPage";

describe('tree nav panel(left section)', () => {
    const treeNav = new TreeNavPage();
    const activeLinkClass = 'router-link-active';

    beforeEach(() => {
      treeNav.visit('/');
      treeNav.resizeXLarge();
      // docsPage.refresh();
    });

    it('scrolls to selected item on URL navigation', () => {
      const selectedItemTitle = 'User Types';

      treeNav.visit('/docs/reference/api/user-types');
      const webElement = treeNav.getTreeNavLinkByItemText(selectedItemTitle);

      webElement.should('be.inViewport');
      webElement.parent('a').should('have.class', activeLinkClass);
    });

    describe('in mobile vieports', () => {
      beforeEach(() => {
        treeNav.visit('/docs/concepts')
        treeNav.resizeXXsmall();
      });
      it('can be toggled via Breadcrumbs "Show Contents" link', () => {
        treeNav.getTreeNav().should('be.not.visible');

        treeNav.toggleTreeNavMobile();
        treeNav.getTreeNav().should('be.visible');

        treeNav.toggleTreeNavMobile();
        treeNav.getTreeNav().should('be.not.visible');

        treeNav.toggleTreeNavMobile();
        const treeNavLink = treeNav.getTreeNavLinkByItemText('Authentication');
        treeNavLink.parent('a.tree-nav-link').click();

        treeNav.getTreeNav().should('be.not.visible');
        treeNavLink.parent('a').should('hava.class', activeLinkClass);
      });
    })
  });
