export class DialogWindow {
  getDialogWindow() {
    return cy.get('.dialog-container .dialog');
  }

  getDialogHeader() {
    return cy.get('.dialog-container .dialog .dialog--header');
  }
}
