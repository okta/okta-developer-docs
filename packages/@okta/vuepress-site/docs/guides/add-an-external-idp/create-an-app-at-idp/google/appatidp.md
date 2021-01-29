1. Make sure that you can access the [Google Developers Console](https://console.developers.google.com/).

1. Create a Google project using these [instructions](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin).

1. In the **Authorized redirect URIs** section of the creation wizard, click **ADD URI** to add the Okta redirect URI for your app integration.

    The redirect URI is the location where the Identity Provider (IdP) sends the authentication response (the access token and the ID token). The URI sent in the authorize request from the client needs to match the redirect URI set at the IdP. The URI needs to be located a secure domain that you own. This URI has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and the callback endpoint.

    Paste your redirect URI into the text field.
1. Save the OAuth 2.0 Client ID and the generated Client ID and Client Secret values so you can add them to your Okta configuration.

> **Note:** There may be additional settings on the [Google Developers Console](https://console.developers.google.com) site that you can configure for the app. The steps in this guide address the quickest route to setting up Google as an Identity Provider with Okta. See the Google documentation for more information on additional configuration settings.
