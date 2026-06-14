When the connection to Okta is unavailable, users can still sign in through Access Gateway and access OIDC apps. Access Gateway uses an embedded OIDC provider to issue tokens and falls back to local directory authentication when Okta is unreachable.

OIDC tokens issued by Access Gateway have the `iss` claim set to the Access Gateway authorization server domain, not your Okta tenant domain. Configure your client app to expect tokens from Access Gateway. For an overview of OIDC, see [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).

This is the typical flow to configure an OIDC app in Access Gateway:

1. Create the app, specifying the app type, redirect URIs, and client credentials. See [Create the app](#create-the-app).
1. Configure your client app to use Access Gateway as the OIDC provider. Retrieve the discovery document from Access Gateway to get the endpoint URLs that your client needs. See [Configure your client app](#configure-your-client-app).

OIDC apps in Access Gateway can only be created and configured using the Access Gateway API. You can view OIDC apps in the Access Gateway UI console, but you can't add or edit them there.
