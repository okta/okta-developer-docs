import { TreeNavPage } from "../page-objects/TreeNavPage";

describe("tree nav panel(left section)", () => {
  const treeNav = new TreeNavPage();
  const activeLinkClass = "router-link-active";

  beforeEach(() => {
    treeNav.visit("/");
    treeNav.resizeXLarge();
    //treeNav.pageReload();
  });

  it("scrolls to selected item on URL navigation", () => {
    const selectedItemTitle = "Authorization servers";

    treeNav.visit("/docs/concepts/auth-servers/");
    treeNav
      .getTreeNavLinkByItemText(selectedItemTitle)
      .parent("a")
      .should("have.class", activeLinkClass);
    treeNav.getTreeNavLinkByItemText(selectedItemTitle).should("be.inViewport");
  });

  describe("in mobile viewports", () => {
    beforeEach(() => {
      treeNav.visit("/docs/concepts");
      treeNav.resizeXXsmall();
    });

    it('tree nav is hidden', () => {
      treeNav.getTreeNav().should("be.not.visible");
    });
  });
});
