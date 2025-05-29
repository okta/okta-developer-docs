import { DialogWindow } from "../page-objects/DialogWindow";
import { SignUpPage } from "../page-objects/SignUpPage";

describe('Sign up page check spec', () => {
  const signUpPage = new SignUpPage();

  beforeEach(() => {
    signUpPage.visitSignUpPage();
  });

  describe('verify button text', () => {
    it('email signup button text verification', () => {
      signUpPage.getSignUpSubmitInput().should('have.value', 'Sign up');
    });
  })

});
