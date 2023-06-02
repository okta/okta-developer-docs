---
title: Build a Single Sign-On (SSO) integration
excerpt: Create an app integration using Security Assertion Markup Language (SAML) or OpenID Connect (OIDC).
meta:
  - name: description
    content: Use this guide to learn how to build federated Single Sign-On into your Okta integration.
layout: Guides
---

This guide teaches you how to build federated SSO with Okta for your application. This guide assumes that you intend to make this app integration public by publishing it in the Okta Integration Network (OIN).

---

**Learning outcomes**

* Create and test an SSO app integration for OIN submission.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* An app to integrate with Okta

---

## Overview

Single Sign-On (SSO) is an authentication method that enables end users to sign in to multiple applications (apps) with one set of credentials. If you have customers that use Okta as an Identity Provider, you want to publish your app SSO integration to the OIN. See [Overview of Single Sign-On in the OIN](/docs/guides/oin-sso-overview) for all the benefits of having your app SSO integration in the OIN catalog.

To create an SSO integration for the OIN, first sign up for a free [Okta Developer Edition org](https://developer.okta.com/signup/). Next, select the protocol that you want to implement SSO. Okta supports two SSO standards for your integration:

* OpenID Connect (OIDC)
* Security Assertion Markup Language (SAML)

> **Note:** Not all Okta SSO features are supported in the OIN. See [OIN limitations](/docs/guides/submit-app-prereq/main/#oin-limitations) for OIDC and SAML limitations.

### Deployment models

After you've decided on a protocol, select a deployment model. Okta offers [redirect](/docs/concepts/redirect-vs-embedded/#redirect-authentication) or [embedded](/docs/concepts/redirect-vs-embedded/#embedded-authentication) authentication deploy models for SSO. Redirect authentication uses the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#okta-sign-in-widget) and is the easiest, most secure way to integrate with Okta.

Okta recommends the redirect authentication deployment model if your situation meets the [requirements](/docs/concepts/redirect-vs-embedded/#redirect-vs-embedded). For more information on deployment models and other authentication considerations, see:

* [Okta deployment models&mdash;redirect vs. embedded](/docs/concepts/redirect-vs-embedded/)
* [Redirect authentication guides](/docs/guides/redirect-authentication/)
* [Embedded authentication guides](/docs/guides/embedded-authentication/)
* [Deployment models and the Authentication API](/docs/concepts/redirect-vs-embedded/#deployment-models-and-the-authentication-api)

## Prepare your integration

After you've decided which protocol is right for your needs, you need to plan and gather some information for your integration.

<StackSnippet snippet="prep" />

## Create your integration

Create an SSO integration inside the Okta org associated with your developer account. Use the Application Integration Wizard (AIW) in the Admin Console to create your integration.

>**Note:** Creating your SSO app integration doesn't automatically make it available in the [OIN](https://www.okta.com/integrations/). After you've created and tested it, you need to [submit your app integration](/docs/guides/submit-app/) to the OIN.

1. Sign in to your [developer-edition Okta org](/login/) as a user with administrative privileges.
1. In the Admin Console, go to  **Applications** > **Applications**.
1. Click **Create App Integration**.

<StackSnippet snippet="create" />

## Specify your integration settings

This portion of the guide takes you through the steps for configuring your specific SSO integration using the Okta Admin Console.

After you create your integration in the [Create your integration](#create-your-integration) step, the main settings page appears for your new integration in the Admin Console. Specify **General Settings** and **Sign On** options, and assign the integration to users in your org. Click **Edit** if you need to change any of the options, and **Save** when you've made your changes.

<StackSnippet snippet="settings" />

## Test your integration

This portion of the guide takes you through the steps required to test your integration.

### Assign users

First, you must assign your integration to one or more test users in your org:

1. Click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have Single Sign-On into your application, and then click **Assign** for each.
1. Verify the user-specific attributes for any people that you add, and then select **Save and Go Back**.
1. Click **Done**.

### Test Single Sign-On

1. Sign out of your Okta org. Click **Sign out** in the upper-right corner of the Admin Console.
1. Sign in to the Okta End-User Dashboard as the regular user that was assigned the integration.
1. Click the Okta tile for the integration and confirm that the user is signed in to your application.

<StackSnippet snippet="test" />

## Next steps

After you complete testing your integration, you can start the submission process to have your integration included in the [Okta Integration Network](https://www.okta.com/okta-integration-network/) catalog:
* Review the [OIN submission requirements](/docs/guides/submit-app-prereq/) before starting the submission process.
* Follow the [Publish an OIN integration](/docs/guides/submit-app) guide to submit your SSO integration through the OIN Manager.

## See also

* [Okta SAML FAQs](/docs/concepts/saml/faqs/)
* [Okta Developer Forum: OIDC](https://devforum.okta.com/search?q=oidc)
* [Stack Overflow: Okta OIDC](https://stackoverflow.com/search?q=oidc+okta)
* [Okta Developer Forum: SAML](https://devforum.okta.com/search?q=saml)
* [Stack Overflow: Okta SAML](https://stackoverflow.com/search?q=saml+okta)