---
title: Build a Single Sign-On (SSO) integration
excerpt: Create an app integration using Security Assertion Markup Language (SAML) or OpenID Connect (OIDC).
meta:
  - name: description
    content: Use this guide to learn how to integrate federated Single Sign-On with Okta for your app.
layout: Guides
---

This guide teaches you how to integrate your federated SSO application with Okta. This guide assumes that you intend to make this app integration public by publishing it in the Okta Integration Network (OIN).

---

**Learning outcomes**

Create and test an SSO app integration for OIN submission.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* An app to integrate SSO with Okta

---

## Overview

Single Sign-On (SSO) is an authentication method that enables end users to sign in to multiple applications (apps) with one set of credentials. If you have customers that use Okta as an Identity Provider, you want to publish your SSO app integration to the OIN. By having your integration in the OIN catalog, your customers can easily configure SSO for your app. See [Overview of Single Sign-On in the OIN](/docs/guides/oin-sso-overview) for all the benefits of having your integration in the OIN catalog.

To create an SSO integration for the OIN, first sign up for a free [Okta developer-edition org](https://developer.okta.com/signup/). Next, select the type of SSO protocol that you want to implement. Okta supports two SSO standards for your integration:

* **OpenID Connect (OIDC)** (preferred)
* **Security Assertion Markup Language (SAML)**

Okta recommends using OIDC for new SSO integrations.

> **Note:** Not all Okta SSO features are supported in the OIN. See [OIN limitations](/docs/guides/submit-app-prereq/main/#oin-limitations).

### Deployment models

After you've decided on a protocol, select a deployment model. Okta offers [redirect](/docs/concepts/redirect-vs-embedded/#redirect-authentication) or [embedded](/docs/concepts/redirect-vs-embedded/#embedded-authentication) authentication deploy models. Redirect authentication uses the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#okta-sign-in-widget) and is the easiest, most secure way to integrate with Okta.

Okta recommends the redirect authentication deployment model if your situation meets the [requirements](/docs/concepts/redirect-vs-embedded/#redirect-vs-embedded). For more information on deployment models and other authentication considerations, see:

* [Okta deployment models&mdash;redirect vs. embedded](/docs/concepts/redirect-vs-embedded/)
* [Redirect authentication guides](/docs/guides/redirect-authentication/)
* [Embedded authentication guides](/docs/guides/embedded-authentication/)

## Prepare your integration

<StackSnippet snippet="prep" />

## Create your integration in Okta

This section assumes that you've built the SSO integration in your app.

After you've built your SSO integration, you can use the Application Integration Wizard (AIW) in the Admin Console to create your app integration instance. This instance provides you with client credentials or metadata for you to test your SSO flows.

> **Note:** Creating your app integration instance doesn't automatically make it available in the [OIN](https://www.okta.com/integrations/). After you've tested your integration, you need to [submit it](/docs/guides/submit-app-overview/) to the OIN team for verification and publication.

1. Sign in to your [developer-edition Okta org](/login/) as a user with administrative privileges.
1. Go to **Applications** > **Applications** in the Admin Console.
1. Click **Create App Integration**.

<StackSnippet snippet="create" />

## Specify your integration settings

This portion of the guide takes you through the steps for configuring your specific SSO integration using the Okta Admin Console.

After you create your integration instance in the [Create your integration in Okta](#create-your-integration-in-okta) section, the main settings page appears for your new integration in the Admin Console. Specify **General Settings** and **Sign On** options, and assign the integration to users in your org. Click **Edit** if you need to change any of the options, and **Save** when you've made your changes.

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

   > **Note:** If you sign in as a non-admin user to your Okta org from a browser, the End-User Dashboard appears. To access the End-User Dashboard from a mobile device, see [Okta End-User-Dashboard](https://help.okta.com/okta_help.htm?type=eu&id=ext_user_dashboard_overview).

1. Click the Okta tile for the integration and confirm that the user is signed in to your app.

<StackSnippet snippet="test" />

## Next steps

After you complete testing your app integration, you can start the submission process to have your app integration included in the [Okta Integration Network](https://www.okta.com/okta-integration-network/) catalog:
* Review the [OIN submission requirements](/docs/guides/submit-app-prereq/) before starting the submission process.
* Review the [Publish an OIN integration](/docs/guides/submit-app-overview/) overview to understand the submission process for publishing an integration.
* Follow the [Submit an SSO integration](/docs/guides/submit-sso-app/) guide to submit your SSO integration.

<div class=half>

![Public or private integration decision](/img/oin/publicOrPrivateIntegration.png)

</div>

<!--
@startuml
if (Built an integration) then (Public)
   :Submit an OIN integration;
   kill
else (Private)
   :Add a private integration;
   kill
endif
@enduml
-->
## See also

* [Okta SAML FAQs](/docs/concepts/saml/faqs/)
* [Okta Developer Forum: OIDC](https://devforum.okta.com/search?q=oidc)
* [Stack Overflow: Okta OIDC](https://stackoverflow.com/search?q=oidc+okta)
* [Okta Developer Forum: SAML](https://devforum.okta.com/search?q=saml)
* [Stack Overflow: Okta SAML](https://stackoverflow.com/search?q=saml+okta)
