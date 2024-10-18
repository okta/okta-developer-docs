---
title: Social Login
meta:
  - name: description
    content: (Add a social Identity Provider) Okta supports authentication with social Identity Providers. Get an overview of the social login process and prerequisites, as well as the setup instructions.
---

## <StackSnippet snippet="idp" inline />

This document explains how to configure <StackSnippet snippet="idp" inline /> as an [external social Identity Provider (IdP)](/docs/concepts/identity-providers/) for your app by creating an app at <StackSnippet snippet="idp" inline />, creating an Identity Provider in Okta, testing the configuration, and creating a sign-in button.

Okta manages the connection to the IdP for your app, sitting between your app and the IdP that authenticates your users. The industry-standard term for this is Inbound Federation. When a user signs in, you can link the user’s <StackSnippet snippet="idp" inline /> account to an existing Okta user profile or choose to create a new user profile using Just-In-Time (JIT) provisioning.

> **Note:** Okta also supports other services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

---

#### Learning outcomes

Configure a social Identity Provider so that your users can quickly sign up or sign in to your app by using their social Identity Provider account.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An OpenID Connect (OIDC) app integration in Okta for the app that you want to add authentication to. You can [create an OIDC app integration](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) or use an existing one.
* An account with <StackSnippet snippet="idpaccount" inline />

---

## Create an app at the Identity Provider

<StackSnippet snippet="appatidp" />

## Create the Identity Provider in Okta

To add <StackSnippet snippet="idp" inline /> as an Identity Provider in Okta:

1. In the Admin Console, go to **Security** > **Identity Providers**.
1. Click **Add Identity Provider**, and then select **<StackSnippet snippet="idp" inline /> IdP**. <StackSnippet snippet="alt-idp" inline />
1. Click **Next**.
1. In the **General Settings** section, define the following:

   <StackSnippet snippet="appidpinokta" />

   In the optional **Authentication Settings** section:

   * **Account Link Policy**: Specify whether Okta automatically links the user's IdP account with a matching Okta account. See [Account link](#account-link).

5. Click **Finish**. A page appears that displays the IdP's configuration.

