From the Okta CLI:

1. Enter the command: `okta apps create`.
2. Type your app name.
3. Select **Single Page App** or **Web** as the **Type of Application**.
    - **Single Page App**&mdash;for applications using tokens in Angular, React, Vue, or other browser-side code
    - **Web**&mdash;for applications using tokens solely in server-side code

4. For the **Redirect URI(s)**, type: `http://localhost:8080/login/callback`.
5. For the **Post Logout Redirect URI(s)**, leave as-is (use the default).

The Okta CLI displays the following information after your OIDC application has been added to your Okta org:
- **Issuer**&mdash;the authorization server URI that will perform authentication (this is typically the **default** authorization server for your first app)
- **Client ID**&mdash;the public identifier for the client that is required for all OAuth flows
- **Client secret**&mdash;the secret key used by the client to exchange an authorization code for a token (must be kept confidential)

Save these values for Okta authentication in your app.
