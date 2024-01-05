import { BasePage } from "../page-objects/BasePage";

describe('API tags check spec', () => {
  const basePage = new BasePage();

  //it('shows the Beta lifecycle tags', () => {
  //  const betaTagSelector = '.api-label-beta';

  //  basePage.visit('/docs/reference/api/policy');

  //  cy.get(betaTagSelector).should('exist');
  //});

  //it('shows the Early Access lifecycle tags', () => {
    //const eaTagsSelector = '.api-label-ea';

    //basePage.visit('/docs/reference/api/users');

    //cy.get(eaTagsSelector).should('exist')
  //});

 // it('shows the Deprecated lifecycle tags', () => {
   // const deprecatedTagsSelector = '.api-label-deprecated';

   // basePage.visit('/docs/reference/api/sessions');

   // cy.get(deprecatedTagsSelector).should('exist');
 // });

 // it('shows the CORS tags', () => {
   // const corsTagsSelector = '.api-label-cors';

   // basePage.visit('/docs/reference/api/sessions');

  // cy.get(corsTagsSelector).should('exist');
 // });

  //it('shows the API URI GET tags', () => {
   // const apiUrlGetTagsSelector = '.api-uri-get';

   // basePage.visit('/docs/reference/api/sessions');

   // cy.get(apiUrlGetTagsSelector).should('exist');
 // });

  //it('shows the API URI POST tags', () => {
    //const apiUrlPostTagsSelector = '.api-uri-post';

    //basePage.visit('/docs/reference/api/sessions');

   // cy.get(apiUrlPostTagsSelector).should('exist');
 // });

  //it('shows the API URI DELETE tags', () => {
    //const apiUrlDeleteTagsSelector = '.api-uri-delete';

   // basePage.visit('/docs/reference/api/sessions');

   // cy.get(apiUrlDeleteTagsSelector).should('exist');
  //});
});
