## About the Resource Owner Password grant

The Resource Owner Password flow is not a recommended approach. It is intended for applications for which no other flow works, as it requires your application code to be fully trusted and protected from credential-stealing attacks. It is made available primarily to provide a consistent and predictable integration pattern for legacy applications that can't otherwise be updated to a more secure flow such as the Authorization Code flow. This should be your last option, not your first choice.

To select the appropriate flow to use for your application, see [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow)'s decision flowchart.
