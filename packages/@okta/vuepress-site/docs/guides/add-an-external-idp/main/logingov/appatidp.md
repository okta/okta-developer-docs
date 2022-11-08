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