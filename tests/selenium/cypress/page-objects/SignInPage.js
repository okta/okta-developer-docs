export class SignInPage {
  signInWithEmailLinkText = 'SIGN IN WITH EMAIL';
  signInWithGithubLinkText = 'CONTINUE WITH GITHUB';
  signInWithGoogleLinkText = 'CONTINUE WITH GOOGLE';
  signUpLinkText = 'Sign up';
  signUpLink = '/signup/';

  visit() {
    cy.visit('/login/');
  }

  getSignInLinks() {
    return cy.get(`.login--form a`)
  }
}
