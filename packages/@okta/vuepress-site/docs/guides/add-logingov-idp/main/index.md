---
title: Add a Login.gov Identity Provider
meta:
  - name: description
    content: Okta supports authentication with Login.gov as an external Identity Provider. Set up the Login.gov IdP using OpenID Connect with private key JWT in Okta.
---

This document explains how to configure Login.gov as an [external Identity Provider](/docs/concepts/identity-providers/) for your application by creating an Identity Provider in Okta, creating an application at Login.gov, testing the configuration, and creating a Login.gov sign-in option.

---

**Learning outcomes**

Configure Login.gov as an external Identity Provider so that your users can quickly sign up or sign in to your application using their Login.gov account.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An application that you want to add authentication to. You can [create a new app integration using AIW](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard) or use an existing one.
* An account at [Login.gov](https://secure.login.gov/). You also need a testing account at Login.gov's identity sandbox. See [Login.gov - Partner Dashboard](https://dashboard.int.identitysandbox.gov/).

---

## About the connection to the IdP for your application

Okta manages the connection to the Identity Provider (IdP) for your application. The connection sits between your application and the IdP that authenticates your users. The industry-standard term for this is Inbound Federation. Okta uses the OpenID Connect (OIDC) protocol with private key JWT for inbound federation with Login.gov. When a user signs in, you can link the user's Identity Provider account to an existing Okta user profile or choose to create a new user profile using Just-In-Time (JIT) provisioning.

> **Note:** We also support additional services such as directories and credential providers. See the [Okta Integration Network Catalog](https://www.okta.com/okta-integration-network/) to browse all integrations by use case.

## Create an Identity Provider in Okta

Login.gov requires you to [test your app integration](https://developers.login.gov/testing/) in their identity sandbox before you can enable it in production. As a result, you have to first create a **Login.gov IdP (Sandbox)** configuration in Okta to test your app integration. When you're ready for [Login.gov production deployment](https://developers.login.gov/production/), you then create the production **Login.gov IdP** configuration in Okta.

> **Note:** See the [Identity Providers API](/docs/reference/api/idps/#add-identity-provider) for request and response examples of creating an Identity Provider in Okta using the API.

1. In the Admin Console, go to **Security** > **Identity Providers**.

1. Select **Add Identity Provider** and then select **Login.gov IdP (Sandbox)** for identity sandbox testing or **Login.gov IdP** for production. Click **Next**.

1. In the configure dialog, define the following:

   * **Name**: Enter a name for the IdP configuration.

   * **Client ID**: Specify an identifier for your IdP integration with Login.gov. This can be any string value, but must match the **issuer** value from Login.gov's configuration. You can use your Okta org URL as the client ID. For example: `https://${yourCompanySubdomain}.okta.com`

   * **Private key**: The public/private key is available for download when you click **Finish**.

   * **Scopes**: Leave the defaults (`profile`, `profile:name`, `email`) for IAL1 assurance. These scopes are included when Okta makes an OpenID Connect request to the IdP. See [Login.gov OIDC scopes for required attributes](https://developers.login.gov/attributes/).

   * **Type of Identity Verification**: The maximum level of [identity assurance](https://developers.login.gov/oidc/#ial-values) available for this application. Select **ial/1** for standard MFA-protected email-based sign-in flows.
   * **AAL value**: Select the [authentication assurance level](https://developers.login.gov/oidc/#aal-values) required.
      > **Note:** If you leave the default value, the IdP requires a user to be authenticated with a second factor: `urn:gov:gsa:ac:classes:sp:PasswordProtectedTransport:duo`.

   In the optional **Authentication Settings** section:

   * **IdP username**: This is the expression (written in Okta Expression Language) that is used to convert an IdP attribute to the application user's `username`. This IdP username is used for matching an application user to an Okta User.

      For example, the value `idpuser.email` means that it takes the email attribute passed by the IdP and maps it to the Okta application user's `username` property.

      You can enter an expression to reformat the value, if desired. For example, if the IdP username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

   * **Match against:** Specifies which attributes of existing users in Okta are compared to the IdP username to determine if an account link needs to be established. If an existing account link is found, no comparison is performed.
   * **Account link policy:** Specifies whether Okta automatically links an incoming IdP user to the matched Okta user. If disabled, Okta doesn't link an incoming IdP user to an existing Okta user and relies solely on manually or previously linked accounts. See [Account link](#account-link).

1. Click **Finish**. A page appears that displays the IdP's configuration.

1. Copy both the **Authorize URL** and the **Redirect URI**, and then paste into a text editor for use [in the upcoming steps](#create-an-app-at-the-identity-provider).

1. Click **Download public key** to download the JSON-formatted public key for your Login.gov configuration.

> **Note:** You need to configure two IdPs in Okta:
> 1. **Login.gov IdP (Sandbox)** for testing
> 2. **Login.gov IdP** for production

### Optional attribute mappings

When you create the Login.gov IdP configuration in Okta, the Login.gov attributes are already mapped to Okta user profile attributes. However, these Login.gov attributes aren't mapped: `ial` and `aal`. If you need these attributes in Okta, use the Profile Editor to map them to Okta custom attributes. See App to Okta attribute mapping in [About attribute mappings](https://help.okta.com/okta_help.htm?id=ext-usgp-about-attribute-mappings).

### Account link

You can automatically link external IdP accounts to Okta accounts when the user signs in using the external IdP. If **Account Link Policy** is set to Automatic (`AUTO`), then Okta searches the Universal Directory for a user's profile to link. The user profile is found when the **IdP username** value (email) passed by the IdP matches the **Match against** value (username). See [Account Linking and JIT Provisioning](/docs/concepts/identity-providers/#account-linking-and-just-in-time-provisioning).

To remove an existing account link or validate account linking with every sign-in flow, Okta recommends that you make a `DELETE` call to the `/api/v1/idps/${idpId}/users/${userId}` [endpoint](/docs/reference/api/idps/#unlink-user-from-idp) to remove the link between the Okta user and the IdP user before authentication.

If **Account Link Policy** is disabled, no account linking occurs. You can manually create an account link without a transaction by making a `POST` call to the `/api/v1/idps/${idps}/users/${userId}` [endpoint](/docs/reference/api/idps/#link-a-user-to-a-social-provider-without-a-transaction).

See [Add an Identity Provider](/docs/reference/api/idps/#add-identity-provider) for API examples of account-linking JSON payloads.

For security best practices, consider disabling account linking after all existing users from the external IdP have signed in to your Okta org. At this point, all links have been created. After you disable linking and JIT provisioning is enabled, Okta adds new users that are created in the external IdP.

## Create an app at the Identity Provider

At Login.gov, you need to first register your app integration in Login.gov's identity sandbox for testing before you can enable it for production. See [Testing your app](https://developers.login.gov/testing/).

1. Sign in to the [Partner Dashboard](https://dashboard.int.identitysandbox.gov/) and register your app for testing.

1. Follow instructions at [Testing your app](https://developers.login.gov/testing/) to create a team and add users to that team.

1. Click **Create a new test app** from the **Apps** tab and specify the following attributes specific to the Okta test integration:

    * **Production Configuration**: Select **No** for testing.
    * **App Name**: Specify app name.
    * **Friendly name**: Specify a friendly name to display during the sign-in flow.
    * **Team**: Select the previously configured team to test the integration.
    * **Authentication protocol**: Select **OpenID Connect Private Key JWT**.
    * **Identity Assurance Level (IAL)**: Select the maximum level of identity assurance available for your app. Ensure that this value matches the **Type of Identity Verification** value specified in [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).
    * **Default Authentication Assurance Level (AAL)**: Select AAL required. Ensure that this value matches the **AAL value** specified in [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).
       > **Note:** If you leave the default value, Login.gov requires a user to be authenticated with a second factor: `urn:gov:gsa:ac:classes:sp:PasswordProtectedTransport:duo`. See [AAL Values](https://developers.login.gov/oidc/#aal-values).
    * **Attribute bundle**: Select the default attributes for Login.gov to return during authentication. Select at least **email**, **profile**, and **profile:email**.
    * **Issuer**: Specify a string that matches the **Client ID** value in your Okta Login.gov IdP configuration from [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta). Typically, your Okta org URL is used. For example, if your Okta subdomain is `company`, then specify `https://company.okta.com`.
    * **Certificates**: Upload the public key file that you downloaded from [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).
    * **Redirect URIs**: Specify the Okta **Redirect URI** that you copied from [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta). For example, if you don't have a custom domain, this value is usually `https://${yourCompanySubdomain}.okta.com/oauth2/v1/authorize/callback`.

1. Click **Create test app**.

> **Note:** Login.gov configures the production deployment for you. You can request [Login.gov for a production deployment](https://developers.login.gov/production/) after you finish testing.

## Test the integration

To test your integration, you need to first configure a [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) to use Login.gov as the Identity Provider.

There are four ways to initiate the IdP sign-in flow:

* [Use an embedded Okta Sign-In Widget](#use-an-embedded-okta-sign-in-widget)
* [Use a custom Okta-hosted Sign-In Widget](#use-a-custom-okta-hosted-sign-in-widget)
* [Use an HTML link](#use-an-html-link)
* [Use the AuthJS SDK](#use-the-authjs-sdk)

### Use an embedded Okta Sign-In Widget

Okta also offers an easily embeddable JavaScript widget that reproduces the look and behavior of the standard Okta sign-in page for your client app. See [Embedded Sign-In Widget use cases](/docs/guides/embedded-sign-in-widget-use-cases/) for Okta Identity Engine or [Embedded Okta Sign-In Widget fundamentals](/docs/guides/archive-embedded-siw/main/) for Okta Classic Engine.

To test the Login.gov IdP sign-in flow with your embedded widget app, navigate to your app's sign-in page and click the **Sign in with Login.gov** option. This option directs you to the Login.gov sign-in page. Use your Login.gov credentials to test the sign-in flow.

#### Embedded widget with Identity Engine

If you're using Identity Engine, the **Sign in with Login.gov** option is available on the widget after you [create an Identity Provider in your Okta org](#create-an-identity-provider-in-okta) and configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). No additional code is required.

#### Embedded widget with Classic Engine

If you're using Classic Engine, you still need to configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). Additionally, you need to add the following code to your Okta Sign-In Widget configuration to display the **Sign in with Login.gov** button:

```javascript
    config.idps= [
        { type: 'LOGINGOV_SANDBOX', id: 'Your_IDP_ID' }
    ];
    config.idpDisplay = "SECONDARY";
```

You can find out more about the Okta Sign-In Widget [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget). Implementing sign-in flows with an Identity Provider uses the Widget's [OpenID Connect authentication flow](https://github.com/okta/okta-signin-widget#openid-connect).

> **Note:** For a production environment, use the following Okta Sign-In Widget configuration:
> ```javascript
>    config.idps= [
>        { type: 'LOGINGOV', id: 'Your_IDP_ID' }
>    ];
>    config.idpDisplay = "SECONDARY";
>```

### Use a custom Okta-hosted Sign-In Widget

If your client app uses Okta [redirect authentication](#/docs/concepts/redirect-vs-embedded/#redirect-authentication), then to test the Login.gov IdP sign-in flow, navigate to your app's sign-in page and click the **Sign in with Login.gov** option. This option directs you to the Login.gov sign-in page. Use your Login.gov credentials to test the sign-in flow.

#### Okta-hosted widget with Identity Engine

If you're using Identity Engine, the **Sign in with Login.gov** option is available on the widget after you [create an Identity Provider in your Okta org](#create-an-identity-provider-in-okta) and configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). No additional configuration is required.

#### Okta-hosted widget with Classic Engine

If you're using Classic Engine, you still need to configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). Additionally, you need to customize your [Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget) to display the **Sign in with Login.gov** option.

Add the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line in the **Custom Sign in** tab:

```js
config.idps= [
  {type: 'LOGINGOV_SANDBOX', id: 'Your_IDP_ID'}
];
config.idpDisplay ="SECONDARY";
```

> **Note:** For a production environment, use the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line:
> ```javascript
>    config.idps= [
>        { type: 'LOGINGOV', id: 'Your_IDP_ID' }
>    ];
>    config.idpDisplay = "SECONDARY";
>```

### Use an HTML link

You can use the authorize URL to simulate the authorization flow from your browser.
Test this in your browser's privacy or incognito mode to avoid false positive or negative results. If everything is configured properly:

* The user is redirected to the Identity Provider's sign-in page.
* After successful authentication, the user is redirected to the redirect URI that you specified, along with an `#id_token=` fragment in the URL. The value of this parameter is your Okta OpenID Connect ID token.

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

The Okta Identity Provider that you created generates an authorize URL with a number of blank parameters that you can fill in to test the flow with the Identity Provider. For example:

```bash
https://${yourOktaDomain}/oauth2/v1/authorize?
  idp=${yourIdPId}&
  client_id=${clientId}&
  response_type=${responseType}&
  response_mode=${responseMode}&
  scope=${scopes}&
  redirect_uri=${redirectUri}&
  state=${state}&
  nonce=${nonce}
```

> **Note:** If you are using Authorization Code with PKCE as the grant type for your client app, you must generate and store the PKCE. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/#flow-specifics). Okta recommends that you use the [AuthJS SDK](https://github.com/okta/okta-auth-js#signinwithredirectoptions) with this grant type.

In the URL, replace `${yourOktaDomain}` with your org's base URL, and then replace the following values:

* `idp`: Your `${yourIdPId}` value that you obtained from [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).

* `client_id`: Use the `${clientId}` value that you obtained from your OpenID Connect client application. This isn't the **Client ID** value from the Identity Provider.

* `response_type`: Determines which flow is used. For the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow, use `id_token`. For the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow, use `code`.

* `response_mode`: Determines how the authorization response is returned. Use `fragment`.

* `scope`: Determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each by a space. You need to include at least the `openid` scope. You can request any of the standard OpenID Connect scopes about users, such as `profile` and `email`, as well as any custom scopes specific to your Identity Provider.

* `redirect_uri`: The location where Okta returns a browser after the user finishes authenticating with their Identity Provider. This URL must start with `https` and must match one of the redirect URIs that you configured in the previous section.

* `state`: Protects against cross-site request forgery (CSRF). Can be any value.

* `nonce`: A string included in the returned ID token. Use it to associate a client session with an ID token and to mitigate replay attacks. Can be any value.

> **Note:** When Okta sends the authorize request to Login.gov, it adds the required `acr_values` based on the type of identity verification that you specified in the Login.gov IdP configuration.

For a full explanation of all of these parameters, see: [/authorize Request parameters](/docs/reference/api/oidc/#request-parameters).

Create a link that the user clicks to sign in. The HREF for that link is the authorize URL with your specified values. For example:

```html
`<a href="https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=${yourAppRedirectUrl}&state=WM6D&nonce=YsG76jo">Sign in with Login.gov</a>`

```

After the user clicks the link, they are prompted to sign in with Login.gov. After successful sign in, the user is returned to the specified `redirect_uri` along with an ID token in JWT format.

### Use the AuthJS SDK

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-In Widget is built with. See the `idp` option in the [AuthJS SDK GitHub repo](https://github.com/okta/okta-auth-js#usage-guide).

## Next steps

You should now understand how to add the Login.gov Identity Provider and have successfully added and tested the integration.

To map Okta attributes to app attributes, use the [Profile Editor](https://help.okta.com/okta_help.htm?id=ext_app_map).

To add another Identity Provider, start by choosing an [external Identity Provider](/docs/guides/identity-providers/).
