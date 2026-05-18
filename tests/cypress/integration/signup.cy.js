import { SignUpPage } from "../page-objects/SignUpPage";

describe('Sign up page', () => {
  const signUpPage = new SignUpPage();

  beforeEach(() => {
    signUpPage.visitSignUpPage();
  });

  describe('page structure', () => {
    it('should render the signup section', () => {
      signUpPage.getSignupSection().should('exist').and('be.visible');
    });

    it('should display the mobile title', () => {
      signUpPage.getMobileTitle().should('exist');
      signUpPage.getMobileTitle().should('contain.text', 'Start your Integration');
    });

    it('should display the form heading', () => {
      signUpPage.getFormHeading().should('exist');
      signUpPage.getFormHeading().should('contain.text', 'Create your integrator free plan now!');
    });
  });

  describe('form fields', () => {
    it('should render all required form inputs', () => {
      signUpPage.getFirstNameInput().should('exist').and('be.visible');
      signUpPage.getLastNameInput().should('exist').and('be.visible');
      signUpPage.getEmailInput().should('exist').and('be.visible');
      signUpPage.getDepartmentSelect().should('exist').and('be.visible');
      signUpPage.getCountrySelect().should('exist').and('be.visible');
    });

    it('should show correct placeholder for first name', () => {
      signUpPage.getFirstNameInput().should('have.attr', 'placeholder', 'E.g. John');
    });

    it('should show correct placeholder for last name', () => {
      signUpPage.getLastNameInput().should('have.attr', 'placeholder', 'E.g. Doe');
    });

    it('should show correct placeholder for email', () => {
      signUpPage.getEmailInput().should('have.attr', 'placeholder', 'E.g. john@okta.com');
    });

    it('should have the submit button with value "Sign Up"', () => {
      signUpPage.getSignUpSubmitInput().should('have.value', 'Sign Up');
    });

    it('should render the recaptcha widget', () => {
      signUpPage.getRecaptcha().should('exist');
    });
  });

  describe('department dropdown', () => {
    const expectedDepartments = [
      'Engineering',
      'Product',
      'Developer Relations',
      'Sales',
      'Marketing',
      'Security',
      'IT',
      'Operations',
      'Legal',
      'Others',
    ];

    it('should contain all department options', () => {
      expectedDepartments.forEach((dept) => {
        signUpPage.getDepartmentSelect().find('option').should('contain.text', dept);
      });
    });

    it('should have "Select Department" as the default disabled option', () => {
      signUpPage.getDepartmentSelect()
        .find('option:first-child')
        .should('contain.text', 'Select Department')
        .and('be.disabled');
    });
  });

  describe('builder type descriptors', () => {
    it('should display 4 descriptor options', () => {
      signUpPage.getDescriptorOptions().should('have.length', 4);
    });

    it('should contain expected descriptor labels', () => {
      const labels = [
        'Independent Software Vendor (ISV)',
        'Solution Builders (GSI, SI, MSP, Solution Provider)',
        'Other Developers Exploring APIs, SDKs etc',
        'Existing Customers at Okta',
      ];
      labels.forEach((label) => {
        signUpPage.getDescriptorByLabel(label).should('exist');
      });
    });

    it('should mark a descriptor as selected when clicked', () => {
      signUpPage.getDescriptorByLabel('Independent Software Vendor (ISV)').click();

      signUpPage.getSelectedDescriptor().should('have.length', 1);
      signUpPage.getSelectedDescriptor().should('contain.text', 'Independent Software Vendor (ISV)');
    });

    it('should deselect previous descriptor when another is clicked', () => {
      signUpPage.getDescriptorByLabel('Independent Software Vendor (ISV)').click();
      signUpPage.getSelectedDescriptor().should('contain.text', 'Independent Software Vendor (ISV)');

      signUpPage.getDescriptorByLabel('Existing Customers at Okta').click();
      signUpPage.getSelectedDescriptor().should('have.length', 1);
      signUpPage.getSelectedDescriptor().should('contain.text', 'Existing Customers at Okta');
    });

    it('should show a tooltip on hover of the info icon', () => {
      signUpPage.getDescriptorOptions().first().find('.signup-descriptor__info').trigger('mouseenter');
      signUpPage.getDescriptorTooltip().should('be.visible');
    });

    it('should hide the tooltip on mouse leave', () => {
      signUpPage.getDescriptorOptions().first().find('.signup-descriptor__info').trigger('mouseenter');
      signUpPage.getDescriptorTooltip().should('be.visible');

      signUpPage.getDescriptorOptions().first().find('.signup-descriptor__info').trigger('mouseleave');
      signUpPage.getDescriptorTooltip().should('not.exist');
    });
  });

  describe('country and state interaction', () => {
    it('should show State select when United States is chosen', () => {
      signUpPage.getCountrySelect().select('United States');

      signUpPage.getStateSelect().should('exist').and('be.visible');
      cy.get('label[for="state"] .signup-form__label').should(($label) => {
        expect($label.text()).to.contain('State');
      });
    });

    it('should show Province select when Canada is chosen', () => {
      signUpPage.getCountrySelect().select('Canada');

      signUpPage.getStateSelect().should('exist').and('be.visible');
      cy.get('label[for="state"] .signup-form__label').should(($label) => {
        expect($label.text()).to.contain('Province');
      });
    });

    it('should not show state/province select for other countries', () => {
      signUpPage.getCountrySelect().select('Albania');

      signUpPage.getStateSelect().should('not.exist');
    });
  });

  describe('consent checkbox', () => {
    it('should show agree checkbox for a GDPR country', () => {
      signUpPage.getCountrySelect().select('Germany');
      signUpPage.getAgreeCheckbox().should('be.visible');
    });

    it('should show agree checkbox for Canada', () => {
      signUpPage.getCountrySelect().select('Canada');
      signUpPage.getAgreeCheckbox().should('be.visible');
    });

    it('should not show agree checkbox for United States', () => {
      signUpPage.getCountrySelect().select('United States');
      signUpPage.getAgreeCheckbox().should('not.be.visible');
    });
  });

  describe('email validation', () => {
    it('should show error when email is left blank', () => {
      signUpPage.getEmailInput().focus().blur();

      cy.get('label[for="email"] .signup-form__error').should('contain.text', 'This field is required.');
    });

    it('should show error for an invalid email format', () => {
      signUpPage.getEmailInput().type('not-an-email').blur();

      cy.get('label[for="email"] .signup-form__error').should('contain.text', 'Invalid email.');
    });

    it('should clear error for a valid email format', () => {
      signUpPage.getEmailInput().type('not-an-email').blur();
      cy.get('label[for="email"] .signup-form__error').should('contain.text', 'Invalid email.');

      signUpPage.getEmailInput().clear().type('john@okta.com').blur();
      cy.get('label[for="email"] .signup-form__error').should('not.exist');
    });
  });

  describe('empty field validation', () => {
    it('should show error when first name is left blank', () => {
      signUpPage.getFirstNameInput().focus().blur();

      signUpPage.getFieldErrors().should('contain.text', 'This field cannot be left blank');
    });

    it('should show error when last name is left blank', () => {
      signUpPage.getLastNameInput().focus().blur();

      signUpPage.getFieldErrors().should('contain.text', 'This field cannot be left blank');
    });

    it('should clear first name error once a value is entered', () => {
      signUpPage.getFirstNameInput().focus().blur();
      signUpPage.getFieldErrors().should('contain.text', 'This field cannot be left blank');

      signUpPage.getFirstNameInput().type('John').blur();
      cy.get('label[for="firstName"] .signup-form__error').should('not.exist');
    });

    it('should clear last name error once a value is entered', () => {
      signUpPage.getLastNameInput().focus().blur();
      signUpPage.getFieldErrors().should('contain.text', 'This field cannot be left blank');

      signUpPage.getLastNameInput().type('Doe').blur();
      cy.get('label[for="lastName"] .signup-form__error').should('not.exist');
    });

    it('should clear department error once a value is selected', () => {
      cy.get('form#signupForm').submit();
      cy.get('label[for="department"] .signup-form__error')
        .should('contain.text', 'This field cannot be left blank');

      signUpPage.getDepartmentSelect().select('Engineering');
      cy.get('label[for="department"] .signup-form__error').should('not.exist');
    });
  });

  describe('login link', () => {
    it('should display login link with correct href', () => {
      signUpPage.getLoginLink().should('exist');
      signUpPage.getLoginLink().should('have.attr', 'href', '/login');
      signUpPage.getLoginLink().should('contain.text', 'Log in here');
    });
  });

  describe('hero section', () => {
    it('should display the hero title', () => {
      signUpPage.getHeroTitle().should('exist');
      signUpPage.getHeroTitle().invoke('text').then((text) => {
        expect(text.replace(/\s+/g, ' ').trim()).to.equal('Start your Integration building journey.');
      });
    });

    it('should display 2 feature cards', () => {
      signUpPage.getFeatureCards().should('have.length', 2);
    });

    it('should display partner logos', () => {
      signUpPage.getPartnerLogos().should('have.length.greaterThan', 0);
    });
  });

  describe('bottom cards', () => {
    it('should display 2 bottom cards', () => {
      signUpPage.getBottomCards().should('have.length', 2);
    });

    it('should show Okta card with correct CTA text', () => {
      signUpPage.getBottomCardCta('okta').should('contain.text', 'Try Okta Platform');
    });

    it('should show Auth0 card with correct CTA text', () => {
      signUpPage.getBottomCardCta('auth0').should('contain.text', 'Try Auth0 Platform');
    });

    it('should have correct Okta CTA link', () => {
      signUpPage.getBottomCardCta('okta')
        .should('have.attr', 'href', 'https://okta.com/free-trial/workforce-identity');
    });

    it('should have correct Auth0 CTA link', () => {
      signUpPage.getBottomCardCta('auth0')
        .should('have.attr', 'href')
        .and('contain', 'https://auth0.com/signup');
    });
  });

  describe('consent text', () => {
    it('should display the terms and privacy policy consent text', () => {
      signUpPage.getConsentText().should('exist');
      signUpPage.getConsentText().should('contain.text', 'By clicking "Sign up," I agree');
      signUpPage.getConsentText().should('contain.text', 'Privacy Policy');
    });

    it('should link to the Integrator Free Plan Agreement', () => {
      signUpPage.getConsentText().find('a').first()
        .should('have.attr', 'href', '/terms/')
        .and('contain.text', 'Integrator Free Plan Agreement');
    });

    it('should link to the Privacy Policy', () => {
      signUpPage.getConsentText().find('a').last()
        .should('have.attr', 'href', 'https://www.okta.com/privacy-policy')
        .and('contain.text', 'Privacy Policy');
    });
  });
});
