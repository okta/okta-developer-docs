---
title: Configure Swift SDK redirect authentication
excerpt: Control if information, such as remembering the device is passed between the web authentication session and your app.
layout: Guides
---

Control if information, such as remembering the device is passed between the web authentication session and your app.

## Overview

The browser used for web authentication on Apple devices can prevent sharing information with your app. This is done by creating a private, or ephemeral browser session. Your app controls this behavior with the `ephemeralSession` property of the `WebAuthentication` class. The default value is `false` which enables sharing information with your app. In addition, the OS presents a confirmation dialog that requests permission for your app to use the configured redirect URL. For example, the dialog below asks the user to allow the app My App to use the `myapp.okta.com` domain to authorize the sign-in attempt.

<div class="half border">

!["A confirmation dialog asking the user to allow an app to use a redirect URL for sign in."](/img/mobile-sdk/mobile-redirect-alert.png)

</div>

To avoid a confirmation dialog, set `ephemeralSession` to `true` before calling `signIn`. However, this prevents sharing information between the authentication session and your app, which:

- Prevents remembering the device.
- Prevents single sign-on.
- Requires a full authentication each time, such as prompting for multiple factors.

## Sign-out the user

There are two steps to sign out a user completely when `ephemeralSession` is set to `false`:

1. Call the `signOut(from:credential:options:)` or `signOut(from:credential:options:completion:)` function of the `WebAuthentication` class to invalidate the browser window session.
2. Call the `remove()` function of the `Credential` class to remove any existing authentication tokens.

If you don't do this then when the user next authenticates, the token may be updated without requiring any factors. The user experiences this as an immediate authentication to the last account from which they signed-out.
