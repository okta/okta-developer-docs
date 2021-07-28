import { BasePage } from "./BasePage";

export class CodePage extends BasePage {
  getSampleAppLink() {
    const sampleAppLinkText = /^Okta Spring Boot Starter$/;

    return cy.get('span').contains(sampleAppLinkText);
  }

  getSimpleAppButton() {
    const sampleAppButtonText = /^Sample App$/;

    return cy.get('span').contains(sampleAppButtonText);
  }

  getHowToGuide() {
    const howToGuideText = /^How To Guide$/;

    return cy.get('span').contains(howToGuideText);
  }
}
