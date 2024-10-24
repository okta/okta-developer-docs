In the Okta org that functions as the IdP, create a client app that you want to use for authenticating and authorizing your users. When you're configuring federation between two Okta orgs, use OpenID Connect as the sign-in method:

1. In the Admin Console for the Okta org that represents the Identity Provider, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method**. You need a trusted client, so select **Web Application** as the **Application type**.
1. Click **Next** and enter a name for your application.
1. In the **Sign-in redirect URIs** box, enter the redirect URI taking into consideration the following:
    * It's constructed using your Okta org subdomain and the callback endpoint.
    For example, if your Okta subdomain is called `company`, then the URI would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you’ve configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.
    * It's defined as where the IdP returns the authentication response (the access token and the ID token).
    * It needs to be a secure domain that you own.
    * It matches the redirect URI sent in the authorize request from the client.

    > **Note:** Include all base domains (Okta domain and custom domain) that your users interact with in the allowed redirect URI list.

1. Assign a group or leave the **Everyone** default. Be sure to verify that the users you want to have access are assigned to the group that you select. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation.
1. Click **Save**, and then copy the **Client ID** and **Client secret** from the **Client Credentials** section and paste into a text editor. You need these when you configure this Identity Provider in your other Okta org in the next section.

<AMROktatoOkta/>

See [Create an Identity Provider in Okta](#create-an-identity-provider-in-okta) for Okta-to-Okta orgs.
