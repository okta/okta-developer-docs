---
title: Configure Swift SDK redirect authentication
excerpt: Control the presentation of a user consent dialog, the ability to use Single Sign-On, and other related functionality.
layout: Guides
---

Control access to the storage used by the redirect authentication session, such as cookies that are used to remember the device.

## Overview

The redirect authentication method in the Swift SDK opens a browser window in your app for the sign-on flow. The browser is opened using an Apple API for secure authentication.

One option controls if the secure browser session saves data, such as cookies, to the user's regular browser. The default setting for the Swift SDK enables sharing that data. Apple privacy measures require user consent to share that data, which results in the system asking for consent before displaying the browser. This occurs for both the sign-in and sign-out flows.

For example, this dialog asks the user to allow any information from the authorization provider `myapp.okta.com` with the app My App:

<div class="half border">

!["A confirmation dialog asking the user to allow sharing information between myapp.okta.com and My App."](/img/mobile-sdk/mobile-redirect-alert.png)

</div>

## Configure the secure session

Use the `ephemeralSession` property of the `WebAuthentication` class to control sharing data between the secure session and the user's regular browser. The default value is `false`.

To avoid a confirmation dialog, set `ephemeralSession` to `true` before calling `signIn`. However, this also prevents Single Sign-On (SSO) and has other effects:


| `ephemeralSession` | Remember device | SSO | Authenticate each time |
|--------------------|-----------------|-----|------------------------|
| `true`             | No              | No  | Yes                    |
| `false`            | Yes             | Yes | No                     |

## Sign out the user

There are two steps to sign out a user completely when `ephemeralSession` is set to `false`:

1. Call the `signOut(from:credential:options:)` or `signOut(from:credential:options:completion:)` function of the `WebAuthentication` class to invalidate the browser window session.
2. Call the `remove()` function of the `Credential` class to remove any existing authentication tokens.

If you don't do this then when the user next authenticates the token may be updated without requiring any factors. The user experiences this as an immediate authentication to the last account from which they signed out.
