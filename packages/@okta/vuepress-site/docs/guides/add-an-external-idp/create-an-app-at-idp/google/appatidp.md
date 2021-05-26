1. Make sure that you can access the [Google Developers Console](https://console.developers.google.com/).

1. Create a Google project using these [instructions](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin).

1. In the **Authorized redirect URIs** section of the creation wizard, click **ADD URI** to add the Okta redirect URI for your app integration.

1. Paste your redirect URI into the text box.

    The redirect URI is the location where the Identity Provider (IdP) sends the authentication response (the access token and the ID token). The URI sent in the authorize request from the client needs to match the redirect URI set at the IdP. The URI needs to be located in a secure domain that you own. This URI has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

1. Save the generated Client ID and Client Secret values so that you can add them to your Okta configuration.

> **Note:** There may be additional settings on the [Google Developers Console](https://console.developers.google.com) site that you can configure for your application. The steps in this guide address the quickest route to setting up Google as an Identity Provider with Okta. See the Google documentation for more information on additional configuration settings.
