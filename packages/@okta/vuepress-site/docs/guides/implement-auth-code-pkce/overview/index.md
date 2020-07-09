---
title: Overview
---

If you are building a native application, then the authorization code flow with a Proof Key for Code Exchange (PKCE) is the recommended method for controlling the access between your application and a resource server.

The Authorization Code Flow with PKCE is the standard Code flow with an extra step at the beginning and an extra verification at the end. At a high-level, the flow has the following steps:

- Your application generates a code verifier followed by a code challenge.
- Your application directs the browser to the Okta Sign-In page, along with the generated code challenge, and the user authenticates.
- Okta redirects back to your native application with an authorization code.
- Your application sends this code, along with the code verifier, to Okta. Okta returns access and ID tokens, and optionally a refresh token.
- Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.

For more information on the authorization code with PKCE flow, including why to use it, see our [OAuth 2.0 Overview](/docs/concepts/auth-overview/#authorization-code-with-pkce-flow).

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
