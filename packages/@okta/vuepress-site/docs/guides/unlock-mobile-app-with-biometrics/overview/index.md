---
title: Overview
---
Learn how to easily integrate biometric authentication like Face ID and Touch ID to your mobile apps that use Okta.

> **Note:** You must have already followed the [Sign users in to your mobile apps](/docs/guides/sign-into-mobile-app/android/before-you-begin/) guide to add biometric unlock with Touch ID, Face ID, and Smart Lock.

## How it works
When you [configure the Okta SDK](/docs/guides/sign-into-mobile-app/configure-packages/) with the `offline_access` scope, your mobile app gets a refresh token from Okta. The refresh token is long-lived and is used to keep the user signed in to your app.

The refresh token is used to get new access tokens. Access tokens allow your mobile app to make authenticated requests to your API, but are short-lived. As access tokens expire, the refresh token is used to obtain new access tokens.

By storing the refresh token on the device and encrypting it with a biometric challenge, you can safely keep the user signed in, but require the user to pass a biometric challenge to keep using the app. This means that the user must sign in with their password the first time, but can then use their fingerprint or face to unlock the app after that.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>