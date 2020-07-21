---
title: Overview
---

If you are building a server-side (or "web") application that is capable of securely storing secrets, then the authorization code flow is the recommended method for controlling access to it.

At a high-level, this flow has the following steps:

- Your application directs the browser to the Okta Sign-In page, where the user authenticates.
- The browser receives an authorization code from your Okta authorization server.
- The authorization code is passed to your application.
- Your application sends this code to Okta, and Okta returns access and ID tokens, and optionally a refresh token.
- Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.

For more information on the authorization code flow, including why to use it, see [our OAuth 2.0 overview](/docs/concepts/auth-overview/#authorization-code-flow).

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
