---
title: Submit an integration with the OIN Wizard
meta:
  - name: description
    content: Use this guide to learn how to submit your integration to the Okta Integration Network (OIN) team for publication. The submission task is performed in the Okta Admin Console through the OIN Wizard.
layout: Guides
---

<ApiLifecycle access="ea" />

Use this guide to learn how to submit a Single Sign-On (SSO) integration to the Okta Integration Network (OIN) team using the OIN Wizard. This guide also shows you how to create an SSO integration instance for testing in your org.

---

**Learning outcomes**

* Learn how to submit an SSO integration using the OIN Wizard.
* Learn how to create an integration instance for testing from the OIN Wizard.
* Understand the basic test cases required for your SSO features.

**What you need**

* An [Okta Developer Edition org](https://developer.okta.com/signup/)

* A functional SSO integration based on the [Build a Single Sign-On integration](/docs/guides/build-sso-integration/) guide

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

---

## Overview

Okta provides you with a seamless experience in the Okta Admin Console to integrate and submit your app for publication in the [Okta Integration Network (OIN)](https://www.okta.com/okta-integration-network/). When you obtain an [Okta Developer-Edition org](https://developer.okta.com/signup/), you can use it as a sandbox to integrate your app with Okta and explore more Okta features. When you decide to publish your integration to the OIN, you can use the same developer-edition org to submit your integration using the OIN Wizard.

The OIN Wizard is a full-service tool in the Admin Console for you to:

* Provide all your integration submission details.
* Generate an app instance in your org for testing.
* Submit your integration directly to the OIN team when you're satisfied with your test results.

The OIN team verifies your submitted integration before they publish it in the [OIN catalog](https://www.okta.com/integrations/).

> **Note:** Only cloud-based SaaS apps (either traditional web applications with a back-end or a modern browser-based SPA) are published in the OIN catalog.

### Protocols supported

This guide covers submissions that use the following protocols:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

    > **Note:** <br>
    > * To support the potentially large number of Okta orgs that access an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.
    > * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

    > **Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

> **Note:** SWA app integrations are no longer accepted for publication in the OIN catalog. However, the OIN team still maintains existing SWA apps.

## Start a submission

You need to review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission. There are artifacts and technical details that you need to provide during the submission process.

> **Note:** For best practices, create two or three extra administrative users in your Okta org to manage the integration. This ensures that your team can access the integration for updates in the future.

Start your integration submission for OIN publication:

1. Sign in to your [developer-edition Okta org](/login/) as a user with administrative privileges.
1. Go to **Applications** > **Your OIN Integrations** in the Admin Console.
1. Click **Build new OIN integration**. The Okta Integration Network (OIN) Wizard appears.
1. From the **Select your protocol** section, select **<StackSnippet snippet="protocol-name" inline/>**.
    > **Note:** If you want to change the protocol instructions on this page, select the protocol you want from the **Instructions for** dropdown list on the right.
1. Click **Next: Configure your integration**.

> **Note:** Currently, you can only configure one protocol per OIN integration submission.

### Configure your integration

Continue with the OIN Wizard and configure your integration:

#### OIN catalog properties

1. Click the **OIN catalog properties** dropdown arrow and specify the following OIN catalog information:

    | <div style="width:150px">Property</div>| Description  |
    | ----------------- | ------------ |
    | **Display name** `*` | Provide a name for your integration. This is the main title used for your integration in the OIN.<br>The maximum field length is 64 characters. |
    | **Description** `*` | Give a general description of your application and what the Okta integration does. See [App description guidelines](/docs/guides/submit-app-prereq/main/#app-description-guidelines). |
    | **Logo** `*` | Upload a PNG, JPG, or GIF file of a logo to accompany your integration in the catalog. The logo file must be less than one MB. See [Logo guidelines](/docs/guides/submit-app-prereq/main/#logo-guidelines). |

    `*` Required properties

#### Integration variables

Continue with the OIN Wizard and configure integration variables if your URLs are dynamic for each tenant. The variables are for your customer admins to add their specific tenant values during installation.

<StackSnippet snippet="variable-desc" />
<br>

1. Click the **Integration variables** dropdown arrow and specify the name and label for each variable:

    | <div style="width:100px">Property</div> | Description  |
    | --------------- | ------------ |
    | **Label** `*`  | A descriptive name for the dynamic variable that administrators see when they install your app integration. |
     | **Name** `*`  | Specify the variable name. This variable name is used to construct the dynamic URL. It's hidden from admins and is only passed to your external application.<br>String is the only variable type supported.<br>The maximum field length is 1024 characters. |

     `*` This section is optional, but if you specify a variable, both `Label` and `Name` properties are required.

1. Click the **+** icon to add another variable. You can add up to 3 variables.

1. If you need to delete a variable, click the ![trash can; delete icon](/img/icons/delete_can.png) icon next to it.

 > **Note**: A variable can include a complete URL (for example, https://example.com). This enables you to use more globally useful variables such as `${org.baseURL}`.

#### <StackSnippet snippet="protocol-name" inline/> properties

Continue with the OIN Wizard and configure your protocol settings:

1. Click the **<StackSnippet snippet="protocol-name" inline/> properties** dropdown arrow and specify the following protocol properties:

    <StackSnippet snippet="protocol-properties" />

1. Click **Get started with testing** to save your edits and move to the testing experience where you need to enter your integration test details.

### Enter test information

From the OIN Wizard **Test your integration experience** section, specify information required for testing your integration. An Okta OIN analyst uses this information to verify your integration after submission.

#### Testing information

A dedicated test admin account in your app is required for Okta integration testing. This test account needs to be active beyond the submission period in case Okta needs to update or troubleshoot your app integration. Ensure that the test admin account has:

* privileges to SSO configuration in your test app
* privileges to administer test users in your test app

See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

> **Note**: This admin account is in your test app and not an account in Okta.

1. Click the **Testing information** dropdown arrow and specify the following test account details:

    | <div style="width:100px">Property</div> | Description  |
    | --------------- | ------------ |
    | **Test account URL** `*`  | This is a static URL to sign in to your app. An Okta OIN analyst goes to this URL and uses the account credentials you provide in the subsequent fields to sign in to your app. |
    | **Username** `*`  | The username for your app test admin account. The Okta OIN analyst signs in with this username to run tests. The preferred account username is `isvtest@okta.com`. |
    | **Password** `*`  | The password for your app test admin account |
    | **Support contact** `*`  | Provide an email for Okta to contact your company about your integration. This email isn't expose in the OIN catalogs or to your customers. It's for Okta to contact your company for issues during the QA testing phase or for ongoing maintenance of your integration in the OIN catalog. See [Escalation support contact](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines) in the customer support contact guidelines. |
    | **Testing instructions** `*`  | Include any other information that you think the Okta OIN analyst needs to know about your integration, the test admin account, or the testing configuration. You can also provide instructions on how to add test user accounts. |

    `*` Required properties

#### <StackSnippet snippet="protocol-name" inline/> tests

Continue with the OIN Wizard and specify your supported SSO flows:

1. Click the **<StackSnippet snippet="protocol-name" inline/> tests** dropdown arrow and specify the following sign-in flow details:

    <StackSnippet snippet="protocol-test-flow" />

1. Click **Test your integration** to save your test information and begin the testing phase.

## Test your integration

You need to test your integration to verify that the integration performs as you expect before you submit it. You must test all the SSO functions that your SSO integration supports:

* [Admin configuration flow](#how-to-prepare-your-integration-instance-for-testing)
* [IdP flow](#how-to-test-an-idp-flow)
* [SP flow](#how-to-test-an-sp-flow)
* [Just in time (JIT) flow](#how-to-test-the-jit-feature)

The **Test your integration experience** section of the OIN Wizard helps you prepare and test your integration within the same org. You can generate an integration instance from the information you provided in the wizard. The generated instance allows you to test your customer admin experience as well as your end user sign-in experience.

The test cases presented in this section are the minimum tests that you need to execute to ensure that your sign-in flow works as expected. Ideally, you want to execute several variations of these test cases with negative and edge cases in mind.

### How to prepare your integration instance for testing

To prepare your app integration instance for testing, you need to execute the following test cases:

1. As the customer admin persona, [generate the integration instance](#generate-the-instance-for-the-idp-flow).
2. As the customer admin persona, [assign test users to the integration instance](#assign-test-users-to-your-integration-instance).

#### Generate the instance for the IdP flow

This flow tests the customer admin experience. The test steps start from the OIN Wizard to generate the instance, then they shift to [add an existing app integration](https://help.okta.com/en-us/content/topics/apps/apps-add-applications.htm), where you assume the customer admin persona. When your integration is published in the OIN catalog, the customer admin uses the Admin Console **Browse App Catalog** > [add an existing app integration](https://help.okta.com/en-us/content/topics/apps/apps-add-applications.htm) page to add your integration to their org. So the following steps (after step 1) are exactly what your customer admins experience.

Prerequisites:

* Completed the integration [configuration](#configure-your-integration) and [test information](#enter-test-information) sections in the OIN Wizard

To generate an integration instance:

1. In the **Test your integration experience** section of the OIN Wizard, click **Generate Instance**. The app **General settings** tab appears.

<StackSnippet snippet="test-instance" />

#### Assign test users to your integration instance

As a customer admin persona, assign users to your app integration instance to test your SSO flow. Create your test users in Okta before you assign them to your integration. See [Add users manually](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-add-users.htm).

Prerequisites:

* [Generated the app integration instance in the OIN Wizard](#generate-the-instance-for-the-idp-flow)
* Sign-on options are configured for the instance

To assign test users to your integration:

1. From your app page in the Admin Console, click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have Single Sign-On into your application, and then click **Assign** for each.
1. Verify the user-specific attributes for any people that you add, and then select **Save and Go Back**.
1. Click **Done**.

### How to test an IdP flow

Test the IdP sign-in flow as a customer end-user persona. Use an end user that you [assigned to your integration](#assign-test-users-to-your-integration-instance). This sign-in flow initiates from the Okta End-User Dashboard.

#### Sign in with the IdP flow

Prerequisites:

* app integration supports IdP SSO
* [app integration instance was generated in the OIN Wizard](#generate-the-instance-for-the-idp-flow)
* the test end user used to sign in to the app was [assigned to the integration](#assign-test-users-to-your-integration-instance)

To test the SSO IdP flow:

1. Open a new Incognito window in your browser.
1. Navigate to your developer-edition Okta org. For example: `https://dev-12345678.okta.com`
1. Sign in to the Okta End-User Dashboard as an end user that was assigned the integration.
    > **Note**: If you sign in as a non-admin user to your Okta org from a browser, the End-User Dashboard appears.
1. Confirm your app tile appears on the Okta End-User Dashboard.
1. Click your app tile and confirm that you can sign in successfully.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

### How to test an SP flow

To test the SP flow (the app-initiated flow), you need to execute the test cases as a customer end-user persona. Use one of the test end users you previously [assigned to your integration](#assign-test-users-to-your-integration-instance).

There are two options to sign in with the SP-initiated flow:

1. Direct URL: [Sign in with a direct URL for the SP flow](#sign-in-with-a-direct-url-for-the-sp-flow)
2. Sign-in page: [Sign in with the app sign-in page for the SP flow](#sign-in-with-the-app-sign-in-page-for-the-sp-flow)

#### Sign in with a direct URL for the SP flow

Prerequisites:

* app integration supports SP-initiated SSO
* [app integration instance was generated in the OIN Wizard](#generate-the-instance-for-the-idp-flow)
* the test end user was [assigned to the integration](#assign-test-users-to-your-integration-instance)

To test the SP-initiated flow with a direct URL:

1. Open a new Incognito window in your browser.
1. Navigate to the app sign-in page directly from the browser URL address field (for example: `https://berryfarm.example.org/strawberry/signin`). The browser redirects you to Okta for authentication.
1. Sign in with Okta credentials for the test end user.
1. Confirm that you've successfully signed in to the app.
    > **Note**: If you have multiple apps in the OIN catalog, verify that you've signed in to the correct app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

#### Sign in with the app sign-in page for the SP flow

Prerequisites:

* app integration supports SP-initiated SSO
* [app integration instance was generated in the OIN Wizard](#generate-the-instance-for-the-idp-flow)
* the test end user was [assigned to the integration](#assign-test-users-to-your-integration-instance)

To test the SP-initiated flow with a sign-in page:

1. Open a new Incognito window in your browser.
1. Navigate to the app sign-in page.
1. Take any action required on the sign-in page to initiate the sign-in process (such as clicking a sign-in button)
1. Sign in with Okta credentials for the test end user.
1. Confirm that you've successfully signed in to the app.
    > **Note**: If you have multiple apps in the OIN catalog, verify that you've signed in to the correct app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

### How to test the JIT feature

#### Prepare your instance for JIT

#### Test the JIT flow

Option 1

Option 2

## Submit your integration

After you submit your integration, an Okta OIN analyst performs an initial review of your submission details. They send an email to you with any submission issues correct.

After the initial review is complete and all the issues are corrected, the submission moves to the QA testing phase. An Okta OIN analyst uses the testing information you provide in the OIN Wizard to test your integration. They send you an email with any test failure or issues to correct.

1. Close the incognito browser window and return to the Test your Okta customer experience page in the App Template Wizard
2. Select the checkbox for “I certify that I have successfully completed the testing phase” and click Submit your integration
3. On the Thank you for your submission confirmation page, select Close wizard

## See also

Should we sent users that have advanced integrations to the OIN Manager???

<StackSnippet snippet="see-also" />
