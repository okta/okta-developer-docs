---
title: Check for a session at start up
excerpt: Learn how to check a user’s session status at startup
layout: Guides
---

Learn to implement a session status check that’s compatible with both Okta-hosted and self-hosted sign-in forms.

---
**Learning outcomes**

How to load the details of the signed-in user and check for an existing authenticated session at app startup.

---

## Introduction

When a user signs in to your app, Okta issues an access token that grants them access to protected resources for a specific duration. A crucial part of creating a seamless user experience is to check for an existing, unexpired token when the app launches. This allows you to determine if the user is already authenticated, saving them the effort of signing in again.

This guide provides the platform-specific implementation details for checking a user's session status. This content applies to both Okta-hosted and self-hosted sign-in forms. See the dropdown menu to the right to switch between Android and iOS content.

## Check for a session

When you check for an existing session, it may take two steps:

* Check for an existing token.
* Refresh the token if it's expired.

<StackSnippet snippet="checkfortoken" />

You have now successfully implemented the logic to check for and validate a user's session at app startup. By ensuring that tokens are automatically refreshed, you can maintain a smooth and secure experience for your users.

## Related topics

* <StackSnippet snippet="related" />
* [Refresh token rotation](/docs/guides/refresh-tokens/main/#refresh-token-rotation)
