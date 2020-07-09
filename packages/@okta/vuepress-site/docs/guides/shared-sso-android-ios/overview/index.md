---
title: Overview
---
In OAuth, the authentication flow for web apps uses URIs to initiate the authorization request and to return the response to the web app. The flow is similar for mobile apps. The mobile app uses an external user-agent (the device's browser) to perform authentication. Since the authorization request from a mobile app is initiated from the device's browser, you can apply sign-in principles that are similar to web apps in order to share a sign-in session between mobile apps on a device.

This guide uses sample apps to demonstrate the concept of sharing a Single Sign-On (SSO) session on a mobile device. After you complete this guide, you should have a better understanding of how a sign-in session is shared between two mobile apps on a device and can then use the steps in the guide to help you configure your own apps.

This guide assumes that you:

* Have an Okta Developer Edition organization. [Create one for free](https://developer.okta.com/signup).
* Are using Android Studio with an emulator for Android testing
* Are using Xcode with a simulator for iOS testing
* Downloaded the appropriate apps to use for testing purposes:

    <StackSelector snippet="sampleapp" />

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
