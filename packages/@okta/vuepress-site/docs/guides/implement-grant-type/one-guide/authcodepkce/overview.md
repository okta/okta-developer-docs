If you are building a native application, then the Authorization Code flow with a Proof Key for Code Exchange (PKCE) is the recommended method for controlling the access between your application and a resource server.

> **Note:** Some browsers have begun blocking third-party cookies by default, disrupting Okta functionality in certain flows. See [FAQ: How Blocking Third Party Cookies Can Potentially Impact Your Okta Environment](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment).

The Authorization Code flow with PKCE is the standard code flow with an extra step at the beginning and an extra verification at the end. At a high-level, the flow has the following steps:

- Your application generates a code verifier followed by a code challenge.
- Your application directs the browser to the Okta sign-in page, along with the generated code challenge, and the user authenticates.
- Okta redirects back to your native application with an authorization code.
- Your application sends this code, along with the code verifier, to Okta. Okta returns access and ID tokens, and optionally a refresh token.
- Your application can now use these tokens to call the resource server (for example, an API) on behalf of the user.

See our [OAuth 2.0 overview](/docs/concepts/oauth-openid/#authorization-code-with-pkce-flow) for more information on the authorization code with PKCE flow, including why to use it.
