---
title: Submit an integration with the OIN Wizard
meta:
  - name: description
    content: Use this guide to learn how to submit your integration to the Okta Integration Network (OIN) team for publication. The submission task is performed in the Okta Admin Console through the OIN Wizard.
layout: Guides
---

Use this guide to learn how to submit a Single Sign-On (SSO) integration to the Okta Integration Network (OIN) team using the OIN Wizard. This guide also shows you how to create an SSO integration instance for testing in your org.

---

**Learning outcomes**

* Learn how to submit an SSO integration using the OIN Wizard
* Learn how to create an integration instance for testing from the OIN Wizard

**What you need**

* An [Okta Developer Edition org](https://developer.okta.com/signup/)

* A functional SSO integration created and tested in accordance with the [Build a Single Sign-On integration](/docs/guides/build-sso-integration/) guide

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

---

## Overview

Okta provides you with a seamless experience in the Okta Admin Console to integrate and submit your app for publication in the [Okta Integration Network (OIN)](https://www.okta.com/okta-integration-network/). When you obtain an [Okta Developer-Edition org](https://developer.okta.com/signup/), you can use it as a sandbox to integrate your app with Okta, as well as explore additional Okta features. When you decide to publish your integration to the OIN, you can use the same developer org to  and integrate your . You can create your app integration and add it to your developer-edition org for testing. Once you're satisfied with your tests, you can submit your integration to the OIN team directly from your developer-edition org Admin Console. The OIN team verifies your integration before they publish it in the [OIN catalog](https://www.okta.com/integrations/).

> **Note:** Only cloud-based SaaS apps (either traditional Web applications with a back-end or a modern browser-based SPA) are published in the OIN catalog.

### Protocols supported

This guide covers submissions that use the following protocols:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

    > **Note:** <br>
    > * To support the potentially large number of Okta orgs that access an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.
    > * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

    > **Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

> **Note:** SWA app integrations are no longer accepted for publication in the OIN catalog. However, the OIN team still maintains existing SWA apps.

## Submit an integration

You need to review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission. There are artifacts and technical details that you need to provide during the submission process.

> **Note:** For best practices, create two or three additional administrative users in your Okta org to manage the integration. This ensures that your team can access the integration for updates in the future.

To submit an integration for OIN publication:

1. Sign in to your [developer-edition Okta org](/login/) as a user with administrative privileges.
1. Go to **Applications** > **My OIN Integrations** in the Admin Console.
1. Click **Build new OIN integration**. The Okta Integration Network Wizard appears.
1. From the **Select your protocol** section of the page, select **<StackSnippet snippet="protocol-name" inline/>**.
    > **Note:** If you want to change the protocol instructions in this guide, select the protocol you want from the **Instructions for** dropdown list on the right of this page.
1. Click **Next: Configure your integration**.

### Configure your integration

Continue with the OIN wizard and configure your integration:

1. Click the **OIN catalog display** dropdown arrow and specify the following OIN catalog information:

    | Property | Description  |
    | ----------------- | ------------ |
    | **Display name**  | Provide a name for your integration. This is the main title used for your integration in the OIN. |
    | **Description** | Give a general description of your application and what the Okta integration does. See [App description guidelines](/docs/guides/submit-app-prereq/main/#app-description-guidelines). |
    | **Logo** | Upload a PNG, JPG, or GIF file of a logo to accompany your integration in the catalog. The logo file must be less than one MB. See [Logo guidelines](/docs/guides/submit-app-prereq/main/#logo-guidelines). |

### Integration variables

If your SSO URL, ACS URL, or Audience URI vary per tenant, you need to specify the variables required for your integration to be configured for each tenant. Your customer administrators would add their specific values for these variables when they install your integration.

For example, if you have SAML configuration variable called `subdomain`, then you can set your ACS URL string to be `https://${org.subdomain}.example.org/strawberry/login`. When your customer admin sets their `subdomain` variable to `berryfarm`, their ACS URL would be `https://berryfarm.example.org/strawberry/login`

Continue with the OIN wizard and configure your integration variables:

1. Click the **Integration variables** dropdown arrow and specify the name and label for each variable:

    | Property | Description  |
    | -------- | ------------ |
    | **Label**  | A descriptive name for the dynamic variable that administrators see when they install your app integration. |
     | **Name**  | An automatically generated variable used when constructing the dynamic address. This is hidden from admins and is only passed to your external application. |

    > **Note:** The only property type supported for an integration variable is `String`.

1. Click the **+** icon to add another variable. You can add up to 3 variables.

1. If you need to delete a variable, click the ![trash can; delete icon](/img/icons/delete_can.png) icon next to it.

### Protocol properties <StackSnippet snippet="protocol-name" inline/>

Continue with the OIN wizard and configure your protocol settings:

1. Click the **<StackSnippet snippet="protocol-name" inline/>** dropdown arrow and specify the following protocol properties:

    <StackSnippet snippet="protocol-properties" />

1. Click **Get started with testing** to save your changes and move to the testing phase.

## Test your integration

From the Okta Integration Network Wizard, click **Next: Test your integration** after you've saved your integration configuration. This action begins testing your integration. You need to test the following flows:

* IdP flow: If your integration supports IdP-initiated SSO
* SP flow: If your integration supports SP-initiated SSO
* Just in time (JIT) flow: If your application supports JIT

### IdP flow test

#### Prepare your instance for an IdP flow

**Test account**

The Okta OIN team requires a dedicated account on your application to run their tests. Ensure that this test account is active beyond the submission period in case Okta needs to update or troubleshoot your app integration. See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

| Property/Question | Description  |
| -------- | ------------ |
|  **Test account URL** | This is a static URL to sign in to your application. An Okta OIN team member goes to this URL and uses the account credentials you provide in the subsequent fields to sign in to your application. |
| **Test account username or email** | The username for your application test account. The Okta OIN team signs in with this username to run tests. The preferred account username is `isvtest@okta.com`. |
| **Test account password** | The password for your application test account. |
| **Additional instructions** | Include any other information that you think the Okta OIN team needs to know about your integration, the test account, or the testing configuration. |


#### Test the IdP flow

### SP flow test

#### Prepare your instance for an SP flow

#### Test the SP flow

Option 1: Direct URL

Option 2: Login page

### JIT flow test

#### Prepare your instance for JIT

#### Test the JIT flow

Option 1

Option 2

## Submit your integration

1. Close the incognito browser window and return to the Test your Okta customer experience page in the App Template Wizard
2. Select the checkbox for “I certify that I have successfully completed the testing phase” and click Submit your integration
3. On the Thank you for your submission confirmation page, select Close wizard

## See also

Should we sent users that have advanced integrations to the OIN Manager???

<StackSnippet snippet="see-also" />
