export class SignUpPage {
  getEmailInput() {
    return cy.get('input[id="email"]');
  }

  getFirsNameInput() {
    return cy.get('input[id="firstName"]');
  }

  getLastNameInput() {
    return cy.get('input[id="lastName"]');
  }

  getCountrySelect() {
    return cy.get('select[id="country"]');
  }

  getSignUpSubmitInput() {
    return cy.get('input[type="submit"][id="signup"]');
  }

  getGithubButtonInput() {
    return cy.get('input[type="button"][id="continue-github"]');
  }

  getGoogleButtonInput() {
    return cy.get('input[type="button"][id="continue-google"]');
  }

  getGoogleCaptcha() {
    return cy.get('iframe[title="reCAPTCHA"]');
  }

  getAgreeCheckbox() {
    return cy.get('input[type="checkbox"][id="agree-checkbox"]');
  }

  getStateProviceSelect() {
    return cy.get('select[id="state"]');
  }

  getSignInLink() {
    return cy.get('.goto-signin a[href="/login/"]');
  }
}
