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

> **Note**: This section assumes that you've built the SSO integration in your app.

Instructions for adding your SSO integration into Okta depend on if you want to provide a public or private integration:

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

* **Submit an OIN integration**: If you want to publish your integration in the Okta Integration Network (OIN), follow the instructions in [OIN Wizard: Submit an SSO integration](/docs/guides/submit-oin-app/). This guide shows you how to use the OIN Wizard to add the artifacts required for a public integration, how to add an app integration instance for testing, and how to test your SSO flows.

   > **Note:** Creating an app integration instance doesn't automatically make it available in the [OIN](https://www.okta.com/integrations/). After you've tested your integration, you need to [submit it](/docs/guides/submit-oin-app/-/main/#submit-your-integration) to the OIN team for verification and publication.

* **Private app integration**: If you want your integration to exist only in your Okta org, then follow the instructions in [Add a private SSO integration](/docs/guides/add-private-app). This guide shows you how to use the Application Integration Wizard (AIW) in the Admin Console to create your app integration instance and start testing SSO. Your org users can access your app once SSO is configured.

   > **Note:** If you have an advanced SSO integratison that you can't submit through the OIN Wizard, follow the instructions in [Add a private SSO integration](/docs/guides/add-private-app) to test your integration. After you've successfully tested your integration, submit your advanced integration through the OIN Manager. See [OIN Manager: Submit an advanced SAML integration](/docs/guides/submit-sso-app).

## Next steps

Follow either pathways:

* [OIN Wizard: Submit an SSO integration](/docs/guides/submit-oin-app/)&mdash;for the following use case:
   - I want my SSO integration to be in the OIN catalog for exposure to all Okta customers.

* [Add a private SSO integration](/docs/guides/add-private-app)&mdash;for the following use case:
   - I want my SSO integration only to be available in the org I'm using.
   - I have a SAML integration with advanced instance variables and SAML features not included in the OIN Wizard.

## See also

* [Okta SAML FAQs](/docs/concepts/saml/faqs/)
* [Okta Developer Forum: OIDC](https://devforum.okta.com/search?q=oidc)
* [Stack Overflow: Okta OIDC](https://stackoverflow.com/search?q=oidc+okta)
* [Okta Developer Forum: SAML](https://devforum.okta.com/search?q=saml)
* [Stack Overflow: Okta SAML](https://stackoverflow.com/search?q=saml+okta)
