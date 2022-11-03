1. [Register your app for testing](https://developers.login.gov/testing/) at Login.gov.

1. For an OpenID Connect integration, select **private_key_jwt** to authenticate clients.

    Does Okta support **PKCE** for this IdP??? (2 OIDC options here: **private_key_jwt** or **PKCE**)

1. Follow the Login.gov sandbox instructions to register your app and specify the following information:
   * **redirect_uri**: `https://${yourCompanySubdomain}.okta.com/oauth2/v1/authorize/callback`

      The redirect URI sent in the authorize request from the client must match the redirect URI set at the IdP. This URI is where the IdP sends the authentication response (the access token and the ID token). It needs to be a secure domain that you own. For example, if your Okta subdomain is `company`, then the URI would be `https://company.okta.com/oauth2/v1/authorize/callback`. If you configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

    * **scope**: Specify the scopes required for your app. Ensure that the `openid` scope is included.

1. Save the generated Login.gov client ID and ??? values. You need them to configure your **Login.gov IdP (Sandbox)** in Okta.

> **Note:** After you tested your integration with Login.gov sandbox environment, you can request [Login.gov for production deployment](https://developers.login.gov/production/).