---
title: Test your Okta SCIM integration
excerpt: Test that your SCIM application can handle actual requests to create, read, update, and delete (CRUD) user profile information, and run through our Okta Integration Network (OIN) quality assurance test cases.
meta:
  - name: description
    content: Test that your SCIM application can handle actual requests to create, read, update and delete (CRUD) user profile information, and run through our Okta Integration Network (OIN) quality assurance test cases.
layout: Guides
---

This guide teaches you to how test that your SCIM application can handle actual requests to create, read, update and delete (CRUD) user profile information, and run through our Okta Integration Network (OIN) quality assurance test cases.

## Scope of tests

This second suite of [Runscope](https://www.runscope.com) tests checks that your SCIM application can handle actual requests to **c**reate, **r**ead, **u**pdate, and **d**elete (CRUD) user profile information.

> **Note:** Okta doesn't delete user profiles in your application, but instead marks the user record with `active=false` to deactivate them. For a detailed explanation on deleting user profiles, see [Delete (Deprovision)](/docs/concepts/scim/#delete-deprovision).

## Profile Sourcing activation

The Profile Sourcing capability (formerly known as Profile Mastering) must be activated for developer orgs by Okta Developer Support. If you are testing this feature in your SCIM app integration, contact <developers@okta.com> with the name of your app integration and your org ID to have Profile Sourcing temporarily activated for your org. Developer Support automatically removes the access after two weeks. If you need a longer period to test your integration, include your time requirements in your email.

## Runscope tests for CRUD

If you are not familiar with Runscope, follow the detailed instructions in the [Test your SCIM API](/docs/guides/scim-provisioning-integration-prepare/main/#test-your-scim-api) topic to get started.

This suite runs the following tests:

1. Checks that the integration exists in your Okta org.
1. Adds a new random user in Okta.
1. Assigns that user to the integration in Okta.
1. Verifies that the user was created on your SCIM server.
1. Updates the user `firstName` attribute in Okta.
1. Verifies that the user attribute was updated on your SCIM server.
1. Deactivates the user in Okta.
1. Verifies that the user was deactivated on your SCIM server.
1. Reactivates the user in Okta.
1. Reassigns your integration to the user in Okta.
1. Verifies the user was reactivated and assigned on your SCIM server.
1. Removes your integration from the user in Okta.
1. Verifies that user is deactivated on your SCIM server.

## Configure and run tests

To configure and run the SCIM CRUD tests:

1. Download the Okta SCIM CRUD test file.
    * If you are using SCIM 2.0: [Okta SCIM 2.0 CRUD test file](/standards/SCIM/SCIMFiles/Okta-SCIM-20-CRUD-Test.json)
    * If you are using SCIM 1.1: [Okta SCIM 1.1 CRUD test file](/standards/SCIM/SCIMFiles/Okta-SCIM-11-CRUD-Test.json)
1. In Runscope, click **Import Test**.
1. Select **Runscope API Tests** as the import format.
1. Click **Choose File** and select the Okta SCIM 2.0 CRUD JSON test file.
1. Click **Import API Test**.
1. In this new test bucket, click **Editor** from the left hand navigation menu.
1. Click **Test Settings** and then click **Initial Variables**.
1. Add the following variables with values that match your SCIM integration:
    * `oktaAppId` - the unique identifier randomly assigned to your Okta integration. You can see this value in the **App Embed Link** panel under the **General** tab for your Okta integration.
    * `oktaOrgUrl` - the base URL for your Okta org. Include the `https://` prefix.

        <div class="three-quarter border">

        ![Browser bar showing the oktaOrgUrl location.](/img/oin/scim_crud-test-identifiers.png)

        </div>

    * `oktaToken` - the security token used to connect to your API. You can generate a token for your integration inside your Okta org:
        * Click **Security** > **API**.
        * Click **Tokens** and **Create Token**.
        * Give the token a name click **Create Token**.
        * Copy the resulting token value over to this Runscope variable.
    * `SCIMUrl` - the base URL of the SCIM implementation on your server. For example: `https://example.com/scim/v2`
    * `SCIMAuth` - the Basic or OAuth authorization token used to access your SCIM API.

    The final Runscope values should look similar to the following:

    <div class="three-quarter border">

    ![Sample values for CRUD test variables. Runscope Initial Variables](/img/oin/scim_crud-variables-d.png)

    </div>

1. Click **Test Settings** and then click **Initial Script**.
1. Copy the contents of the [Okta CRUD Initial Script](/standards/SCIM/SCIMFiles/Initial_Script_CRUD.txt) text file and paste into this Runscope console.
1. Click **Save & Run**.

## Review test results

On the left side of your screen, the test appears in the **Recent Test Runs** section.

1. Click **View Progress** inside the **Recent Test Runs** section.
1. As the test suite runs, Runscope displays live updates of the test in progress. After the test is complete, the main panel displays the results of your test.
1. To see the details of tests, click the name of each particular test case to expand the section. The details show you the **Request**, **Response**, and **Connection** information for each test.

<!-- temporarily removing this link due to 404 on Runscope side. OKTA-332238
For comparison and reference, here is an example of [a successful Runscope test run](https://www.runscope.com/radar/rho3mr74kof3/05da739b-a2b2-49ce-91a0-656320deab17/history/b49431ec-662f-49b5-b382-7149eec85091) for the SCIM 2.0 CRUD test suite.
-->

## Run through OIN QA tests

If your SCIM integration has passed all the Runscope tests, and you are planning to publish your SCIM integration in the OIN catalog, you can now run through the OIN quality assurance test cases in this spreadsheet.

* [Okta SCIM Test Plan](/standards/SCIM/SCIMFiles/okta-scim-test-plan.xlsx)

## Next steps

This brings you to the end of the [Build a SCIM provisioning integration](/docs/guides/scim-provisioning-integration-overview/) series. You should now have a SCIM integration that has been successfully built and tested.

After you have completed your testing and your integration is working as expected, you can start the submission process to have your integration included in the [Okta Integration Network](https://www.okta.com/okta-integration-network/) (OIN).

Our [Submit an app integration](/docs/guides/submit-app) guide takes you through the steps required to submit your SCIM integration through the OIN Manager site.