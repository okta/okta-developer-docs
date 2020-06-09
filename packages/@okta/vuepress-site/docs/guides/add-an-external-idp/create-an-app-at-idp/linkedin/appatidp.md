1. Go to [LinkedIn Developer page](https://developer.linkedin.com/) and register for a developer account if you haven't already done so.

2. Create a LinkedIn app using these [instructions](https://www.linkedin.com/developer/apps).

3. Save the **Client ID** and **Client Secret** values (located on the **Auth** tab) so that you can add them to the Okta configuration in the next section.

4. Add the Okta redirect URL for your app in the **OAuth 2.0 settings** section by clicking the pencil and then **Add redirect URL**.

5. Paste the redirect URI into the box. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URI has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and then the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `login.company.com/oauth2/v1/authorize/callback`.

6. Click **Update**.

> **Note:** You must explicitly request the `r_liteprofile` and `r_emailaddress` scopes when requesting an authorization code. See [Permissions](https://docs.microsoft.com/en-us/linkedin/shared/authentication/permissions?context=linkedin/context) for more information.

Example: `scope=r_liteprofile r_emailaddress w_member_social`

> **Note:** There may be additional settings on the [instructions page](https://www.linkedin.com/developer/apps) that you can configure for the app. The steps in this guide address the quickest route to setting up LinkedIn as an Identity Provider with Okta. See the LinkedIn documentation for more information on additional configuration settings.
