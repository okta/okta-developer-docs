In the Admin Console, complete these steps:

1. Select **Applications > Applications** in the side navigation.

2. Click **Add Application**.

3. From the **Add Application** page, click **Create New App**.

4. Select a **Platform**:
    - **Single Page App(SPA)**&mdash;for applications using tokens in Angular, React, Vue, or other browser-side code
    - **Web**&mdash;for applications using tokens solely in server-side code

5. Select **OpenID Connect** for the **Sign on method**.

6. Click **Create**.

7. From the **Create OpenID Connect App Integration** page, specify your **Application name**.

8. Next to **Login redirect URIs**, click **+ Add URI** to specify each login redirect URI for your app. Okta sends OAuth authorization responses to the specified URIs, which are also known as callback endpoints. For the Okta sample apps, you can specify `http://localhost:8080/authorization-code/callback` as a login redirect URI.

9. Next to **Logout redirect URIs**, click **+ Add URI** to specify the logout redirect URI. This setting lets you specify a URI to redirect the user’s browser to when they sign out. For the Okta sample apps, you don't need to specify a logout redirect URI.

10. Click **Save**.

Your registered app page is displayed.

From the **General** tab, save the following client credentials for your app build:
- **Client ID**&mdash;the public identifier for the client that is required for all OAuth flows
- **Client secret**&mdash;the secret key used by the client to exchange an authorization code for a token (must be kept confidential)

Remaining in the Admin Console, navigate to **Security > API**. From the **Authorization Servers** tab, save the following value from your **default** authorization server:
- **Issuer URI**&mdash;the authorization server URI that will perform authentication