---
title: Test your Okta integration
---

This second suite of [Runscope](https://www.runscope.com) tests checks that your SCIM app can handle actual requests to **C**reate, **R**ead, **U**pdate and **D**elete (CRUD) user profile information.

>**Note:** Okta doesn't delete user profiles, but instead marks them as `active=false` to deactivate them.

If you are not familiar with Runscope, follow the detailed instructions in the [test your SCIM API](/docs/guides/build-provisioning-integration/test-scim-api/) topic to get started.

This suite runs the following tests:

1. Checks that the app exists in your Okta org.
1. Adds a new random user in Okta.
1. Assigns that user to the app in Okta.
1. Verifies that the user was created on your SCIM server.
1. Updates the user `firstName` attribute in Okta.
1. Verifies that the user attribute was updated on your SCIM server.
1. Deactivates the user in Okta.
1. Verifies that the user was deactivated on your SCIM server.
1. Reactivates the user in Okta.
1. Reassigns your app to the user in Okta.
1. Verifies the user was reactivated and assigned on your SCIM server.
1. Removes your app from the user in Okta.
1. Verifies that user is deactivated on your SCIM server.

To configure and run the SCIM CRUD tests:

1. Download the Okta SCIM CRUD test file.
    * If you are using SCIM 2.0 for your app: [Okta SCIM 2.0 CRUD test file](/standards/SCIM/SCIMFiles/Okta-SCIM-20-CRUD-Test.json)
    * If you are using SCIM 1.1 for your app: [Okta SCIM 1.1 CRUD test file](/standards/SCIM/SCIMFiles/Okta-SCIM-11-CRUD-Test.json)
1. In Runscope, click **Import Test**.
1. Select **Runscope API Tests** as the import format.
1. Click **Choose File** and select the Okta SCIM 2.0 CRUD JSON test file.
1. Click **Import API Test**.
1. In this new test bucket, click **Editor** from the left hand navigation menu.
1. Click **Test Settings** and then click **Initial Variables**.
1. Add the following variables with values that match your SCIM app:
    * `oktaAppId` - the unique identifier randomly assigned to your Okta app. You can see this value in the **App Embed Link** panel under the **General** tab for your Okta app.
    * `oktaOrgUrl` - the base URL for your Okta org. Include the `https://` prefix.
    ![Dev Window](/img/oin/scim_crud-test-identifiers.png "Browser bar showing the oktaOrgUrl location")
    * `oktaToken` - the security token used to connect to your Okta app API. You can generate a token for your app inside your Okta org:
        * Click **Security** > **API**.
        * Click on **Tokens** and **Create Token**.
        * Give the token a name click **Create Token**.
        * Copy the resulting token value over to this Runscope variable.
    * `SCIMUrl` - the Base URL of the SCIM implementation on your server. For example: `https://example.com/scim/v2`
    * `SCIMAuth` - the Basic or OAuth authorization token used to access your SCIM API.

    The final Runscope values should look similar to the following:
    ![Runscope Initial Variables](/img/oin/scim_crud-variables.png "Sample values for CRUD test variables")

1. Click **Test Settings** and then click **Initial Script**.
1. Copy the contents of the [Okta CRUD Initial Script](/standards/SCIM/SCIMFiles/Initial_Script_CRUD.txt) text file and paste into this Runscope console.
1. Click **Save & Run**.

On the left side of your screen, the test appears in the **Recent Test Runs** section.

1. Click **View Progress** inside the **Recent Test Runs** section.
1. As the test suite runs, Runscope displays live updates of the test in progress. After the test is complete, the main panel displays the results of your test.
1. To see the details of tests, click the name of each particular test case to expand the section. The details show you the **Request**, **Response**, and **Connection** information for each test.

After the tests complete successfully, you can move on to creating the configuration guide for your customers to use your app once it is available on the OIN.

For comparison and reference, here is an example of [a successful Runscope test run](https://www.runscope.com/radar/rho3mr74kof3/05da739b-a2b2-49ce-91a0-656320deab17/history/b49431ec-662f-49b5-b382-7149eec85091) for the SCIM 2.0 CRUD test suite.

<NextSectionLink/>
