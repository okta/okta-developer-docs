## About the Client Credentials grant

Use the Client Credentials flow for server-side ("confidential") client applications with no end user. Typically, that means for machine-to-machine communication. In this scenario, your application needs to store its client ID and secret securely and to exchange them with Okta for an access token.

This guide discusses using the Client Credentials flow with a [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server) to get an access token for use with your APIs. If you need access tokens that you can use to gain access to Okta's APIs (OAuth for Okta), see [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/).

See the [OAuth 2.0 and OpenID Connect decision flowchart](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow) for the appropriate flow recommended for your app.
