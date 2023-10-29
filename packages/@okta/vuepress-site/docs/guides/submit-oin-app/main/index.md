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

* [IdP flow](#how-to-test-an-idp-flow)
* SP flow
* Just in time (JIT) flow

The **Test your integration experience** section of the OIN Wizard helps you prepare and test your integration within the same org. You can generate an integration instance from the information you provided in the wizard. The generated instance allows you to test your customer admin experience as well as your end user sign-in experience.

The test cases presented in this section are the minimum tests that you need to execute to ensure that your sign-in flow works as expected. Ideally, you want to execute several variations of these test cases with edge cases in mind.

### How to test an IdP flow

To test an IdP flow, you need to:
1. As the customer admin persona, [generate the integration instance](#generate-the-instance-for-the-idp-flow).
2. As the customer end-user persona, sign in to the app from the Okta End User Dashboard.

Follow the steps to prepare and execute the IdP sign-in flow.

#### Generate the instance for the IdP flow

These steps test the customer admin experience. The customer admin uses the App Integration Wizard (AIW) to add your integration to their org for their users.

1. In the **Test your integration experience** section of the OIN Wizard, click **Generate Instance**. The **General settings** tab from the App Integration Wizard (AIW) appears.
<StackSnippet snippet="test-instance" />

#### Sign in with the IdP flow

Open a new Incognito window in your internet browser
12. Sign into your developer-edition Okta org as a user that has been assigned to the application
instance
13. Click on the icon with four boxes next to your name > My end user dashboard
14. Confirm your application tile appears on your end user dashboard
15. Click your application tile and confirm you can log into your application successfully
16. Log out from the ISV application
17. Verify that the user is able to logout and is redirected to the login screen.


### How to test an SP flow

#### Prepare your instance for an SP flow

#### Test the SP flow

Option 1: Direct URL

Option 2: Login page

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
