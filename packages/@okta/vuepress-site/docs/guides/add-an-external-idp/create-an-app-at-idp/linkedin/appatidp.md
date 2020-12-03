1. Sign up for a [LinkedIn Developer](https://www.linkedin.com/developers/) account if you haven't already done so.  

2. Create an app in the [LinkedIn developer](https://www.linkedin.com/developers/apps/new) portal.

3. From your app, click on the **Auth** tab and make note of the **Client ID** and **Client Secret** values so that you can add them to the Okta configuration in the next section.

4. From the **Auth** tab, under **OAuth 2.0 settings**, click the pencil next to **Authorized redirect URLs for your app**.

  The redirect URL:
    - Is where the IdP returns the authentication response (the access token and the ID token)
    - Needs to be a secure domain that you own
    - Should match the redirect URI sent in the authorize request from the client
    - Has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and the callback endpoint
    - For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`.
    - If you have configured a custom domain in your Okta Org, use that value to build your redirect URL, such as `https://login.company.com/oauth2/v1/authorize/callback`.
 
5. Paste the redirect URL into the box.

6. Click **Update**.

> **Note:** You must explicitly request the `r_liteprofile` and `r_emailaddress` scopes when requesting an authorization code. See [Permissions](https://docs.microsoft.com/en-us/linkedin/shared/authentication/permissions?context=linkedin/context) for more information.

Example: `scope=r_liteprofile r_emailaddress w_member_social`

> **Note:** The steps in this guide address the quickest route to setting up LinkedIn as an Identity Provider with Okta. See the [LinkedIn documentation](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication?context=linkedin/consumer/context) for more information on additional configuration settings.
