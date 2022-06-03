---
title: Add a social Identity Provider
meta:
  - name: description
    content: Okta supports authentication with social Identity Providers. Get an overview of the process and prerequisites, as well as the setup instructions.
showStackSelector: False
---

## <StackSnippet snippet="idp" inline />

This document explains how to configure <StackSnippet snippet="idp" inline /> as an external social Identity Provider (IdP) for your application by creating an application on <StackSnippet snippet="idp" inline />, creating an Identity Provider in Okta, testing the configuration, and creating a sign-in button.

Okta manages the connection to the IdP for your application, sitting between your application and the IdP that authenticates your users. The industry-standard term for this is Inbound Federation. When a user signs in, you can link the user’s <StackSnippet snippet="idp" inline /> account to an existing Okta user profile or choose to create a new user profile using Just-In-Time (JIT) provisioning.

> **Note:** We also support additional services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

---

**Learning outcomes**

Configure a social Identity Provider so that your users can quickly sign up or sign in to your application by using their social Identity Provider account.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An OpenID Connect (OIDC) app integration in Okta. You can [create a new OIDC app integration using AIW](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) or use an existing one.
* An account with <StackSnippet snippet="idpaccount" inline />

---

## Create an app at the Identity Provider

1. <StackSnippet snippet="create-app" inline />

1. When you create an application at the IdP, you need to provide a redirect URI for authentication.

    The redirect URI sent in the authorize request from the client needs to match the redirect URI set at the IdP. This URI is where the IdP sends the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URI has the same structure for most IdPs in Okta and is constructed using your Okta subdomain and the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URI would be `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

1. Save the generated <StackSnippet snippet="idp" inline /> client ID and client secret values. You need them to configure your Identity Provider in Okta.

## Create the Identity Provider in Okta

To add <StackSnippet snippet="idp" inline /> as an Identity Provider in Okta:

1. In the Admin Console, go to **Security** > **Identity Providers**.
1. Click **Add Identity Provider**, and then select **<StackSnippet snippet="idp" inline /> IdP**. <StackSnippet snippet="alt-idp" inline />
1. Click **Next**.
1. In the **General Settings** section, define the following:

    * **Name**: Enter a name for the Identity Provider in Okta.
    * **Client ID**: Paste the generated client ID from your <StackSnippet snippet="idp" inline /> application.
    * **Client Secret**: Paste the generated client secret from your <StackSnippet snippet="idp" inline /> application.
    * **Scopes**: Leave the defaults for a simple sign-in flow. You can also add more scopes. See <StackSnippet snippet="scopes" inline />.

1. Click **Finish**.

## Test the integration

You can test your integration by configuring a [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) to use <StackSnippet snippet="idp" inline /> as the Identity Provider.

Alternatively, you can use the Authorize URL to simulate the authorization flow. The Okta Identity Provider that you created generated an authorize URL with a number of blank parameters that you can fill in to test the flow with the Identity Provider. The authorize URL initiates the authorization flow that authenticates the user with the Identity Provider.

In the URL, replace `${yourOktaDomain}` with your org's base URL, and then replace the following values:

* `client_id`: Use the `client_id` value from your Okta app integration. This is not the `client_id` from the Identity Provider. For example, `0oawjqpb2wcUAWM8C0h7`.

* `response_type`: Determines which flow is used. For the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow, use `id_token`. For the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow, use `code`.

* `response_mode`: Determines how the authorization response is returned. Use `fragment`.

* `scope`: Determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each with a `%20` (space character). You need to include at least the `openid` scope. You can request any of the standard OpenID Connect scopes about users, such as `profile` and `email` as well as any custom scopes specific to your Identity Provider.

* `redirect_uri`: The location where Okta returns a browser after the user finishes authenticating with their Identity Provider. This URL must start with `https` and must match one of the redirect URIs that you configured in the previous section.

* `state`: Protects against cross-site request forgery (CSRF). This can be set to any value.

* `nonce`: A string included in the returned ID token. Use it to associate a client session with an ID token and to mitigate replay attacks. This can be set to any value.

For a full explanation of all of these parameters, see: [/authorize Request parameters](/docs/reference/api/oidc/#request-parameters).

An example of a complete URL looks like this:

```bash
https://${yourOktaDomain}/oauth2/v1/authorize?idp=${idp_id}&client_id=${client_id}&response_type=id_token&response_mode=fragment&scope=openid%20email&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo
```

<StackSnippet snippet="noemail" />

## Add the Identity Provider to the Okta Sign-In Widget

> **Note:** This section is only for Okta Classic Engine. If you are using Okta Identity Engine, the Sign in with IdP option is available on the widget after you've [created the Identity Provider in your Okta org](#create-the-identity-provider-in-okta) and configured the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). No additional code is required. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version and see [Upgrade your widget](/docs/guides/oie-upgrade-sign-in-widget/main/#idp-discovery) for upgrade considerations to Identity Engine.

The [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) is an embeddable JavaScript widget that reproduces the look and behavior of the standard Okta sign-in page. You can add a **Sign in with <StackSnippet snippet="idp" inline />** button to the widget by adding the following code to your Okta Sign-In Widget configuration. Replace `Your_IDP_ID` with the Identity Provider ID from your Identity Provider that you created in Okta in the [Create the Identity Provider in Okta](#create-the-identity-provider-in-okta) section.

To find your Identity Provider ID:

1. In the Admin console, go to **Security** > **Identity Providers**.
1. On the **Identity Providers** page, select the **Identity Provider** tab.
1. Select your Identity Provider from the list. **IdP ID** contains your Identity Provider ID.

<StackSnippet snippet="siwconfig" />

## Next steps

You should now understand how to add a social Identity Provider and have successfully added and tested the integration.

To map Okta attributes to app attributes, use the [Profile Editor](https://help.okta.com/okta_help.htm?id=ext_app_map).

To add another Identity Provider, start by choosing an [external Identity Provider](/docs/guides/identity-providers/).
