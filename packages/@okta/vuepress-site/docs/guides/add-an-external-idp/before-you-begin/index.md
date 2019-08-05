---
title: Before you begin
---
You want to give your users the freedom to choose which Identity Provider that they use to sign in to your application. Okta manages connections to Identity Providers for your application, sitting between your application and the Identity Provider that authenticates your users.

We also support additional services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

This guide assumes that you:

* Have an Okta Developer Edition organization. (Don't have one? [Create one for free](https://developer.okta.com/signup).)
* Have an application that you want to add authentication to.

<StackSelector snippet="prereq" />

## Supported Identity Providers
We support a lot of Identity Providers. This guide provides instructions for the following Identity Providers. If the provider that you need isn't listed, we may still support it through generic OAuth 2, OpenID Connect, or SAML. The Identity Provider's documentation should say which protocol you need to use.

* Facebook
* Google
* LinkedIn
* Microsoft
* SAML 2.0

### Supported OpenID Connect Identity Providers
To set up third-party Identity Providers that support OpenID Connect, such as Salesforce or Paypal, or your own custom Identity Provider, follow the steps outlined in this guide. Use the Identity Provider's well-known configuration URL to obtain the appropriate endpoints and the required scopes:

**IdP**: AWS Cognito User Pools<br>
**Well-Known Configuration URL**: `https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/openid-configuration`<br>
**Details**: In the URL, replace `{region}` and `{userPoolId}` with the appropriate values.<br>

**IdP**: Intuit<br>
**Well-Known Configuration URL**: `https://developer.intuit.com/.well-known/openid-configuration/`<br>

**IdP**: Line<br>
**Well-Known Configuration URL**: `https://access.line.me/.well-known/openid-configuration`<br>

**IdP**: Microsoft Azure AD<br>
**Well-Known Configuration URL**: `https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration`<br>
**Details**: In the URL, replace `{tenant}` with the appropriate value.<br>

**IdP:** PayPal<br>
**Well-Known Configuration URL**: `https://www.paypal.com/.well-known/openid-configuration`<br>
**Details**: Use this `/userinfo` endpoint, as it returns a well-formatted email for Okta to consume: `https://api.sandbox.paypal.com/v1/identity/openidconnect/userinfo/?schema=openid`<br>

**IdP**: Salesforce<br>
**Well-Known Configuration URL**: `https://login.salesforce.com/.well-known/openid-configuration`<br>

**IdP** TrustedKey<br>
**Well-Known Configuration URL**: `https://wallet.trustedkey.com/.well-known/openid-configuration`<br>

**IdP**: Twitch<br>
**Well-Known Configuration URL**: `https://id.twitch.tv/oauth2/.well-known/openid-configuration`<br>

**IdP**: Yahoo<br>
**Well-Known Configuration URL**: `https://login.yahoo.com/.well-known/openid-configuration`<br>
**Details**: It is necessary to include the `sddp-w` scope during app creation at `developer.yahoo.com`.<br>

<NextSectionLink/>

