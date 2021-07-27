import { TreeNavPage } from "../page-objects/TreeNavPage";

describe("tree nav panel(left section)", () => {
  const treeNav = new TreeNavPage();
  const activeLinkClass = "router-link-active";

  beforeEach(() => {
    treeNav.visit("/");
    treeNav.resizeXLarge();
    treeNav.pageReload();
  });

  it("scrolls to selected item on URL navigation", () => {
    const selectedItemTitle = "User Types";

    treeNav.visit("/docs/reference/api/user-types");
    treeNav
      .getTreeNavLinkByItemText(selectedItemTitle)
      .parent("a")
      .should("have.class", activeLinkClass);
    treeNav.getTreeNavLinkByItemText(selectedItemTitle).should("be.inViewport");
  });

  describe("in mobile vieports", () => {
    beforeEach(() => {
      treeNav.visit("/docs/concepts");
      treeNav.resizeXXsmall();
    });
    it('can be toggled via Breadcrumbs "Show Contents" link', () => {
      treeNav.getTreeNav().should("be.not.visible");

      treeNav.toggleTreeNavMobile();
      treeNav.getTreeNav().should("be.visible");

      treeNav.toggleTreeNavMobile();
      treeNav.getTreeNav().should("be.not.visible");

      treeNav.toggleTreeNavMobile();
      // treeNav.getTreeNavLinkByItemText("Authentication").then($treeNavLink => {
      //   $treeNavLink.parent("a.tree-nav-link").click();
      //   expect($treeNavLink.parent("a")).to.have.class(activeLinkClass);
      // });
      treeNav.getTreeNavLinkByItemText("Authentication").click();
      treeNav.getTreeNavLinkByItemText("Authentication").parent().should('have.class', activeLinkClass);
      treeNav.getTreeNav().should("be.not.visible");
    });
  });
});
