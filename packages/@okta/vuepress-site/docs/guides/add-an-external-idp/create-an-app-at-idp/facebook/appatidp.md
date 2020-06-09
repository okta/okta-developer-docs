1. Go to [Facebook for Developers](https://developers.facebook.com) and register for a developer account if you haven't already done so.

2. Access the [Facebook App Dashboard](https://developers.facebook.com/apps).

3. Create a Facebook app using these [instructions](https://developers.facebook.com/docs/apps/register).

    > **Note:** The `public_profile` and `email` OAuth scopes are automatically included by Okta. If your app requires more scopes, request a [Login Review](https://developers.facebook.com/docs/facebook-login/review) with Facebook. For more information on Facebook scopes, see [Permissions](https://developers.facebook.com/docs/facebook-login/permissions).

4. After you create the app, on the **Add a Product** page, click **Set Up** in the **Facebook Login** tile.

5. On the first page of the Quickstart, select **Web**.

6. In the **Site URL** box, enter the Okta redirect URI. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and then the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `login.company.com/oauth2/v1/authorize/callback`.

7. Click **Save**, then click **Next** until you exit the Quickstart wizard.

8. Under your app's **Client OAuth Settings**, find the **Valid OAuth Redirect URIs** section and paste the redirect URI.

9. Click **Save Changes**.

10. On the App Dashboard page, expand **Settings** on the left side of the page, and then click **Basic**.

11. Save the **App ID** and the **App Secret** values so you can add them to the Okta configuration in the next section.

> **Note:** There may be additional settings on the [Facebook App Dashboard](https://developers.facebook.com/apps) that you can configure for the app. The steps in this guide address the quickest route to setting up Facebook as an Identity Provider with Okta. See the Facebook documentation for more information on additional configuration settings.
