---
title: Test your private SCIM integration
excerpt: Test that your System for Cross-domain Identity Management (SCIM) app can handle actual requests to create, read, update, and delete (CRUD) user profile information, and run through the manual Okta Integration Network (OIN) quality assurance test cases.
meta:
  - name: description
    content: Test that your SCIM app can handle actual requests to create, read, update and delete (CRUD) user profile information, and run through the manual Okta Integration Network (OIN) quality assurance test cases.
layout: Guides
---

This guide teaches you how to test your System for Cross-domain Identity Management (SCIM) app. This includes running an automated Runscope create, read, update, and delete (CRUD) user-profile test suite, in addition to a manual Okta Integration Network (OIN) quality assurance (QA) test suite. You need to create a [private SCIM integration instance](/docs/guides/scim-provisioning-integration-connect/main/#connect-to-your-scim-service) in your org before you run these tests.

## Scope of tests

This second suite of [Runscope](https://www.runscope.com) tests checks that your SCIM app can handle actual requests to **c**reate, **r**ead, **u**pdate, and **d**elete (CRUD) user profile information.

> **Note:** Okta doesn't delete user profiles in your app, but instead marks the user record with `active=false` to deactivate them. For a detailed explanation on deleting user profiles, see [Delete (Deprovision)](/docs/concepts/scim/#delete-deprovision).

## Profile Sourcing activation

Okta developer support must activate the Profile Sourcing capability (formerly known as Profile Mastering) for developer orgs. To temporarily activate this feature for your org, contact <developers@okta.com> with the name of your app integration and your org ID. Developer support automatically removes the access after two weeks. If you need a longer period to test your integration, include your time requirements in your email.

## Runscope tests for CRUD

If you're not familiar with Runscope, follow the detailed instructions in the [Test your SCIM API](/docs/guides/scim-provisioning-integration-prepare/main/#test-your-scim-api) topic to get started.

This suite runs the following tests:

1. Check that the integration exists in your Okta org.
1. Add a new random user in Okta.
1. Assign that user to the integration in Okta.
1. Verify that the user was created on your SCIM server.
1. Update the user `firstName` attribute in Okta.
1. Verify that the user attribute was updated on your SCIM server.
1. Deactivate the user in Okta.
1. Verify that the user was deactivated on your SCIM server.
1. Reactivate the user in Okta.
1. Reassign your integration to the user in Okta.
1. Verify that the user was reactivated and assigned on your SCIM server.
1. Remove your integration from the user in Okta.
1. Verify that the user is deactivated on your SCIM server.

## Configure and run tests

To configure and run the SCIM CRUD tests:

1. Download the Okta SCIM CRUD test file.
    * If you're using SCIM 2.0, download: [Okta SCIM 2.0 CRUD test file](/standards/SCIM/SCIMFiles/Okta-SCIM-20-CRUD-Test.json)
    * If you're using SCIM 1.1, download: [Okta SCIM 1.1 CRUD test file](/standards/SCIM/SCIMFiles/Okta-SCIM-11-CRUD-Test.json)
1. Click **Import Test** in Runscope.
1. Select **API Monitoring Tests** as the import format.
1. Click **Choose File** and select the Okta SCIM 2.0 CRUD JSON test file.
1. Click **Import API Test**. In this new test bucket, click **Editor** from the left-navigation menu.
1. Click **Test Settings** and then click **Initial Variables**.
1. Add the following variables with values that match your SCIM integration:
    * `oktaAppId`: The unique identifier that's randomly assigned to your Okta integration. You can see this value in the **App Embed Link** panel under the **General** tab for your Okta integration.
    * `oktaOrgUrl`: The base URL for your Okta org. Include the `https://` prefix.

        <div class="three-quarter border">

        ![The browser bar showing the oktaOrgUrl location.](/img/oin/scim_crud-test-identifiers.png)

        </div>

    * `oktaToken`: The security token used to connect to your API. You can generate a token for your integration inside your Okta org:
        * Click **Security** > **API**.
        * Click **Tokens** and **Create Token**.
        * Provide the token name and click **Create Token**.
        * Copy the resulting token value over to this Runscope variable.
    * `SCIMUrl`: The base URL of the SCIM implementation on your server. For example: `https://example.com/scim/v2`
    * `SCIMAuth`: The **Basic** or **OAuth** authorization token used to access your SCIM API.

    The final Runscope values should look similar to the following:

    <div class="three-quarter border">

    ![Sample values for CRUD test variables. Runscope initial variables](/img/oin/scim_crud-variables-d.png)

    </div>

1. Click **Test Settings** and then click **Initial Script**.
1. Copy the contents of the [Okta CRUD Initial Script](/standards/SCIM/SCIMFiles/Initial_Script_CRUD.txt) text file and paste into this Runscope console.
1. Click **Save & Run**.

## Review test results

On the left of your Runscope page, the test appears in the **Recent Test Runs** section.

1. Click **View Progress** inside the **Recent Test Runs** section.
   As the test suite runs, Runscope displays live updates of the test in progress. After the test suite completes execution, the main panel displays the results of your test.
1. Click the name of each particular test case to see the test details. The details show you the **Request**, **Response**, and **Connection** information for each test.

<!-- temporarily removing this link due to 404 on Runscope side. OKTA-332238
For comparison and reference, here is an example of [a successful Runscope test run](https://www.runscope.com/radar/rho3mr74kof3/05da739b-a2b2-49ce-91a0-656320deab17/history/b49431ec-662f-49b5-b382-7149eec85091) for the SCIM 2.0 CRUD test suite.
-->

## Run through OIN QA tests

If you plan to publish your SCIM integration in the OIN catalog, run the test cases in the OIN test plan. See [Okta SCIM Test Plan](/standards/SCIM/SCIMFiles/okta-scim-test-plan-v2.xlsx). Your integration has to pass the test cases in the OIN test plan, in addition to the Runscope test cases.

## Next steps

This completes the [Build a SCIM provisioning integration](/docs/guides/scim-provisioning-integration-overview/) series. You now have a private SCIM integration that's successfully built and tested for your org users.

If you want to expose your SCIM integration to your customers who also use Okta, submit it to the Okta Integration Network (OIN). Integrations listed in the [OIN catalog](https://www.okta.com/integrations/) are available to all Okta customers to use.

* See [Publish an OIN integration](/docs/guides/submit-app-overview/) to understand the submission process for publishing an integration.
* Review the [OIN submission requirements](/docs/guides/submit-app-prereq/) before starting the submission process.
* Use the [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/scim/main/) guide to connect, test, and submit your Okta SCIM integration it to the OIN.
