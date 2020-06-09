1. Make sure that you can access the [Google Developers Console](https://console.developers.google.com/).

2. Create a Google project using these [instructions](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin).

3. Save the OAuth client ID and secret values so you can add them to the Okta configuration in the next section.

4. In the **Authorized redirect URIs** section of the page, click **ADD URI** to add the Okta redirect URI.

5. Paste the redirect URI into the box. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URI has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and then the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `login.company.com/oauth2/v1/authorize/callback`.

> **Note:** There may be additional settings on the [Google Developers Console](https://console.developers.google.com) site that you can configure for the app. The steps in this guide address the quickest route to setting up Google as an Identity Provider with Okta. See the Google documentation for more information on additional configuration settings.
