In the **General Settings** section:

* **Name**: Enter the name that you would expect to see on a button, such as **Sign in with MyIdentityProvider**.
* **Client Id**: Paste the app ID or client ID that you obtained when you configured the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>.
* **Client Secret**: Paste the secret that you obtained in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>. 
* **Scopes**: Leave the defaults. These scopes are included when Okta makes an OpenID Connect request to the Identity Provider.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory. If your Identity Provider doesn't support this attribute, you can make it optional. See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm).

In the **Endpoints** section:

Add the following endpoint URLs for the OpenID Connect Identity Provider that you are configuring. You can obtain the appropriate endpoints and the required scopes in the well-known configuration document for the Identity Provider (for example, `https://{theIdPdomain}/.well-known/openid-configuration`). See the [Well-known configuration URLs](/docs/guides/add-an-external-idp/openidconnect/configure-idp-in-okta/#well-known-configuration-urls) section for URL details for the Identity Providers that we support. 

* **Issuer** - The identifier of the OpenID Connect provider. For example, where you created the Identity Provider app: `https://{theIdPdomain}/`
* **Authorization endpoint** - The URL of the Identity Provider's OAuth 2.0 authorization endpoint. For example: `https://{theIdPdomain}/oauth2/v1/authorize`
* **Token endpoint** - The URL of the Identity Provider's token endpoint for obtaining access and ID tokens. For example: `https://{theIdPdomain}/oauth2/v1/token`
* **JWKS endpoint** - The URL of the Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://{theIdPdomain}/oauth2/v1/keys`
* **Userinfo endpoint** - The endpoint for getting identity information about the user. For example: `https://{theIdPdomain}/oauth2/v1/userinfo`

### Well-known configuration URLs

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