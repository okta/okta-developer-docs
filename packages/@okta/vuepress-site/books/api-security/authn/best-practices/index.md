---
title: Recommended Best Practices for Authentication - Authentication
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/authn/">&larr; Authentication</a></div>

## Recommended Best Practices for Authentication {#authn-best-practices}

Using industry standard authentication protocols will help you secure your API in well-understood, predictable, and scalable ways that allow your team to use established services, components, and libraries while not confusing end users.

If you're building an API for server-side clients, you essentially have three choices when implementing authentication:

**HTTP Basic Authentication:** This is the simplest option, but doesn't provide the security and key rotation benefits of OAuth Client Credentials.

**Digest Authentication:** This is what many large providers use with various customizations, most famously, Amazon. Unless you have a very pressing security need, I recommend you not use Digest Authentication as it requires a lot of engineering work to implement and maintain, and shifts the security burden to you.

**OAuth Client Credentials:** This is the only OAuth flow designed for server-side clients to use. The client will exchange their ID and secret for a token. If you're building an API and want to reduce security risk over the network, using OAuth Client Credentials is a good option.

If you're building an API for a mobile client, you should always use the OIDC Authorization Code flow with PKCE (as explained in the OpenID Connect section above).

If you're building an API for a web app with a server-side backend, you should always use the OIDC Authorization Code flow.

If you're building an API for single-page app (e.g. a React app) that has no server-side backend, then the only type of authentication you can use is the OIDC Implicit flow as described earlier.

By following these guidelines and using the correct form of authentication for the correct type of API, you can feel confident in your implementation and give your users a sense of security, regardless of what type of app client is being used.

