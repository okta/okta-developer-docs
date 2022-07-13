At LinkedIn, create the client application that you want to use for authenticating and authorizing your users.

1. Create an app in the [LinkedIn Developer portal](https://www.linkedin.com/developers/apps/new).

2. From your app, click the **Auth** tab and make note of the **Client ID** and **Client Secret** values so that you can add them to the Okta configuration in the next section.

3. From the **Auth** tab, under **OAuth 2.0 settings**, click the pencil next to **Authorized redirect URLs for your app**.
  You need to enter a redirect URL in this field. The redirect URL:
    * Is where the IdP returns the authentication response (the access token and the ID token)
    * Needs to be a secure domain that you own
    * Should match the redirect URI sent in the authorize request from the client
    * Has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and the callback endpoint.
    For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to build your redirect URL, such as `https://login.company.com/oauth2/v1/authorize/callback`.

  Specify the Okta URI and the custom URI in the external IdP's allowed redirect URI list.

4. Paste the redirect URL into the box.

5. Click **Update**.

6. From the **Products** tab, in the **Sign In with LinkedIn** box, click **Select**.

7. In the resulting dialog box, select **I have read and agree to these terms**, and then click **Add Product**.

> **Note:** You must explicitly request the `r_liteprofile` and `r_emailaddress` scopes when requesting an authorization code. See [Permissions](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext&tabs=HTTPS) for more information.

Example: `scope=r_liteprofile r_emailaddress w_member_social`

> **Note:** The steps in this guide address the quickest route to setting up LinkedIn as an Identity Provider with Okta. See the [LinkedIn documentation](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication?context=linkedin/consumer/context) for more information on additional configuration settings.
