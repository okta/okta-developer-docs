---
title: Generic OpenID Connect Identity Provider
---

# Generic OpenID Connect Identity Providers

Generic OpenID Connect (OIDC) allows users to sign in to an Okta org using their credentials from their existing account at an OIDC Identity Provider (IdP). A generic OIDC IdP can be a third-party IdP that supports OIDC, such as Salesforce or Yahoo or your own custom IdP. You can also configure federation between Okta orgs using OIDC as a replacement for SAML. If you want your users to be able to sign in using an existing database of credentials and sync their accounts in to Universal Directory from the external IdP, configure your Okta org to use a generic OIDC IdP. 

> Note: This guide walks you through how to configure federation between Okta orgs using OIDC as a replacement for SAML. But, you can also use these steps to configure generic support of any third-party IdP that is OIDC-compliant. See [Set Up Supported Identity Providers](#set-up-supported-identity-providers).

## Features

Configuring a generic OIDC IdP allows you to use the following features: 

- **User Registration**: Capture the Profile attributes from a generic OIDC IdP user and store those attributes in Okta's Universal Directory.
- **User Authentication**: After a user is registered, continue to use that generic OIDC IdP for user authentication, thus eliminating the need to store an additional username and password for that user.
- **Profile Sync**: If a user updates their profile, those changes can be reflected inside Okta the next time that they use the IdP to sign in.
- **Support for Multiple Social Profiles**: Multiple Social Profiles can all be linked to one Okta user. 
- **OAuth 2.0 Scope Configuration**: Specify OAuth 2.0 scopes to fully control which attributes are linked to Okta.

## Grant Types Supported
By default, all OIDC IdPs are configured with the Authorization Code grant type in Okta. You can also use the Implicit (Hybrid) grant type. For more information on grant type flows, see [Choosing an OAuth 2.0 Flow](https://developer.okta.com/authentication-guide/auth-overview/#choosing-an-oauth-20-flow).

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

## Set Up a Generic OpenID Connect Identity Provider

This section walks through the steps to set up a generic OIDC IdP with Okta.

### Create a Client Application at the IdP

Create a client application that you want to use for authenticating and authorizing your users.

> Note: These steps cover the Okta org to Okta org scenario. When configuring another generic OIDC IdP, refer to the IdP's documentation to configure a client application.

1. At the Okta org that represents the IdP, select **Applications** and then click **Add Application**.
2. You need a trusted client, so select **Web** as the platform. OpenID Connect is the sign-in method by default.
3. Click **Next**.
4. Enter a name for your application.
5. Leave the default for **Login Redirect URI** for now. We will come back and update that after the next section.
6. Assign a group or leave the **Everyone** default. Be sure to verify that the users you want to have access are assigned to the group that you select.
7. Click **Done**.
8. Copy the **Client ID** and **Client Secret** from the **Client Credentials** section and paste in to a text editor. You need these when you configure this IdP in your org.

### Configure the IdP in Okta

To connect your org to the IdP, add the IdP that you just created.

1. In your Okta org, select **Social & Identity Providers** from the **Users** menu.
2. Click **Add Identity Provider** and select **Add OpenID Connect IdP**.
3. Name the IdP. 
4. Paste the **Client ID** and **Client Secret** that you copied when you created the IdP app in the last section.
5. In the **Scopes** box, leave the default of `openid`, `email` and `profile` scopes. These scopes are included when Okta makes an OIDC request to the IdP.

> Note: By default, Okta requires the email attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory. If your IdP doesn't support this attribute, you can make it optional. See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm).

6. Add the following endpoint URIs for the generic OIDC IdP that you are configuring. You can find the endpoints in the well-known configuration document for the IdP, for example: `https://theIdPorg.com/.well-known/openid-configuration`. For a list of fully-tested IdPs that are supported, see [Set Up Supported Identity Providers](#set-up-supported-identity-providers).

**Issuer** - The identifier of the OIDC provider. For example, the Okta org where you created the IdP app: `https://theIdPorg.com`

**Authorization endpoint** - The URL of the IdP's OAuth 2.0 Authorization endpoint. For example: `https://theIdPorg.com/oauth2/v1/authorize`

**Token endpoint** - The URL of the IdP's token endpoint for obtaining access and ID tokens. For example: `https://theIdPorg.com/oauth2/v1/token`

**JWKS endpoint** - The URL of the IdP's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://theIdPorg.com/oauth2/v1/keys`

**Userinfo endpoint** - The endpoint for getting identity information about the user. For example: `https://theIdPorg.com/oauth2/v1/userinfo`

7. Click **Add Identity Provider**. The main Identity Providers page appears.

8. Expand the IdP that you just configured and copy the **Authorize URL** and the **Redirect URI**. Paste in to a text editor for use in upcoming steps.

#### Attribute Mapping

When a user first signs in to Okta using a generic OIDC IdP, their IdP user profile is mapped to an Okta Universal Directory profile using Just in Time provisioning. This user account creation and linking includes default mappings that are based on standard claims defined by the OIDC specification.

To view and modify the mappings, access the IdP that you created by selecting **Social & Identity Providers** from the **Users** menu. Click **Configure** for the IdP and select **Edit Mappings**.

If there are attributes that don't exist in your org's Universal Directory, but are a part of the user's IdP profile, add the attributes by editing the IdP user profile in your org. 

See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm?cshid=ext_Directory_Profile_Editor) for more information on custom attributes.

### Add the Okta Redirect URI to Your IdP

The redirect URI sent in the authorize request from the client needs to match the redirect URI in the IdP. This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own.

> Note: These steps cover the Okta org to Okta org scenario. When configuring another generic OIDC IdP, go to the IdP and add the Okta redirect URI there.

1. In the IdP Okta org, from the Developer's Console select **Applications**, and then select the IdP application.
2. Click **General**.
3. In the **General Settings** section, click **Edit**.
4. In the **Login Redirect URIs** box, paste the redirect URI that you copied in the last section.
5. Click **Save**.

### Create an App in Okta

You need to create an OIDC app in your Okta org. This app consumes the response from the IdP after authentication and authorization, allowing user access to your Okta org.

1. In the Developer's Console, select **Applications** and then click **Add Application**.
2. You need a trusted client, so select **Web** as the platform. OpenID Connect is the sign-in method by default.
3. Click **Next**.
4. Choose a name for your application.
5. Add one or more **Redirect URIs**. The login redirect URI is where Okta sends the user after they have completed authentication and authorization. You want to redirect the user to your Okta org after they have successfully authenticated. For example: `https://yourOktaorg.com`
6. Leave the other defaults and click **Done**.
7. Copy the **Client ID** from the **Client Credentials** section and paste in to a text editor. You need this to complete your **Authorize URL** in the next step.

### Complete and Test Your Authorize URL
 
The IdP that you configured in the [Configure the IdP in Okta](#configure-the-IdP-in-Okta) section generated an authorize URL with a number of blank parameters that you need to fill in. The authorize URL initiates the authorization flow that authenticates the user with the IdP. Each IdP created in Okta has an authorize URL that can be obtained from the **Identity Providers** page. 
 
- `client_id`: Use the `client_id` value that you copied in the [Create an App in Okta](#create-an-app-in-okta) section. This is not the `client_id` from the IdP.
- `scope`: Determines the claims that are returned in the ID token. Include the scopes that you want to request authorization for and separate each by a space. You need to include at least the `openid` scope. You can request any of the standard OIDC scopes about users, such as `profile` and `email` as well as any custom scopes specific to your IdP.
> Note: In this example, the `email` and `profile` scopes are required to create and link the user to Okta's Universal Directory by default.
- `response_type`: Determines which flow is used. This should be `code`, because in this example Authorization Code is the flow that is defined. For more information, see [Authorization Code Flow](https://developer.okta.com/authentication-guide/auth-overview/#authorization-code-flow).
- `response_mode`: Determines how the authorization response should be returned. In this example, we are using `fragment`.
- `state`: Protects against cross-site request forgery (CSRF).
- `nonce`: A string included in the return ID Token. Use it to associate a client session with an ID Token and to mitigate replay attacks.
- `redirect_uri`: The location where Okta returns a browser after the user finishes authenticating against the IdP. This URL must start with `https` and must match a redirect URI configured in the app that consumes the response from the IdP after authentication and authorization. In this example, the app that you created in the [Create an App in Okta](#create-an-app-in-okta) section.

For a full explanation of all of these parameters, see: [`/authorize` Request Parameters Table](/docs/reference/api/oidc/#authorize).

The following is an example of a complete URL:
`https://yourOktaorg.com/oauth2/v1/authorize?idp=0oaj2wNe3khgDxMmE0h7&client_id=0oaj2x7yewUvMY1x73h0&response_type=code&response_mode=fragment&scope=openid+email+profile&redirect_uri=https://yourOktaorg.com&state=ADFTG3&nonce=158858`

To test your authorization, enter the complete authorization URL in a browser. Use the browser's privacy or incognito mode to avoid false positive or negative results.

If everything is configured properly:

1. The user is redirected to the Generic OIDC IdP's sign-in page.
2. After successful authentication, the user is redirected to the redirect URI that you specified, along with an `id_token` fragment in the URL. The value of this parameter is your Okta OIDC ID token.

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

### Use the Generic OIDC IdP for Sign-In

There are two primary ways to kick off the sign-in with the Generic OIDC IdP flow.

**HTML Link**

One option is to create a link that the user clicks to sign in. The HREF for that link is the authorize URL that you created in the last section:

`https://yourOktaorg.com/oauth2/v1/authorize?idp=0oaj2wNe3khgDxMmE0h7&client_id=0oaj2x7yewUvMY1x73h0&response_type=code&response_mode=fragment&scope=openid+email+profile&redirect_uri=https://yourOktaorg.com&state=ADFTG3&nonce=158858`

After the user clicks the link, they are prompted to sign in with the generic OIDC IdP. After authentication and authorization, they are returned to the specified `redirect_uri` along with an ID token in JWT format.

**AuthJS**

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-in Widget is built with. For more information, see the [the AuthJS GitHub repo](https://github.com/okta/okta-auth-js#install). Implementing sign-in with a generic OIDC IdP would use the SDK's [OpenID Connect authentication flow](https://github.com/okta/okta-auth-js#openid-connect-options). 

### Set Up Supported Identity Providers

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
