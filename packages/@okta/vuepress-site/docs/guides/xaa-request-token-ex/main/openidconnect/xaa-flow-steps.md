1. **[User SSO](#user-sso)**:

    In a SAML-based XAA flow, your requesting app acts on behalf of an authenticated user. Instead of exchanging an OIDC ID token, your app exchanges a SAML 2.0 assertion for an OAuth 2.0 refresh token, obtains an Identity Assertion JWT  Authorization Grant (ID-JAG) token from Okta, and then redeems that ID-JAG for an access token at the target resource's authorization server.

      1. The user initiates sign in to your app
      [[style="list-style-type:lower-alpha"]]
      1. The app redirects the user to the IdP to SSO with SAML 2.0
      1. After the user is authenticated, the IdP returns the SAML assertion response to your app.
      1. Your app uses the SAML assertion to request for a refresh token from the IdP

1. **Refresh token issued**: The IdP returns a refresh token.
1. **[Token exchange for ID-JAG](#token-exchange-for-id-jag)**: To access a specific resource on behalf of the user, your app exchanges the refresh token to obtain an Identity Assertion JWT Authorization Grant (ID-JAG) token.
1. **ID-JAG token issued**: The IdP issues an ID-JAG token to the client if the client has a trusted connection to the resource server.
1. **[Exchange ID-JAG for access token](#exchange-id-jag-for-access-token)**: Your app presents the ID-JAG token to the resource authorization server for an access token.
1. **Resource access token issued**: The resource authorization server validates the ID-JAG and issues a short-lived, scoped access token.
1. **[Client accesses resource data](#client-access-resource-data)**: The requesting client (AI agent) uses the short-lived, scoped token to access the protected resource app on the user's behalf.