You need to run three sets of tests for SCIM integrations:

1. SCIM API specification tests

    First, test your SCIM API service before you conduct Okta-SCIM integration tests. Okta provides you with a SCIM API specification test suite to execute in Runscope. See [Test your SCIM API](/docs/guides/scim-provisioning-integration-prepare/main/#test-your-scim-api) for instructions on how to run this test suite. Provide the test results URL in the **Link to Runscope spec test results** field when you submit your integration to the OIN.

1. Runscope create, read, update, and delete (CRUD) user profile tests

   The Runscope CRUD test relies on your updated SCIM instance for testing. See [Runscope CRUD tests](/docs/guides/submit-oin-app/scim/main/#runscope-crud-tests) for instructions on how to run this test suite. Enter the results URL from these tests in the **Link to Runscope CRUD test results** field when you submit your integration to the OIN.

1. Manual Okta SCIM integration tests

   See [Manual Okta SCIM integration tests](/docs/guides/submit-oin-app/scim/main/#manual-okta-scim-integration-tests) for instructions on how to run this test suite. There's no field in the OIN Wizard for the [Manual Okta SCIM integration tests](#manual-okta-scim-integration-tests) results, however, you must certify that you've completed these tests when you submit your integration to the OIN.

> **Note:** Okta recommends that you execute the Runscope CRUD tests and the manual Okta SCIM integration tests on a published-version SCIM instance for backwards compatibility. The results of the backwards-compatibility tests aren't requirements for submission.
