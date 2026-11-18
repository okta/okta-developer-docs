export class SignUpPage {
  visitSignUpPage() {
    cy.visit('signup/');
  }

  getSignupSection() {
    return cy.get('section.signup');
  }

  getMobileTitle() {
    return cy.get('.signup__mobile-title');
  }

  getFormWrapper() {
    return cy.get('.signup-form-wrapper');
  }

  getFormHeading() {
    return cy.get('.signup-form-wrapper__heading');
  }

  getFirstNameInput() {
    return cy.get('input#firstName');
  }

  getLastNameInput() {
    return cy.get('input#lastName');
  }

  getEmailInput() {
    return cy.get('input#email');
  }

  getDepartmentSelect() {
    return cy.get('select#department');
  }

  getCountrySelect() {
    return cy.get('select#country');
  }

  getStateSelect() {
    return cy.get('select#state');
  }

  getDescriptorOptions() {
    return cy.get('.signup-descriptor');
  }

  getDescriptorByLabel(label) {
    return cy.get('.signup-descriptor').contains(label);
  }

  getSelectedDescriptor() {
    return cy.get('.signup-descriptor--selected');
  }

  getDescriptorTooltip() {
    return cy.get('.signup-descriptor__tooltip');
  }

  getAgreeCheckbox() {
    return cy.get('input#agree-checkbox-');
  }

  getConsentText() {
    return cy.get('.signup-form__consent-text');
  }

  getRecaptcha() {
    return cy.get('.signup-form__recaptcha');
  }

  getSignUpSubmitInput() {
    return cy.get('input[type="submit"]#signup');
  }

  getSubmitButton() {
    return cy.get('.signup-form__submit-btn');
  }

  getLoginLink() {
    return cy.get('.signup-form__login-link a');
  }

  getFieldErrors() {
    return cy.get('.signup-form__error');
  }

  getErrorBanner() {
    return cy.get('.signup-form__error-banner');
  }

  getHeroTitle() {
    return cy.get('.signup-hero__title');
  }

  getFeatureCards() {
    return cy.get('.signup-feature-card');
  }

  getPartnerLogos() {
    return cy.get('.signup-logos__item');
  }

  getBottomCards() {
    return cy.get('.signup-bottom-card');
  }

  getBottomCardCta(variant) {
    return cy.get(`.signup-bottom-card--${variant} .signup-bottom-card__cta`);
  }
}
