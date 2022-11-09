---
title: Add a Login.gov Identity Provider
meta:
  - name: description
    content: Okta supports authentication with Login.gov as an external Identity Provider. Set up the Login.gov IdP using OpenID Connect with private key JWT in Okta.
---
???Question: Should we add the following labels on this topic?
* <ApiLifecycle access="ea" /> (since public/private JWT key is EA)

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

1. Select **Add Identity Provider** and then select **Login.gov IdP (Sandbox)** for testing identity sandbox or **Login.gov IdP** for production. Click **Next**.

1. In the configure dialog, define the following:

   * **Name**: Enter a name for the IdP configuration.

   * **Client ID**: Specify your Okta org URL. This is typically in the format `https://${yourCompanySubdomain}.okta.com`. If you configured a custom domain in your Okta org, specify your custom URL.

   * **Private key**: The public/private key is available for download when you click **Finish**.
      > **Note:** The **Public key/private key** option is an <ApiLifecycle access="ea" /> (Self-Service) feature.

   * **Scopes**: Leave the defaults (`profile`, `profile:name`, `email`) for IAL1 assurance. These scopes are included when Okta makes an OpenID Connect request to the IdP. See [Login.gov OIDC scopes for required attributes](https://developers.login.gov/attributes/).

   * **Type of Identity Verification**: The maximum level of [identity assurance](https://developers.login.gov/oidc/#ial-values) available for this application. Select **ial/1** for standard MFA-protected email-based sign-in.
   * **AAL value**: Select the [authentication assurance level](https://developers.login.gov/oidc/#aal-values) required.

   In the optional **Authentication Settings** section:

   * **IdP username**: This is the expression (written in Okta Expression Language) that is used to convert an IdP attribute to the application user's `username`. This IdP username is used for matching an application user to an Okta User.

      For example, the value `idpuser.email` means that it takes the email attribute passed by the IdP and maps it to the Okta application user's `username` property.

      You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

   * **Match against:** Specifies which attributes of existing users in Okta are compared to the IdP username to determine if an account link needs to be established. If an existing account link is found, no comparison is performed.
   * **Account link policy:** Specifies whether Okta automatically links an incoming IdP user to the matched Okta user. If disabled, Okta doesn't link an incoming IdP user to an existing Okta user and relies solely on manually or previously linked accounts.
   * **Auto-link restrictions:** Restrict auto-linking based on whether the Okta user is a member of any of the specified groups.
   * **If no match is found:** Select **Create new user(JIT)** or **Redirect to Okta sign-in page**.

1. Click **Finish**. A page appears that displays the IdP's configuration.

1. Copy both the **Authorize URL** and the **Redirect URI**, and then paste into a text editor for use [in the upcoming steps](#create-an-app-at-the-identity-provider). If you are using a public and private key pair, click **Download public key**. The key is downloaded in JSON format.

> **Note:** When you are setting up your IdP in Okta, there are a number of settings that allow you to finely control the social sign-in behavior. While the provider-specific instructions show one possible configuration, [Account Linking and JIT Provisioning](/docs/concepts/identity-providers/#account-linking-and-just-in-time-provisioning) discusses configuration options in more detail so that you can choose the right configuration for your use case.

> **Note:** You need to configure two IdPs in Okta:
> 1. **Login.gov IdP (Sandbox)** for testing
> 2. **Login.gov IdP** for production

### Attribute mappings

Map specific Login.gov attributes to your Okta user profile:

1. In the Admin Console, go to **Directory** > **Profile Editor**.
1. Select the Okta **User (default)** profile.
1. Click **+ Add Attribute** and add the following three attributes:
   * `login_aal` (string)
   * `login_ial` (string)
1. Navigate to **Directory** > **Profile Editor** > **Identity Providers**.
1. Click **Mappings** next to the Login.gov IdP you created previously.
1. Select **Login.gov IdP to Okta User** tab, map the following then click **Save mappings**:
   * Map `ial` to `login_ial`
   * Map `aal` to `login_aal`

## Create an app at the Identity Provider

At Login.gov, you need to first register your app integration in Login.gov's identity sandbox for testing before you can enable it for production. See [Testing your app](https://developers.login.gov/testing/).

1. Sign in to the [Partner Dashboard](https://dashboard.int.identitysandbox.gov/) and register your app for testing.

1. Follow instructions at [Testing your app](https://developers.login.gov/testing/) to create a team and add users to that team.

1. Click **Create a new test app** from the Apps tab and specify the following attributes specific to the Okta test integration:

    * **Production Configuration**: Select **No** for testing.
    * **App Name**: Specify app name.
    * **Friendly name**: Specify a friendly name to display during sign-in.
    * **Team**: Select the previously configured team to test the integration.
    * **Authentication protocol**: Select **OpenID Connect Private Key JWT**.
    * **Identity Assurance Level (IAL)**: Select the maximum level of identity assurance available for your app. Ensure that this value matches the **Type of Identity Verification** value specified in [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).
    * **Default Authentication Assurance Level (AAL)**: Select AAL required. Ensure that this value matches the **AAL value** specified in [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).
    * **Attribute bundle**: Select the default attributes for Login.gov to return during authentication. Select at least **email**, **profile**, and **profile:email**.
    * **Issuer**: Specify your Okta URL as the identifier of your app integration. For example, if your Okta subdomain is `company`, then specify `https://company.okta.com` as the Issuer.
    * **Certificates**: Upload the public key file you downloaded from [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).
    * **Redirect URIs**: Specify your Okta **Redirect URI** you copied from [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta). For example, if you don't have a custom domain, this value is typically `https://${yourCompanySubdomain}.okta.com/oauth2/v1/authorize/callback`.

1. Click **Create test app**.

> **Note:** Login.gov configures the production deployment for you. You can request [Login.gov for a production deployment](https://developers.login.gov/production/) after you finish testing.

## Test the integration

You can test your integration by configuring a [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) to use Login.gov as the Identity Provider.

Alternatively, you can use the Authorize URL to simulate the authorization flow. The Okta Identity Provider that you created generates an authorize URL with a number of blank parameters that you can fill in to test the flow with the Identity Provider. For example:

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

 The authorize URL initiates the authorization flow that authenticates the user with the Identity Provider.

> **Note:** Use this step to test your authorization URL as an HTML link. For information on testing your authorization URL using the Sign-In Widget, Okta-hosted sign-in page, or AuthJS, see the [next section](#use-the-identity-provider-to-sign-in).
>
> If you are using Authorization Code with PKCE as the grant type, you must generate and store the PKCE. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/#flow-specifics). Okta recommends that you use the [AuthJS SDK](https://github.com/okta/okta-auth-js#signinwithredirectoptions) with this grant type.

In the URL, replace `${yourOktaDomain}` with your org's base URL, and then replace the following values:

* `idp`: Your `${yourIdPId}` value you obtained from [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta).

* `client_id`: Use the `${clientId}` value that you obtained from your OpenID Connect client application. This is not the `${clientId}` from the Identity Provider.

* `response_type`: Determines which flow is used. For the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow, use `id_token`. For the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow, use `code`.

* `response_mode`: Determines how the authorization response is returned. Use `fragment`.

* `scope`: Determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each by a space. You need to include at least the `openid` scope. You can request any of the standard OpenID Connect scopes about users, such as `profile` and `email`, as well as any custom scopes specific to your Identity Provider.

* `redirect_uri`: The location where Okta returns a browser after the user finishes authenticating with their Identity Provider. This URL must start with `https` and must match one of the redirect URIs that you configured in the previous section.

* `state`: Protects against cross-site request forgery (CSRF). Can be any value.

* `nonce`: A string included in the returned ID token. Use it to associate a client session with an ID token and to mitigate replay attacks. Can be any value.

> **???Do we need this**
>* `acr_values`: The type of identity versification must be specified. Use:
>   * `http://idmanagement.gov/ns/assurance/ial/1` for IAL1
>   * `http://idmanagement.gov/ns/assurance/ial/2` for IAL2
>
>  Use escape characters for your `acr_values` in the URL. For example: `acr_values=http%3A%2F%2Fidmanagement.gov%2Fns%2Fassurance%2Fial%2F1`

For a full explanation of all of these parameters, see: [/authorize Request parameters](/docs/reference/api/oidc/#request-parameters).

An example of a complete URL looks like this:

```bash
https://${yourOktaDomain}/oauth2/v1/authorize?idp=${yourIdpId}&client_id=${clientId}&response_type=id_token&response_mode=fragment&scope=openid%20email&redirect_uri=https%3A%2F%2F${yourAppRedirectUrl}%2F&state=WM6D&nonce=YsG76jo

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
        { type: 'LOGINGOV_SANDBOX', id: 'Your_IDP_ID' }
    ];
    config.idpDisplay = "SECONDARY";
```

You can find out more about the Okta Sign-In Widget [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget). Implementing sign in with an Identity Provider uses the Widget's [OpenID Connect authentication flow](https://github.com/okta/okta-signin-widget#openid-connect).

> **Note:** For production environment, use the following Okta Sign-In Widget configuration:
> ```javascript
>    config.idps= [
>        { type: 'LOGINGOV', id: 'Your_IDP_ID' }
>    ];
>    config.idpDisplay = "SECONDARY";
>```

### Custom Okta-hosted sign-in page

> **Note:** This section only applies to Okta Classic Engine.<br>
> If you're using Okta Identity Engine, the **Sign in with IdP** option is available on the widget after you [create an Identity Provider in your Okta org](#create-an-identity-provider-in-okta) and configure the [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

If you configured a [Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget), you can add a **Sign in with ${IdentityProviderName}** button by adding the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line:

```js
config.idps= [
  {type: 'LOGINGOV_SANDBOX', id: 'Your_IDP_ID'}
];
config.idpDisplay ="SECONDARY";
```

> **Note:** For production environment, use the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line:
> ```javascript
>    config.idps= [
>        { type: 'LOGINGOV', id: 'Your_IDP_ID' }
>    ];
>    config.idpDisplay = "SECONDARY";
>```

### AuthJS

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-in Widget is built with. See the `idp` option in the [AuthJS SDK GitHub repo](https://github.com/okta/okta-auth-js#usage-guide).

## Next steps

You should now understand how to add the Login.gov Identity Provider and have successfully added and tested the integration.

To map Okta attributes to app attributes, use the [Profile Editor](https://help.okta.com/okta_help.htm?id=ext_app_map).

To add another Identity Provider, start by choosing an [external Identity Provider](/docs/guides/identity-providers/).
