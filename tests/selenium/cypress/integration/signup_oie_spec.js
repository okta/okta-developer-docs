import { SignUpPage } from "../page-objects/SignUpPage";

describe('Sign up page check spec', () => {
  const signUpPage = new SignUpPage();

  beforeEach(() => {
    signUpPage.visitOieSignUpPage();
  });

  it('should show all the fields and buttons', () => {
    signUpPage.getEmailInput().should('exist');
    signUpPage.getFirsNameInput().should('exist');
    signUpPage.getLastNameInput().should('exist');
    signUpPage.getCountrySelect().should('exist');
    signUpPage.getSignUpSubmitInput().should('exist');
    signUpPage.getGoogleCaptcha().its('0.contentDocument').should('exist');
    signUpPage.getSignInLink().should('exist');
  });

  it('should show agree checkbox for Canada', () => {
    signUpPage.getCountrySelect().select("Canada");
    signUpPage.getAgreeCheckbox().should('be.visible');
  });

  it('should show Province selection for Canada', () => {
    signUpPage.getCountrySelect().select('Canada');
    signUpPage.getStateProviceSelect().should('be.visible');
    cy.get('label[for="state"]').should(($label) => {
      expect($label[0].firstChild.data.trim()).equal('Province');
    })
  });

  it('shows State selection for United States', () => {
    signUpPage.getCountrySelect().select('United States');
    signUpPage.getStateProviceSelect().should('be.visible');
    cy.get('label[for="state"]').should(($label) => {
      expect($label[0].firstChild.data.trim()).equal('State');
    })
  });

  it('does not shows State selection for Albania', () => {
    signUpPage.getCountrySelect().select('Albania');
    signUpPage.getStateProviceSelect().should('not.exist');
  });

  it('does not shows agree checkbox for United States', () => {
    signUpPage.getCountrySelect().select('United States');

    signUpPage.getAgreeCheckbox().should('not.be.visible');
  });

  describe('verify button clicks', () => {
    it('should contain proper router for signin link', () => {
      signUpPage.getSignInLink().should('have.attr', 'href')
                                .and('eq', '/login/');
    });
  });

  describe('verify button text', () => {
    it('email signup button text verification', () => {
      signUpPage.getSignUpSubmitInput().should('have.value', 'sign up');
    });
  })

});
