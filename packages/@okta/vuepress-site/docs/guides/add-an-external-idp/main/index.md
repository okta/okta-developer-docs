---
title: Add an external Identity Provider
meta:
  - name: description
    content: Okta supports authentication with external OpenID Connect Identity Providers as well as SAML (also called Inbound Federation). Get an overview of the process and prerequisites, as well as the instructions required to set one up.
---

## <StackSelector snippet="idp" noSelector inline />

This document explains how to configure <StackSelector snippet="idp" noSelector inline /> as an external Identity Provider for your application by creating an application at <StackSelector snippet="idp" noSelector inline />, creating an Identity Provider in Okta, testing the configuration, and creating a sign-in button.

Okta manages the connection to the IdP for your application, sitting between your application and the IdP that authenticates your users. The industry-standard term for this is Inbound Federation. When a user signs in, you can link the user’s Identity Provider account to an existing Okta user profile or choose to create a new user profile using Just-In-Time (JIT) provisioning.

> **Note:** We also support additional services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

---

**Learning outcomes**

How to configure an external Identity Provider so that your users can quickly sign up or sign in to your application using their social Identity Provider account.

**What you need**

* An Okta Developer Edition organization. Don't have one? [Create one for free](/signup).
* An application that you want to add authentication to. You can use an existing app integration or create a new one. To create a new app integration, see [Create custom app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard).
* An account <StackSelector snippet="idpaccount" noSelector inline />.

---

## Create an app at <StackSelector snippet="idp" noSelector inline />

At <StackSelector snippet="idp" noSelector inline />, create the client application that you want to use for authenticating and authorizing your users.

<StackSnippet snippet="appatidp" />

## Create an Identity Provider in Okta

To connect your org to the Identity Provider, add and configure that Identity Provider in Okta.