> **Note:** If you want to use a specific **Redirect Domain** instead of the **Dynamic** default, you can use either **Org URL** or **Custom URL**. See `issuerMode` in the [Identity Provider attributes](/docs/reference/api/idps/#identity-provider-attributes) section.

<StackSnippet snippet="afterappidpinokta" />

> **Note:** See the [Identity Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider) for request and response examples when creating an IdP in Okta using the API.

### Account link

You can automatically link external IdP accounts to Okta accounts when the user signs in using the external IdP. If **Account Link Policy** is set to Automatic (`AUTO`), Okta searches the Universal Directory for a user's profile to link. The user profile is found when the **IdP username** value (email) passed by the IdP matches the **Match against** value (username). See [Account Linking and JIT Provisioning](/docs/concepts/identity-providers/#account-linking-and-just-in-time-provisioning).

To remove an existing account link or validate account linking with every sign-in flow, Okta recommends that you make a `DELETE` call to the `/api/v1/idps/{idpId}/users/{userId}` [endpoint](/docs/reference/api/idps/#unlink-user-from-idp) to remove the link between the Okta user and the IdP user before authentication.

If **Account Link Policy** is disabled, no account linking occurs. You can manually create an account link without a transaction by making a `POST` call to the `/api/v1/idps/{idps}/users/{userId}` [endpoint](/docs/reference/api/idps/#link-a-user-to-a-social-provider-without-a-transaction).

See [Create an Identity Provider](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider) for API examples of account linking JSON payloads.

For security best practices, consider disabling account linking after all existing users from the external IdP have signed in to your Okta org. At this point, all links have been created. After you disable linking, and JIT provisioning is enabled, Okta adds new users that are created in the external IdP.

## Test the integration

You can test your integration by configuring a [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) to use <StackSnippet snippet="idp" inline /> as the Identity Provider.

Alternatively, you can use the Authorize URL to simulate the authorization flow. The Okta Identity Provider that you created generated an authorize URL with several blank parameters that you can fill in to test the flow with the Identity Provider. The authorize URL initiates the authorization flow that authenticates the user with the Identity Provider.

In the URL, replace `{yourOktaDomain}` with your org's base URL, and then replace the following values:

* `client_id`: Use the `client_id` value from your Okta app integration. This isn’t the `client_id` from the Identity Provider. For example, `0oawjqpb2wcUAWM8C0h7`.

* `response_type`: Determines which flow is used. For the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow, use `id_token`. For the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow, use `code`.

* `response_mode`: Determines how the authorization response is returned. Use `fragment`.

* `scope`: Determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each with a `%20` (space character). You need to include at least the `openid` scope. You can request any of the standard OpenID Connect scopes about users, such as `profile` and `email` and any custom scopes specific to your Identity Provider.

* `redirect_uri`: The location where Okta returns a browser after the user finishes authenticating with their Identity Provider. This URL must start with `https` and must match one of the redirect URIs that you configured in the previous section.

* `state`: Protects against cross-site request forgery (CSRF). This can be set to any value.

* `nonce`: A string included in the returned ID token. Use it to associate a client session with an ID token and to mitigate replay attacks. This can be set to any value.

For a full explanation of all of these parameters, see: [/authorize request parameters](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS).

An example of a complete URL looks like this:

```bash
https://{yourOktaDomain}/oauth2/v1/authorize?idp={idp_id}&client_id={client_id}&response_type=id_token&response_mode=fragment&scope=openid%20email&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo

```

To test your authorization URL, enter the complete authorization URL in a browser. Do this in your browser's privacy or incognito mode to avoid false positive or negative results.

If everything is configured properly:

* The user is redirected to the Identity Provider's sign-in page.
* After successful authentication, the user is redirected to the redirect URI that you specified, along with an `#id_token=` fragment in the URL. The value of this parameter is your Okta OpenID Connect ID token.

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

<StackSnippet snippet="noemail" />

### Add the Identity Provider to the embedded Okta Sign-In Widget

> **Note:** This section only applies to Classic Engine. <br>
> If you're using Identity Engine, the **Sign in with IdP** option is available on the widget after you [create the Identity Provider in your Okta org](#create-the-identity-provider-in-okta) and configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). No additional code is required. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version and [Upgrade your widget](/docs/guides/oie-upgrade-sign-in-widget/main/#idp-discovery) for Identity Engine upgrade considerations.

The [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) is an embeddable JavaScript widget that reproduces the look and behavior of the standard Okta sign-in page. You can add a **Sign in with <StackSnippet snippet="idp" inline />** button to the widget by adding the following code to your Okta Sign-In Widget configuration.

<StackSnippet snippet="siwconfig" />

Replace `Your_IDP_ID` with the Identity Provider ID from your Identity Provider that you created in Okta in the [Create the Identity Provider in Okta](#create-the-identity-provider-in-okta) section. To find your Identity Provider ID:

1. In the Admin Console, go to **Security** > **Identity Providers**.
1. On the **Identity Providers** page, select the **Identity Provider** tab.
1. Select your Identity Provider from the list. **IdP ID** contains your Identity Provider ID.

### Add the Identity Provider to the custom Okta-hosted sign-in page

> **Note:** This section only applies to Classic Engine. <br>
> If you're using Identity Engine, the **Sign in with IdP** option is available on the widget after you [create an Identity Provider in your Okta org](#create-an-identity-provider-in-okta) and configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

If you configured a [custom Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget), you can add a **Sign in with <StackSnippet snippet="idp" inline />** button by adding the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line in the **Sign-in page code editor** of the Admin Console.

<StackSnippet snippet="siwconfig" />

Replace `Your_IDP_ID` with the Identity Provider ID from your Identity Provider that you created in Okta in the [Create the Identity Provider in Okta](#create-the-identity-provider-in-okta) section.

## Next steps

You now understand how to add a social Identity Provider and have successfully added and tested the integration.

To map Okta attributes to app attributes, use the [Profile Editor](https://help.okta.com/okta_help.htm?id=ext_app_map).

To add another Identity Provider, start by choosing an [external Identity Provider](/docs/guides/identity-providers/).
