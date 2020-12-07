> **Note**
This guide will refer to the Okta org that represents the Identity Provider as **Org A** and the second Okta org as **Org B**

1. At **Org A**, select **Applications** and then click **Add Application**.

2. Click **Create New App**.

3. You need a trusted client, so select **Web** as the platform. 

4. Select **OpenID Connect** as the sign-in method. 

5. Click **Create**.

6. Enter a name for your application.

7. In the **Login Redirect URIs** box, enter the redirect URI. The redirect URI:
    * Is constructed using your Okta **Org B** subdomain and the callback endpoint.  
    For example, if your Okta subdomain is called `company`, then the URI would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.
    * Is where the IdP returns the authentication response (the access token and the ID token)
    * Needs to be a secure domain that you own
    * Should match the redirect URI sent in the authorize request from the client
    

8. Click **Save**.

9. Assign the newly created app to a group or to individual users. If you assign the app to a group, be sure to verify that the users who need access to the app are members of the selected group.

10. Click the **General** tab and scroll down to the **Client Credentials** section.

11. Copy the **Client ID** and **Client Secret** and paste into a text editor. You will need these when you configure this Identity Provider in **Org B** in the next section.
