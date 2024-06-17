## About the Client Credentials grant

Use the Client Credentials flow for server-side ("confidential") client apps with no end user. Typically, that means for machine-to-machine communication. In this scenario, your app needs to securely store its client ID and secret, and then exchange them with Okta for an access token.

This guide uses the Client Credentials flow with a [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server) to get access tokens for use with your APIs. If you need access tokens to make calls to the Okta APIs (OAuth for Okta), see [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/).

See the [OAuth 2.0 and OpenID Connect decision flowchart](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow) for the appropriate flow recommended for your app.
