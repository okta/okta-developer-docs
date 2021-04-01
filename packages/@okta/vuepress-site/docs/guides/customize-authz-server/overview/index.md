---
title: Overview
---

Okta allows you to create multiple custom OAuth 2.0 Authorization Servers that you can use to protect your own resource servers. Within each Authorization Server you can define your own OAuth 2.0 scopes, claims, and access policies.

If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account, you already have a Custom Authorization Server created for you, called `default`. For simple use cases this default Custom Authorization Server should suffice. If your application has requirements such as additional scopes, customizing rules for when to grant scopes, or you need additional Authorization Servers with different scopes and claims, then this guide is for you.

See [Which Authorization Server should you use](/docs/concepts/auth-servers/#which-authorization-server-should-you-use) for more information on the types of Authorization Servers available to you and what you can use them for.

If you only need one Authorization Server, but you'd like to know more about customizing it, you can skip ahead and find out how to:

- [Create Access Policies](/docs/guides/customize-authz-server/create-access-policies/)
- [Create Rules for your Access Policies](/docs/guides/customize-authz-server/create-rules-for-policy/)
- [Create Scopes](/docs/guides/customize-authz-server/create-scopes/)
- [Create Claims](/docs/guides/customize-authz-server/create-claims/)
- [Test your Authorization Server](/docs/guides/customize-authz-server/test-authz-server/)

> **Note:** See our [OAuth 2.0 Overview](/docs/concepts/oauth-openid/) for a high-level explanation of OAuth 2.0 and OpenID Connect. See [Scopes](/docs/reference/api/oidc/#scopes) and [Claims](/docs/reference/api/oidc/#tokens-and-claims) for more information on what scopes and claims are and how to use them.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forums](https://devforum.okta.com).

<NextSectionLink/>
