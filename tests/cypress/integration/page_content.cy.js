"use strict";

import { BasePage } from "../page-objects/BasePage";
import { TreeNavPage } from "../page-objects/TreeNavPage";

describe("content section", () => {
  const basePage = new BasePage();
  const treeNavPage = new TreeNavPage()
  it('displays heading corresponding to URL hash', () => {
    const id = 'first-section';

    basePage.visit('/test_page/#last-section');
    basePage.resizeXLarge();
    //basePage.pageReload();

    basePage.getH2HeadingById(id).should('be.not.inViewport');

    basePage.getInPageLink(`/test_page/#${id}`).click();
    basePage.getH2HeadingById(id).should('be.inViewport');

  });

  it('navigates to previous anchor via back button', () => {
    const lastSectionId = 'last-section';
    const secondSectionId = 'second-section';

    basePage.visit('/test_page/');
    basePage.resizeXLarge();
    //basePage.pageReload();

    basePage.getH2HeadingById(secondSectionId).then($heading2 => {
      $heading2.click();
    }).should('be.inViewport');
    basePage.getH2HeadingById(lastSectionId).should('be.not.inViewport');

    treeNavPage.getInPageLink(`/test_page/#${lastSectionId}`).click();
    basePage.getH2HeadingById(secondSectionId).should('be.not.inViewport');
    basePage.getH2HeadingById(lastSectionId).should('be.inViewport');

    cy.go('back');
    basePage.getH2HeadingById(secondSectionId).should('be.inViewport');
    basePage.getH2HeadingById(lastSectionId).should('be.not.inViewport');

  });
});
