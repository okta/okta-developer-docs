When you are configuring federation between two Okta orgs using OpenID Connect:

1. At the Okta org that represents the Identity Provider, select **Applications** and then click **Add Application**.

2. Click **Create New App**.

3. You need a trusted client, so select Web as the platform. OpenID Connect is the sign-in method by default.

4. Enter a name for your application.

5. In the **Login Redirect URIs** box, enter the redirect URI. The redirect URI:
    * Is constructed using your Okta org subdomain and the callback endpoint.  
    For example, if your Okta subdomain is called `company`, then the URI would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.
    * Is where the IdP returns the authentication response (the access token and the ID token)
    * Needs to be a secure domain that you own
    * Should match the redirect URI sent in the authorize request from the client

6. Assign a group or leave the Everyone default. Be sure to verify that the users you want to have access are assigned to the group that you select.

7. Click **Done**.

8. Copy the **Client ID** and **Client secret** from the **Client Credentials** section and paste into a text editor. You will need these when you configure this Identity Provider in your other Okta org in the next section.
