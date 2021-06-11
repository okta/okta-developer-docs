If you are building a Single-Page Application (SPA) that runs in older browsers that don't support Web Crypto for PKCE, then the Implicit flow is the recommended method for controlling access between your SPA and a resource server. The Implicit flow is intended for applications where the confidentiality of the client secret can't be guaranteed. In this flow, the client doesn't make a request to the `/token` endpoint, but instead receives the access token directly from the `/authorize` endpoint. The client must be capable of interacting with the resource owner's user agent and capable of receiving incoming requests (through redirection) from the Authorization Server.

> **Note:** For SPAs running in modern browsers that support Web Crypto for PKCE, we recommend using the [Authorization Code flow with PKCE](/docs/guides/implement-auth-code-pkce/) instead for maximum security.

At a high level, the Implicit flow has the following steps:

- Your application directs the browser to the Okta Sign-In Page, where the user authenticates.
- Okta redirects the browser back to the specified redirect URI, along with access and ID tokens as a hash fragment in the URI.
- Your application extracts the tokens from the URI.
- Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.

See our [OAuth 2.0 overview](/docs/concepts/oauth-openid/#implicit-flow) for more information on the Implicit flow.

> **Note:** If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).