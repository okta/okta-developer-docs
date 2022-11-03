At Login.gov, you need to first register your app integration in Login.gov's identity sandbox for testing before you can enable the integration for production. See [Testing your app](https://developers.login.gov/testing/).

1. Sign in to the [Partner Dashboard](https://dashboard.int.identitysandbox.gov/) and register your app for testing.

1. Follow instructions at [Testing your app](https://developers.login.gov/testing/) to create a team and add users to that team.

1. Click **Create a new test app** from the Apps tab and specify the following attributes specific to the Okta test integration:

    * **Production Configuration**: Select **No**.
    * **App Name**: Specify app test name.
    * **Friendly name**: Specify a friendly name to label the app.
    * **Team**: Select the previously configured team to test the integration.
    * **Authentication protocol**: Select **OpenID Connect Private Key JWT**.
    * **Level of Service**: 


1. Follow the Login.gov sandbox instructions to register your app and specify the following information:
   * **redirect_uri**: `https://${yourCompanySubdomain}.okta.com/oauth2/v1/authorize/callback`

      The redirect URI sent in the authorize request from the client must match the redirect URI set at the IdP. This URI is where the IdP sends the authentication response (the access token and the ID token). It needs to be a secure domain that you own. For example, if your Okta subdomain is `company`, then the URI would be `https://company.okta.com/oauth2/v1/authorize/callback`. If you configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

    * **scope**: Specify the scopes required for your app. Ensure that the `openid` scope is included.

1. Save the generated Login.gov client ID and ??? values. You need them to configure your **Login.gov IdP (Sandbox)** in Okta.

> **Note:** After you tested your integration with Login.gov sandbox environment, you can request [Login.gov for production deployment](https://developers.login.gov/production/).
You also need to add the redirect URI to the appropriate section. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URL has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and then the callback endpoint.

For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

Include all base domains (Okta domain and custom domain) that your users will interact with in the allowed redirect URI list.

> **Note:** If you've built your own custom Identity Provider, you need the client ID and the client secret generated for the Identity Provider so you can add it to the Okta configuration in the next section.