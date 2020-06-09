1. Create a Microsoft app using these [instructions](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

2. In the **Redirect URI** section of the page, paste the Okta redirect URI. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URL has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and then the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `login.company.com/oauth2/v1/authorize/callback`.

3. Save the Application ID value so you can add it to the Okta configuration in the next section.

4. Under **Certificates & secrets**, click **New client secret** to generate a client secret for your app. Save the value so you can add it to the Okta configuration in the next section. This is the secret that corresponds to your Application ID.

> **Note:** There may be additional settings on the [Microsoft instruction page](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) that you can configure for the app. The steps in this guide address the quickest route to setting up Microsoft as an Identity Provider with Okta. See the Microsoft documentation for more information on additional configuration settings.
