When you are configuring federation between two Okta orgs using OpenID Connect:

1. At the Okta org that represents the Identity Provider, select **Applications** and then click **Add Application**.

2. You need a trusted client, so select **Web** as the platform. OpenID Connect is the sign-in method by default.

3. Click **Next**.

4. Enter a name for your application.

5. In the **Login Redirect URI** box, enter the Okta redirect URI. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URL has the same structure for most Identity Providers in Okta and is constructed using your Okta subdomain and then the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `login.company.com/oauth2/v1/authorize/callback`.

6. Assign a group or leave the **Everyone** default. Be sure to verify that the users you want to have access are assigned to the group that you select.

7. Click **Done**.

8. Copy the Client ID and Client Secret from the **Client Credentials** section and paste into a text editor. You need these when you configure this Identity Provider in your org.