> **Note:** See the [Identity Providers API](/docs/reference/api/idps/#add-identity-provider) for request and response examples of creating an Identity Provider in Okta using the API.

1. In the Admin Console, go to **Security** > **Identity Providers**.

1. Select **Add Identity Provider** and then select **<StackSelector snippet="idp" noSelector inline />**.

1. In the **Add an Identity Provider** dialog box, define the following:

    <StackSnippet snippet="appidpinokta" />

1. Click **Add Identity Provider**. The Identity Providers page appears.

1. Locate the Identity Provider that you just added and click the arrow next it to expand.

<StackSnippet snippet="afterappidpinokta" />

> **Note:** When you are setting up your IdP in Okta, there are a number of settings that allow you to finely control the social sign-in behavior. While the provider-specific instructions show one possible configuration, [Account Linking and JIT Provisioning](/docs/concepts/identity-providers/#account-linking-and-just-in-time-provisioning) discusses configuration options in more detail so that you can choose the right configuration for your use case.

## Test the integration

You can test your integration by configuring a [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) to use <StackSelector snippet="idp" noSelector inline /> as the Identity Provider.

### Use the Authorize URL to simulate the authorization flow

You can also use the Authorize URL to simulate the authorization flow. The Okta Identity Provider that you created generated an authorize URL with a number of blank parameters that you can fill in to test the flow with the Identity Provider. The authorize URL initiates the authorization flow that authenticates the user with the Identity Provider.

> **Note:** Use this step to test your authorization URL as an HTML link. For information on using the Sign-In Widget, Okta-hosted sign-in page, or AuthJS, see [Use the Identity Provider to sign in](/docs/guides/add-an-external-idp/apple/main/#use-the-identity-provider-to-sign-in).

In the URL, replace `${yourOktaDomain}` with your org's base URL, and then replace the following values:

* `client_id` &mdash; use the `client_id` value that you obtained from the OpenID Connect client application in the previous section. This is not the `client_id` from the Identity Provider.

* `response_type` &mdash; determines which flow is used. For the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow, this should be `id_token`. For the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow, this should be `code`.

* `response_mode` &mdash; determines how the authorization response should be returned. This should be `fragment`.

* `scope` &mdash; determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each by a space. You need to include at least the `openid` scope. You can request any of the standard OpenID Connect scopes about users, such as `profile` and `email` as well as any custom scopes specific to your Identity Provider.

* `redirect_uri` &mdash; the location where Okta returns a browser after the user finishes authenticating with their Identity Provider. This URL must start with `https` and must match one of the redirect URIs that you configured in the previous section.

* `state` &mdash; protects against cross-site request forgery (CSRF). Can be any value.

* `nonce` &mdash; a string included in the returned ID token. Use it to associate a client session with an ID token and to mitigate replay attacks. Can be any value.

For a full explanation of all of these parameters, see: [/authorize Request parameters](/docs/reference/api/oidc/#request-parameters).

An example of a complete URL looks like this:

```bash
https://${yourOktaDomain}/oauth2/v1/authorize?idp=${idp_id}&client_id=${client_id}&response_type=id_token&response_mode=fragment&scope=openid%20email&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo
```

## Use the Identity Provider to sign in

To test your authorization URL, enter the complete authorization URL in a browser. Do this in your browser's privacy or incognito mode to avoid false positive or negative results.

If everything is configured properly:

* The user is redirected to the Identity Provider's sign-in page.
* After successful authentication, the user is redirected to the redirect URI that you specified, along with an `#id_token=` fragment in the URL. The value of this parameter is your Okta OpenID Connect ID token.

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

<StackSnippet snippet="useidpsignin" />

There are four primary ways to kick off the sign-in flow.

### HTML Link

Create a link that the user clicks to sign in. The HREF for that link is the authorize URL that you created in the previous section:

```bash
`<a href="https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo">Sign in with Identity Provider</a>`
```

After the user clicks the link, they are prompted to sign in with the Identity Provider. After successful sign in, the user is returned to the specified `redirect_uri` along with an ID token in JWT format.

### Okta Sign-In Widget

Okta also offers an easily embeddable JavaScript widget that reproduces the look and behavior of the standard Okta sign-in page. You can add a **Sign in with ${IdentityProviderName}** button by adding the following code to your Okta Sign-In Widget configuration:

```js
config.idps= [
  { type: 'IdentityProviderName', id: 'Your_IDP_ID_Here' }
];
config.idpDisplay = "SECONDARY";
```

You can find out more about the Okta Sign-In Widget [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget). Implementing sign in with an Identity Provider uses the Widget's [OpenID Connect authentication flow](https://github.com/okta/okta-signin-widget#openid-connect).

### Custom Okta-hosted sign-in page

If you configured a [Sign-In Widget](/docs/guides/style-the-widget/style-okta-hosted/), you can add a **Sign in with ${IdentityProviderName}** button by adding the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line:

```js
config.idps= [
  {type: 'IdentityProviderName', id: 'Your_IDP_ID_Here'}
];
config.idpDisplay ="SECONDARY";
```

### AuthJS

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-in Widget is built with. For further information see [the AuthJS GitHub repo](https://github.com/okta/okta-auth-js#install). Implementing sign in with an Identity Provider uses the SDK's [OpenID Connect authentication flow](https://github.com/okta/okta-auth-js#openid-connect-options).

## Next steps

You should now understand how to add an external Identity Provider and have successfully added and tested the authorization URL with the external Identity Provider.

To add another Identity Provider:

* If you have already created an app at the Identity Provider, start by configuring the Identity Provider in Okta.
* If you haven't already created an app at the Identity Provider, start by creating an app at the Identity Provider.

> **Note:** You don't need to register another app in Okta unless you want to use a different application with the new Identity Provider that you are creating.

## See also

* [Concepts: External Identity Providers](/docs/concepts/identity-providers/)
* [Implement the Implicit flow](/docs/guides/implement-grant-type/implicit/main/)
* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
