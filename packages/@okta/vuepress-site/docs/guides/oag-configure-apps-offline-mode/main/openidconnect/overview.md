When the connection to Okta is unavailable, users can still sign in through Access Gateway and access OIDC apps. Access Gateway uses an embedded OIDC provider to issue tokens and falls back to local directory authentication when Okta is unreachable.

OIDC tokens issued by Access Gateway have the `iss` claim set to the Access Gateway authorization server domain, not your Okta tenant domain. Configure your client app to expect tokens from Access Gateway. For an overview of OIDC, see [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).

This is the typical flow when you configure an OIDC app in Access Gateway:

1. You create the app, specifying the app type and redirect URIs. Access Gateway returns the `clientId` and, for confidential clients, the `clientSecret`. See [Create the app](#create-the-app).
1. You configure your client app using the OIDC discovery document that's returned by Access Gateway. See [Configure your client application](#configure-your-client-application).

OIDC apps in Access Gateway can only be created and configured using the Access Gateway API.
