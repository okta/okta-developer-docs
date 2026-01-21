---
title: Keep the user signed in
excerpt: Learn how to 
layout: Guides
---



---
**Learning outcomes**



---

## Introduction

As developers, one of your key goals is to create a seamless experience for your users. A common challenge in that effort is session management. For security, access tokens are intentionally short-lived, but users often expect to remain signed in to an app for longer periods.

So, how do you reconcile the need for security with the expectation of a persistent user session? Whether you're using an Okta-hosted sign-in form or a self-hosted experience, the solution lies in refresh tokens. This is precisely the problem they are designed to solve.

This guide discusses the proper way to enable and use refresh tokens in your app to provide that long-lived session your users expect, without compromising on security best practices.

## Enable and Use Refresh Tokens

Configure your Okta app integration to allow refresh tokens, and then implement the code in your mobile app to use them.

### Enable the refresh token grant

Enable the **Refresh Token** grant type in your app integration by following these steps:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the name of your integration.
1. Click **Edit** in the **General Settings** section.
1. Select **Refresh Token** as a grant type.
1. Click **Save** at the bottom of the section.

### Implement the code in your mobile app

<StackSnippet snippet="refresh" />

## Conclusion

By following these steps, you now have a solid foundation for implementing a more persistent sign-in experience.

The key takeaway is to refresh tokens strategically. While it's a powerful feature for improving user experience, each refresh operation consumes network and battery resources. By refreshing a token only when it's required to authenticate a server call, you create an app that’s both user-friendly and efficient.

## Related topics

Check for a session at startup
Android
https://developer.okta.com/docs/guides/sign-into-mobile-app-redirect/android/main/#check-for-a-session-at-startup
ios
https://developer.okta.com/docs/guides/sign-into-mobile-app-redirect/ios/main/#check-for-a-session-at-startup

Refresh token rotation
