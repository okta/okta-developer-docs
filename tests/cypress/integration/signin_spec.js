import { SignInPage } from "../page-objects/SignInPage";

describe("Sign in page check spec", () => {
  const signInPage = new SignInPage();

  beforeEach(() => {
    signInPage.visit();
  });

  it("should shows all sign in links with proper text", () => {
    signInPage.getSignInLinks().should($elList => {
      expect($elList.eq(0)[0].innerText, "signin with email link").to.eq(
        signInPage.SIGN_IN_WITH_EMAIL_LINK_TEXT
      );
      expect($elList.eq(1)[0].innerText, "signin with github link").to.eq(
        signInPage.SIGN_IN_WITH_GITHUB_LINK_TEXT
      );
      expect($elList.eq(2)[0].innerText, "signin with google link").to.eq(
        signInPage.SIGN_IN_WITH_GOOGLE_LINK_TEXT
      );
      expect($elList.eq(3)[0].innerText, "signup link").to.eq(
        signInPage.SIGN_UP_LINK_TEXT
      );
      expect($elList.eq(3)[0].href, "signup link").to.contain(
        signInPage.SIGN_UP_LINK
      );
    });
  });

  describe("verify button clicks", () => {
    it("should contains proper routers for sign in links", () => {
      signInPage.getSignInLinks().should($elList => {
        expect($elList.eq(0)[0].href, "signin with email link").to.eq(
          "https://login.okta.com/"
        );
        expect($elList.eq(1)[0].href, "signin with github link")
          .to.contain("0oa3jobx2bBlylNft0g7")
          .and.to.contain("https://okta-next-test.oktaweb.dev");
        expect($elList.eq(2)[0].href, "signin with googel link")
          .to.contain("0oa3jaktbqkiwCthn0g7")
          .and.to.contain("https://okta-next-test.oktaweb.dev");
        expect($elList.eq(3)[0].href, "signup link").to.contain(
          signInPage.SIGN_UP_LINK
        );
      });
    });
  });
});
