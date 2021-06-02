The Resource Owner Password flow is rarely the recommended approach. It is intended for applications for which no other flow works, as it requires your application code to be fully trusted and protected from credential-stealing attacks. It is made available primarily to provide a consistent and predictable integration pattern for legacy applications that can't otherwise be updated to a more secure flow such as Authorization Code flow. This should be your last option, not your first choice.

At a high-level, this flow has the following steps:

- Your client application collects a user's credentials.
- Your application sends these credentials to your Authorization Server.
- If the credentials are accurate, Okta responds with the requested tokens.

See our [OAuth 2.0 overview](/docs/concepts/oauth-openid/#resource-owner-password-flow) for more information on the Resource Owner Password flow.
