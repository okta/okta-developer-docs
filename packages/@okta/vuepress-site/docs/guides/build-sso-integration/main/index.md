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

#### Learning outcome

Create and test an SSO app integration for OIN submission.

#### What you need

* [Okta Integrator Free Plan organization](https://developer.okta.com/signup/)
* An app to integrate SSO with Okta

---

## Overview

Single Sign-On (SSO) is an authentication method that enables end users to sign in to multiple applications (apps) with one set of credentials. If you have customers that use Okta as an Identity Provider, you want to publish your SSO app integration to the OIN. By having your integration in the OIN catalog, your customers can easily configure SSO for your app. See [Overview of Single Sign-On in the OIN](/docs/guides/oin-sso-overview) for all the benefits of having your integration in the OIN catalog.

To create an SSO integration for the OIN, first sign up for a free [Okta Integrator Free Plan organization](https://developer.okta.com/signup/). Next, select the type of SSO protocol that you want to implement. Okta supports two SSO standards for your integration:

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

> **Note**: This section assumes that you already built the SSO integration in your app.

Instructions for adding your SSO integration into Okta depend on if you want to provide a public or private integration:

<div class="three-quarters">

![Public or private integration decision](/img/oin/publicOrPrivateIntegration.png)

</div>

<!--
Source link: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4481-74679&mode=design&t=lnUeadtDVve0T0Nh-0
-->

### Submit an OIN integration

If you want to publish your integration in the Okta Integration Network (OIN), follow the instructions in [OIN Wizard: Submit an SSO integration](/docs/guides/submit-oin-app/). This guide shows you how to use the OIN Wizard to:

* Add required integration artifacts and metadata.
* Create an app integration instance for testing.
* Test your SSO flows.
* Submit your integration for OIN verification.

Having your SSO integration public in the OIN catalog provides you with exposure to all Okta customers.

> **Notes:**
> * Creating an app integration instance doesn't automatically make it available in the [OIN](https://www.okta.com/integrations/). After you test your integration, [submit it](/docs/guides/submit-oin-app/-/main/#submit-your-integration) to the OIN team for verification and publication.
> * The OIN Wizard doesn't support new SSO integrations with more than three app instance variables or advanced SAML features.

### Add a private integration

If you want your integration to exist only in your Okta org, follow the instructions in [Add a private SSO integration](/docs/guides/add-private-app/). This guide shows you how to use the Application Integration Wizard (AIW) in the Admin Console to:

* Create your app integration instance.
* Test your SSO flows.

Your org users can access your app after SSO is configured.

The following are common use cases for adding a private SSO integration:

* I want to test my SSO integration in my Okta Integrator Free Plan organization. I have no immediate plans to have it publicly available.
* I want my SSO integration to only be available in the org I'm using.
* I have a SAML integration with more than three instance variables and advanced SAML features that aren't included in the OIN Wizard.

## Next steps

If you want to publish your integration, start the submission process to have your SSO integration included in the OIN:

* Review the [Publish an OIN integration](/docs/guides/submit-app-overview/) overview to understand the submission process for publishing an integration.
* Follow the [OIN Wizard: Submit an SSO integration](/docs/guides/submit-oin-app/) guide to submit your SSO integration.

## See also

<StackSnippet snippet="see-also" />
