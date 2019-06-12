---
title: Overview
---

If you are building a Single-Page Application (SPA), then the implicit flow is the recommended method for controlling access between your SPA and a resource server.

At a high-level, this flow has the following steps:

- Your application directs the browser to the Okta sign-in page, where the user authenticates.
- Okta redirects the browser back to the specified redirect URI, along with access and ID tokens as a hash fragment in the URI.
- Your application extracts the tokens from the URI.
- Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.

For more information on the implicit flow, including why to use it, see [our OAuth 2.0 overview](/docs/concepts/auth-overview/#implicit-flow).

<NextSectionLink/>
