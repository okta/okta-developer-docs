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

## Build your integration

<StackSnippet snippet="prep" />

## Create your integration in Okta

> **Note:** This section assumes that you've built the SSO integration in your app.

Instructions for adding your integration into Okta depend on if you want to provide a public or private integration:

* **Public OIN app integration**: If you want to publish your integration in the Okta Integration Network (OIN), follow the instructions in [Submit an SSO integration](/docs/guides/submit-sso-app/). This guide shows you how to submit all the artifacts required for a public integration and how to add an integration instance for testing in your org.

  Integrations published in the OIN are publicly available to all Okta customers. See [Publish an OIN integration](/docs/guides/submit-app-overview/) to understand the submission process for publishing an integration.

  > **Note:** Creating your app integration instance doesn't automatically make it available in the [OIN](https://www.okta.com/integrations/). After you've tested your integration, you need to submit it to the OIN team for verification and publication.

* **Private app integration**: If you want your integration to exist only in your Okta org, then follow the instructions in [Add a private SSO integration](/docs/guides/submit-sso-app-private). This guide shows you how to use the Application Integration Wizard (AIW) in the Admin Console to create your app integration instance and start testing SSO. Your org users can access your app once SSO is configured.

  Single Sign-On to your app is only available to users within the org that contains the integration instance. This use case is particularly useful if you're interested in building a customer-specific integration.

  > **Note:** After you've created a private integration in your Okta org, you can later decide to share it with the community through the Okta Integration Network (OIN). If you want to make your integration public, follow the instructions in [Submit an SSO integration](/docs/guides/submit-sso-app/) to add the integration for OIN submission.

## See also

<StackSnippet snippet="see-also" />
