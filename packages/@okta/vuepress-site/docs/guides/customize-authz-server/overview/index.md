---
title: Overview
---

Okta allows you to create multiple custom OAuth 2.0 authorization servers which can be used to protect your own resource servers. Within each authorization server you can define your own OAuth 2.0 scopes, claims, and access policies.

If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account, you already have a custom Authorization Server created for you, called `default`. For simple use cases this default Authorization Server should suffice. If your application has requirements, such as additional scopes, customizing rules for when to grant scopes, or you need additional authorization servers with different scopes and claims, then this guide is for you.

If you only need one Authorization Server, but you'd like to know more about customizing it, you can skip ahead and find out how to:

- [Create Access Policies](/docs/guides/customize-authz-server/create-access-policies/)
- [Create Rules for your Access Policies](/docs/guides/customize-authz-server/create-rules-for-policy/)
- [Create Scopes](/docs/guides/customize-authz-server/create-scopes/)
- [Create Claims](/docs/guides/customize-authz-server/create-claims/)
- [Test your Authorization Server](/docs/guides/customize-authz-server/test-authz-server/)

> NOTE: For a high-level explanation of OAuth 2.0 and OpenID Connect see our [OAuth 2.0 Overview](/docs/concepts/auth-overview/).

<NextSectionLink/>
