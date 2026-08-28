Use the refresh token obtained from the previous step to request an ID-JAG token from the Okta org authorization server. The ID-JAG acts as the signed identity assertion presented to the target resource.

> **Note:** You're using the same Okta org authorization server's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) for this token exchange.