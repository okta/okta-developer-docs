---
title: Keep the user signed in
excerpt: Learn how to enable and use refresh tokens in your app
layout: Guides
---

Configure your Okta app integration to allow refresh tokens, and then implement code in your mobile app to use them.

---

#### Learning outcomes

How to configure and use refresh tokens in your app.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An existing OpenID Connect app

---

## Introduction

As developers, one of your key goals is to create a seamless experience for your users. A common challenge in that effort is session management. For security, access tokens are intentionally short-lived, but users often expect to remain signed in to an app for longer periods.

So, how do you reconcile the need for security with the expectation of a persistent user session? Whether you're using an Okta-hosted sign-in form or a self-hosted experience, the solution lies in refresh tokens. This is precisely the problem that they're designed to solve.

This guide discusses how to enable and use refresh tokens in your app to provide a long-lived session without compromising on security best practices.

## Enable and use refresh tokens

Configure your Okta app integration to allow refresh tokens, and then implement the code in your mobile app to use them.

### Enable the Refresh Token grant

Enable the **Refresh Token** grant type in your app integration by following these steps:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the name of your app integration.
1. Click **Edit** in the **General Settings** section.
1. Select **Refresh Token** as a grant type.
1. Click **Save** at the bottom of the section.

> **Note**: You can also use the [Applications API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/replaceApplication!path=4/settings/oauthClient/grant_types&t=request) to enable the **Refresh Token** grant type.

### Implement the code in your mobile app

<StackSnippet snippet="refresh" />

## Conclusion

By following these steps, you now have a solid foundation for implementing a more persistent sign-in experience.

A refresh token best practice is to refresh strategically. While refresh tokens help improve the user experience, each refresh operation consumes network and battery resources. By refreshing a token only when it's required to authenticate a server call, you create an app that’s both user-friendly and efficient.

## Related topics

* <StackSnippet snippet="related" />
* [Refresh token rotation](/docs/guides/refresh-tokens/main/)
