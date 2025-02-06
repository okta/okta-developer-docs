1. Generate app instances from your updated integration configuration and assign test users. See [Generate instances for testing](#generate-instances-for-testing).

   > **Notes:**
   > * You must generate separate instances for testing if you support two SSO protocols (one for OIDC and one for SAML). The OIN Submission Tester can only test one protocol per instance.
   > * You should already have an instance of your published integration for backwards-compatibility testing. See [Required app instances](#required-app-instances).

1. Test the required flows for each of your SSO instances with the [OIN Submission Tester](/docs/guides/submit-oin-app/openidconnect/main/#oin-submission-tester). Fix any test failures from the OIN Submission Tester, then regenerate the test instance (if necessary) and retest.

   > **Note:** You must have the Okta Browser Plugin installed with **Allow in Incognito** enabled before you use the  **OIN Submission Tester**. See [OIN Wizard requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-requirements).

1. [Submit your updated integration](#submit-your-updates) after all required tests are successful.
