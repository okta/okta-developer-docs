export class SignInPage {
  SIGN_IN_WITH_EMAIL_LINK_TEXT = 'SIGN IN WITH EMAIL';
  SIGN_IN_WITH_GITHUB_LINK_TEXT = 'CONTINUE WITH GITHUB';
  SIGN_IN_WITH_GOOGLE_LINK_TEXT = 'CONTINUE WITH GOOGLE';
  SIGN_UP_LINK_TEXT = 'Sign up';
  SIGN_UP_LINK = '/signup/';

  visit() {
    cy.visit('/login/');
  }

  getSignInLinks() {
    return cy.get(`.login--form a`)
  }
}
