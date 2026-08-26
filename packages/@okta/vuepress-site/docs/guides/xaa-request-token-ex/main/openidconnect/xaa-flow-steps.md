1. **[User SSO](#user-sso)**: In a OIDC-based XAA flow, your requesting app acts on behalf of an authenticated user. The requesting app obtains the users's ID token after authentication.

1. **ID token issued**: The IdP returns a ID token.
1. **[Token exchange for ID-JAG](#token-exchange-for-id-jag)**: To access a specific resource on behalf of the user, your app exchanges the ID token to obtain an Identity Assertion JWT Authorization Grant (ID-JAG) token.
1. **ID-JAG token issued**: The IdP issues an ID-JAG token to the client if the client has a trusted connection to the resource server.
1. **[Exchange ID-JAG for access token](#exchange-id-jag-for-access-token)**: Your app presents the ID-JAG token to the resource authorization server for an access token.
1. **Resource access token issued**: The resource authorization server validates the ID-JAG and issues a short-lived, scoped access token.
1. **[Client accesses resource data](#client-access-resource-data)**: The requesting client (AI agent) uses the short-lived, scoped token to access the protected resource app on the user's behalf.
