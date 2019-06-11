---
title: Overview
---

Generic OpenID Connect (OIDC) allows users to sign in to an Okta org using their credentials from their existing account at an OIDC Identity Provider (IdP). A generic OIDC IdP can be a third-party IdP that supports OIDC, such as Salesforce or Yahoo or your own custom IdP. You can also configure federation between Okta orgs using OIDC as a replacement for SAML. If you want your users to be able to sign in using an existing database of credentials and sync their accounts in to Universal Directory from the external IdP, configure your Okta org to use a generic OIDC IdP.

> Note: This guide walks you through how to configure federation between Okta orgs using OIDC as a replacement for SAML. But, you can also use these steps to configure generic support of any third-party IdP that is OIDC-compliant. See [Supported Identity Providers](#supported-identity-providers).

## Features

Configuring a generic OIDC IdP allows you to use the following features:

- **User Registration**: Capture the Profile attributes from a generic OIDC IdP user and store those attributes in Okta's Universal Directory.
- **User Authentication**: After a user is registered, continue to use that generic OIDC IdP for user authentication, thus eliminating the need to store an additional username and password for that user.
- **Profile Sync**: If a user updates their profile, those changes can be reflected inside Okta the next time that they use the IdP to sign in.
- **Support for Multiple Social Profiles**: Multiple Social Profiles can all be linked to one Okta user.
- **OAuth 2.0 Scope Configuration**: Specify OAuth 2.0 scopes to fully control which attributes are linked to Okta.

## Grant Types Supported
By default, all OIDC IdPs are configured with the Authorization Code grant type in Okta. You can also use the Implicit (Hybrid) grant type. For more information on grant type flows, see [Choosing an OAuth 2.0 Flow](https://developer.okta.com/docs/concepts/auth-overview/#choosing-an-oauth-20-flow).

## The Generic OIDC IdP Process

![Generic OIDC Flow width:](/img/OIDC-Okta-scenario.png "Generic OIDC Flow width:")

> Note: Okta is acting as an app in this scenario, being authenticated by the IdP.

1. A user that wants access to Okta clicks a **Sign in with X** link to use an OIDC IdP to authenticate.
2. An authentication and authorization request is sent to the IdP `/authorize` endpoint (an IdP acting as the OIDC IdP and the authorization server in this example).
3. The IdP prompts the user to authenticate and then asks the user to accept the permissions required by Okta.
4. After gaining authorization from the user, the IdP redirects the user agent to Okta with a one-time code in the response.
5. Okta sends a request for access and ID tokens to the IdP `/token` endpoint using the one-time code and the scopes (`openid`, `profile`, `email`). The IdP sends the access and ID tokens to Okta.
6. Okta uses the access and ID tokens to obtain user details from the IdP `/userinfo` endpoint. The IdP sends the user details back in the response.
7. The user agent/browser is redirected to Okta and the user profile at the IdP is linked to the user profile in Okta.
8. Okta creates a session for the user, and the user can then access the application.

## The Set Up Process

To set up a generic OIDC IdP, you must configure the following:

- An IdP client application in an org that is used to authenticate and authorize the user.
Note: The IdP must be OIDC-compliant.
- An IdP in your Okta org that details the IdP's configuration and the mapping between Okta users and IdP users.
- An OIDC application, which is the app that consumes the response from the IdP after authentication and authorization, allowing users access.

### Supported Identity Providers

The following fully-tested IdPs are supported. To set up these IdPs, follow the steps outlined in this guide, using that IdP's well-known configuration URL to obtain the appropriate endpoints and the required scopes. To create a client application and obtain the client ID and secret, refer to the relevant IdP's documentation.

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
