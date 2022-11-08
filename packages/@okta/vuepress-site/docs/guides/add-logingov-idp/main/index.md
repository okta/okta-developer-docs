---
title: Add a Login.gov Identity Provider
meta:
  - name: description
    content: Okta supports authentication with Login.gov as an external Identity Provider. Set up the Login.gov IdP using OpenID Connect with private key JWT in Okta.
---

This document explains how to configure Login.gov as an [external Identity Provider](/docs/concepts/identity-providers/) for your application by creating an Identity Provider in Okta, creating an application at Login.gov, testing the configuration, and creating a sign-in button.

---

**Learning outcomes**

Configure Login.gov as an external Identity Provider so that your users can quickly sign up or sign in to your application using their Login.gov account.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An application that you want to add authentication to. You can [create a new app integration using AIW](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard) or use an existing one.
* An account at [Login.gov](https://secure.login.gov/). You also need a testing account at Login.gov's identity sandbox. See [Login.gov - Partner Dashboard](https://dashboard.int.identitysandbox.gov/).

> **Note:** The <ApiLifecycle access="ea" /> **Private Key JWT Client Authentication for OIDC IdP** feature needs to be enabled for the Login.gov IdP configuration. See [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_secur_manage_ea_bata) to enable this Self-Service feature.

---

## About the connection to the IdP for your application

Okta manages the connection to the Identity Provider (IdP) for your application. The connection sits between your application and the IdP that authenticates your users. The industry-standard term for this is Inbound Federation. Okta uses the OpenID Connect (OIDC) protocol with private key JWT for inbound federation with Login.gov. When a user signs in, you can link the user's Identity Provider account to an existing Okta user profile or choose to create a new user profile using Just-In-Time (JIT) provisioning.

> **Note:** We also support additional services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

## Create an Identity Provider in Okta

Login.gov requires you to [test your app integration](https://developers.login.gov/testing/) in their identity sandbox before you can enable it in production. As a result, you have to first create a **Login.gov IdP (Sandbox)** configuration in Okta to test your app integration. When you are ready for [Login.gov production deployment](https://developers.login.gov/production/), you then create the production **Login.gov IdP** configuration in Okta.

> **Note:** See the [Identity Providers API](/docs/reference/api/idps/#add-identity-provider) for request and response examples of creating an Identity Provider in Okta using the API.

1. In the Admin Console, go to **Security** > **Identity Providers**.

1. Select **Add Identity Provider** and then select **Login.gov IdP (Sandbox)** (or **Login.gov IdP** for production). Click **Next**.

1. In the configure dialog, define the following:

   * **Name**: Enter a name for the IdP configuration.
   * **Scopes**: Leave the defaults. These scopes are included when Okta makes an OpenID Connect request to the IdP. See [Login.gov OIDC scopes for required attributes](https://developers.login.gov/attributes/).

      > **Note:** By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory.

   * **Client ID**: Specify your Okta org URL. This is typically in the format `https://${yourCompanySubdomain}.okta.com`. If you configured a custom domain in your Okta org, specify your custom URL.
   * **Authentication type**: Select **Public key/private key** to automatically generate a public and private key pair. The public key is available for download when you click **Finish**.

      > **Note:** The **Public key/private key** option is an <ApiLifecycle access="ea" /> (Self-Service) feature.

   * **Authorize requests**: Select **Enable signed requests** to send request parameters to the OpenID provider as an encoded JWT instead of passing the parameters in the URL. <ApiLifecycle access="ea" />
   * **Algorithm**: Select the algorithm to use for the signed requests from the dropdown list. If you are using the **Public key/private key** option, you must specify a signing algorithm, for example: **RSA256**. <ApiLifecycle access="ea" />

      > **Note:** The **Algorithm** is used to sign authorize requests and to generate bearer assertions when you use a private/public key pair for `/token` endpoint authentication.

   In the **Endpoints** section:

   Add the following endpoint URLs for Login.gov IdP. You can obtain the appropriate endpoints and the required scopes in the well-known configuration document for the IdP (for example, `https://${theIdPdomain}/.well-known/openid-configuration`).

   * **Issuer**: The identifier of the OIDC provider. Use `https://idp.int.identitysandbox.gov/` for the Login.gov's identity sandbox or `http://idp.int.login.gov/` for Login.gov production.
   * **Authorization endpoint**: The URL of the Identity Provider's OAuth 2.0 authorization endpoint. Use `https://int.identitysandbox.gov/openid_connect/authorize` for Login.gov identity sandbox or `https://int.login.gov/openid_connect/authorize` for Login.gov production.
   * **Token endpoint**: The URL of the Identity Provider's token endpoint for obtaining access and ID tokens. Use `https://idp.int.identitysandbox.gov/api/openid_connect/token` for Login.gov identity sandbox or `https://int.login.gov/openid_connect/token` for Login.gov production.
   * **JWKS endpoint**: The URL of the Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://${theIdPdomain}/oauth2/v1/keys`
   * **Userinfo endpoint (optional)**: The endpoint for getting identity information about the user. For example: `https://${theIdPdomain}/oauth2/v1/userinfo`.

   > **Note:** Okta requires an access token returned from the Identity Provider if you add the `/userinfo` endpoint URL.

   In the optional **Authentication Settings** section:

   * **IdP Username**: This is the expression (written in Okta Expression Language) that is used to convert an Identity Provider attribute to the application user's `username`. This Identity Provider username is used for matching an application user to an Okta User.

      For example, the value `idpuser.email` means that it takes the email attribute passed by the Identity Provider and maps it to the Okta application user's `username` property.

      You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

   * **Filter > Only allow usernames that match defined RegEx Pattern**: Select this option to only authenticate users with transformed usernames that match a regular expression pattern in the text field that appears. This filters the IdP username to prevent the IdP from authenticating unintended users. Users are only authenticated if the transformed username matches the regular expression pattern.

      > **Note:** When you use Okta for B2B or multi-tenancy use cases, select this checkbox. This helps you scope a subset of users in the org and enforce identifier constraints, such as email suffixes.

      For example, you could restrict an IdP for use only with users who have `@company.com` as their email address using the following expression: `^[A-Za-z0-9._%+-]+@company\.com`.

1. Click **Finish**. A page appears that displays the IdP's configuration.

> **Note:** If you want to use a specific **Redirect Domain** instead of the **Dynamic** default, you can use either **Org URL** or **Custom URL**. See `issuerMode` in the [Identity Provider attributes](/docs/reference/api/idps/#identity-provider-attributes) section.

5. Copy both the **Authorize URL** and the **Redirect URI**, and then paste into a text editor for use in upcoming steps. If you are using a public and private key pair, click **Download public key**. The key is downloaded in JSON format.

> **Note:** When you are setting up your IdP in Okta, there are a number of settings that allow you to finely control the social sign-in behavior. While the provider-specific instructions show one possible configuration, [Account Linking and JIT Provisioning](/docs/concepts/identity-providers/#account-linking-and-just-in-time-provisioning) discusses configuration options in more detail so that you can choose the right configuration for your use case.

## Create an app at the Identity Provider

At Login.gov, you need to first register your app integration in Login.gov's identity sandbox for testing before you can enable it for production. See [Testing your app](https://developers.login.gov/testing/).

1. Sign in to the [Partner Dashboard](https://dashboard.int.identitysandbox.gov/) and register your app for testing.

1. Follow instructions at [Testing your app](https://developers.login.gov/testing/) to create a team and add users to that team.

1. Click **Create a new test app** from the Apps tab and specify the following attributes specific to the Okta test integration:

    * **Production Configuration**: Select **No**.
    * **App Name**: Specify app name.
    * **Friendly name**: Specify a friendly name to display during sign-in.
    * **Team**: Select the previously configured team to test the integration.
    * **Authentication protocol**: Select **OpenID Connect Private Key JWT**.
    * **Identity Assurance Level (IAL)**: Select the maximum level of identity assurance available for this application. For example, select **IAL1** for standard MFA-protected email-based sign-in.
    * **Default Authentication Assurance Level (AAL)**: Select AAL required. You can leave the field empty for the default level.
    * **Attribute bundle**: Select the default attributes for Login.gov to return during authentication. Select at least **email**.
    * **Issuer**: Specify your Okta URL as the identifier of your app integration. For example, if your Okta subdomain is `company`, then specify `https://company.okta.com` as the Issuer.
    * **Certificates**: Upload the public certificate file from your generated public/private key pair. If you created your public/private key pair with Okta, upload the **okta_public_key.pem** file you created in [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).
    * **Redirect URIs**: Specify your Okta redirect URI: `https://${yourCompanySubdomain}.okta.com/oauth2/v1/authorize/callback`. For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

1. Click **Create test app**.

After you registered your app integration at Login.gov's sandbox, you need to [create an Identity Provider in Okta](#create-an-identity-provider-in-okta) before you can start testing your integration.

> **Note:** After you tested your integration with Login.gov sandbox environment, you can request [Login.gov for production deployment](https://developers.login.gov/production/).

## Test the integration

You can test your integration by configuring a [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) to use Login.gov as the Identity Provider.

Alternatively, you can use the Authorize URL to simulate the authorization flow. The Okta Identity Provider that you created generates an authorize URL with a number of blank parameters that you can fill in to test the flow with the Identity Provider. The authorize URL initiates the authorization flow that authenticates the user with the Identity Provider.

> **Note:** Use this step to test your authorization URL as an HTML link. For information on testing your authorization URL using the Sign-In Widget, Okta-hosted sign-in page, or AuthJS, see the [next section](#use-the-identity-provider-to-sign-in).
>
> If you are using Authorization Code with PKCE as the grant type, you must generate and store the PKCE. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/#flow-specifics). Okta recommends that you use the [AuthJS SDK](https://github.com/okta/okta-auth-js#signinwithredirectoptions) with this grant type.

In the URL, replace `${yourOktaDomain}` with your org's base URL, and then replace the following values:

* `client_id`: Use the `client_id` value that you obtained from the OpenID Connect client application in the previous section. This is not the `client_id` from the Identity Provider.

* `response_type`: Determines which flow is used. For the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow, use `id_token`. For the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow, use `code`.

* `response_mode`: Determines how the authorization response is returned. Use `fragment`.

* `scope`: Determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each by a space. You need to include at least the `openid` scope. You can request any of the standard OpenID Connect scopes about users, such as `profile` and `email`, as well as any custom scopes specific to your Identity Provider.

* `redirect_uri`: The location where Okta returns a browser after the user finishes authenticating with their Identity Provider. This URL must start with `https` and must match one of the redirect URIs that you configured in the previous section.

* `state`: Protects against cross-site request forgery (CSRF). Can be any value.

* `nonce`: A string included in the returned ID token. Use it to associate a client session with an ID token and to mitigate replay attacks. Can be any value.

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

There are four primary ways to kick off the sign-in flow.

### HTML Link

Create a link that the user clicks to sign in. The HREF for that link is the authorize URL that you created in the previous section:

```html
`<a href="https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo">Sign in with Identity Provider</a>`

```

After the user clicks the link, they are prompted to sign in with the Identity Provider. After successful sign in, the user is returned to the specified `redirect_uri` along with an ID token in JWT format.

### Okta Sign-In Widget

> **Note:** This section only applies to Okta Classic Engine.<br>
> If you're using Okta Identity Engine, the **Sign in with IdP** option is available on the widget after you [create an Identity Provider in your Okta org](#create-an-identity-provider-in-okta) and configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). No additional code is required. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version and [Upgrade your widget](/docs/guides/oie-upgrade-sign-in-widget/main/#idp-discovery) for upgrade considerations to Identity Engine.

Okta also offers an easily embeddable JavaScript widget that reproduces the look and behavior of the standard Okta sign-in page. You can add a **Sign in with ${IdentityProviderName}** button by adding the following code to your Okta Sign-In Widget configuration:

```javascript
    config.idps= [
        { type: 'LOGINGOV', id: 'Your_IDP_ID' }
    ];
    config.idpDisplay = "SECONDARY";
```

or

```javascript
    config.idps= [
        { type: 'LOGINGOV_SANDBOX', id: 'Your_IDP_ID' }
    ];
    config.idpDisplay = "SECONDARY";
```

You can find out more about the Okta Sign-In Widget [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget). Implementing sign in with an Identity Provider uses the Widget's [OpenID Connect authentication flow](https://github.com/okta/okta-signin-widget#openid-connect).

### Custom Okta-hosted sign-in page

> **Note:** This section only applies to Okta Classic Engine.<br>
> If you're using Okta Identity Engine, the **Sign in with IdP** option is available on the widget after you [create an Identity Provider in your Okta org](#create-an-identity-provider-in-okta) and configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

If you configured a [Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget), you can add a **Sign in with ${IdentityProviderName}** button by adding the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line:

```js
config.idps= [
  {type: 'IdentityProviderName', id: 'Your_IDP_ID_Here'}
];
config.idpDisplay ="SECONDARY";
```

### AuthJS

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-in Widget is built with. See the `idp` option in the [AuthJS SDK GitHub repo](https://github.com/okta/okta-auth-js#usage-guide).

## Next steps

You should now understand how to add the Login.gov Identity Provider and have successfully added and tested the integration.

To map Okta attributes to app attributes, use the [Profile Editor](https://help.okta.com/okta_help.htm?id=ext_app_map).

To add another Identity Provider, start by choosing an [external Identity Provider](/docs/guides/identity-providers/).
