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

  getSignUpInput() {
    return cy.get('input[type="button"][id="signup"]');
  }

  getGithubInput() {
    return cy.get('input[type="button"][id="continue-github"]');
  }

  getGoogleInput() {
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
}
