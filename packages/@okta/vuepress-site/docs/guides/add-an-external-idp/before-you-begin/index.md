---
title: Before you begin
meta:
  - name: description
    content: Okta supports authentication with external OpenID Connect Identity Providers as well as SAML (also called Inbound Federation). Get an overview of the process and prerequisites, as well as the instructions required to set one up.
---
You want to give your users the freedom to choose which Identity Provider that they can use to sign in to your application. Okta manages connections to Identity Providers for your application, sitting between your application and the Identity Provider that authenticates your users. The industry-standard term for this is Inbound Federation.

We also support additional services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

This guide assumes that you:

* Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Have an application that you want to add authentication to.

> **Note:** This guide doesn't explain the differences between SAML and OpenID Connect and doesn't help you choose between them. See [External Identity Providers](/docs/concepts/identity-providers/#the-big-picture) for more information.

## Supported Identity Providers

We support a lot of Identity Providers. This guide provides instructions for the following Identity Providers. If the provider that you need isn't listed, we may still support it through generic OpenID Connect or SAML. The Identity Provider's documentation should say which protocol you need to use.

* [Apple](/docs/guides/add-an-external-idp/apple/create-an-app-at-idp/)
* [Azure AD](/docs/guides/add-an-external-idp/azure/create-an-app-at-idp/)
* [Facebook](/docs/guides/add-an-external-idp/facebook/create-an-app-at-idp/)
* [Google](/docs/guides/add-an-external-idp/google/create-an-app-at-idp/)
* [LinkedIn](/docs/guides/add-an-external-idp/linkedin/create-an-app-at-idp/)
* [Microsoft](/docs/guides/add-an-external-idp/microsoft/create-an-app-at-idp/)
* [Okta to Okta](/docs/guides/add-an-external-idp/oktatookta/create-an-app-at-idp/)
* [OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/create-an-app-at-idp/)
* [SAML 2.0](/docs/guides/add-an-external-idp/saml2/create-an-app-at-idp/)

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
