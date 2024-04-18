---
title: Share a sign-in session with native mobile apps
meta:
  - name: description
    content: Mobile apps use an external user-agent (the device's browser) to perform authentication. Get information on how you can apply sign-in principles that are similar to web apps to share a sign-in session between mobile apps on a device.
layout: Guides
---

<ClassicDocOieVersionNotAvailable />

This guide uses sample apps to demonstrate how to share a Single Sign-On (SSO) session on a mobile device. After you complete this guide, you should have a better understanding of how a sign-in session is shared between two mobile apps on a device and will be able to use the steps in the guide to help you configure your own apps.

<EmbeddedBrowserWarning />

---

#### Learning outcomes

* Persist a session between multiple OpenID Connect (OIDC) mobile apps.
* Clear the session when appropriate.

#### What you need

* An Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Android Studio with an emulator for Android testing.
* Xcode with a simulator for iOS testing.

#### Sample code

<StackSelector snippet="samplecode" noSelector />

---

## Overview

In OAuth, the authentication flow for web apps uses URIs to initiate the authorization request and to return the response to the web app. The flow is similar for mobile apps. The mobile app uses an external user-agent (the device's browser) to perform authentication. Since the authorization request from a mobile app is initiated from the device's browser, you can apply sign-in principles that are similar to web apps to share a sign-in session between mobile apps on a device.

## Session and persistent SSO

SSO allows users to authenticate once and access multiple resources without being prompted for more credentials. Okta supports both session and persistent SSO:

* **Session SSO**: Session SSO cookies are written for the authenticated user, which eliminates further prompts when the user switches apps during a particular session. However, if a particular session ends, the user is prompted for their credentials again.
* **Persistent SSO**: Persistent SSO cookies are written for the authenticated user, which eliminates further prompts when the user switches apps for as long as the persistent SSO cookie is valid.

The difference between persistent SSO and session SSO is that you maintain persistent SSO across different sessions. Persistent SSO is disabled by default in Okta. To share a sign-in session with native mobile apps, you need to enable persistent SSO.

<StackSelector snippet="enablesso" noSelector />

## Configure Two OpenID Connect Native Apps

Within the same org, you need to set up two Native OpenID Connect (OIDC) client apps.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Native Application** as the **Application type** and click **Next**.
1. Give the app integration a name, and then enter `com.first.sample:/callback` in the **Sign-in redirect URIs** box for the first app.
    > **Note:** When you create the second app, enter `com.second.sample:/callback`.
1. Ensure that **Authorization Code** and **Refresh Token** are selected in the **Grant Type Allowed** section.
1. Assign the group that you want (if you set Group Assignments for your app) or leave the **Everyone** default. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation.
1. Click **Save**.
1. In the **General Settings** section, click **Edit**.
1. In the **Login** section, click **Add URI** next to **Sign-out Redirect URIs**.
1. Enter `com.first.sample:/logout` for the first app.
    > **Note:** When you create the second app, enter `com.second.sample:/logout`.
1. Scroll to the **Client Credentials** section. Copy the Client IDs for both the first and second app for use in a later step.

Next, set up the mobile apps using the configuration from these native apps that you created.

## Set up the first mobile app

In this section, you configure settings for the first mobile app.

> Note: This section assumes that you have already downloaded the appropriate sample apps-see the sample links at the top of the article.

<StackSelector snippet="configfile" noSelector />

### Add the redirect scheme

To redirect back to your app from a web browser, specify a unique URI to your app.

<StackSelector snippet="addredirectscheme" noSelector />

## Create a second mobile app

You need a second mobile app to test with.

<StackSelector snippet="createsecondapp" noSelector />

## Optional settings

There are a few other settings that you can play with while testing shared SSO that involve the use of the `prompt` parameter. See [Parameter details](https://developer.okta.com/docs/reference/api/oidc/#parameter-details) for more information on using the `prompt` parameter.

### Always prompt the user regardless of session

If you’re using the same Okta domain for both of your apps, the default behavior when a session exists is that the user is silently authenticated without a sign-in prompt. If your second app requires a prompt for sign-in regardless of session, you can configure this by passing in the `prompt=login` parameter.

<StackSelector snippet="promptsignin" noSelector />

### Check for a valid session

You can also check if the browser has a valid session by using the `prompt=none` parameter. The `prompt=none` parameter guarantees that the user isn't prompted for credentials. Either the requested tokens are obtained or if the session is invalid or doesn't exist, the app receives an OAuth error response. See [Parameter details](https://developer.okta.com/docs/reference/api/oidc/#parameter-details) for more information on using the `prompt` parameter.

If your app requires that the user signs in to the first app first, then you can use the `prompt=none` parameter in the second app. This enables you to check whether the user is already signed in to the first app.

<StackSelector snippet="checkvalidsession" noSelector />

### Clear the session

To clear a session, add the following code to both of your apps:

<StackSelector snippet="clearsession" noSelector />

## Next steps

You should now have a better understanding of how a sign-in session is shared between two mobile apps on a device and the knowledge to configure your own apps.

To learn more about our Mobile OpenID Connect (OIDC) SDKs and sample apps:

Android:
- [Okta Mobile SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin).
- [Classic Engine Android Sign-In Kotlin Sample App](https://github.com/okta/samples-android/tree/legacy-samples/sign-in-kotlin).

iOS:
- [Okta Mobile SDK for Swift](https://github.com/okta/okta-mobile-swift).
- [Classic Engine iOS Browser Sign-In Sample App](https://github.com/okta/samples-ios/tree/legacy-samples/browser-sign-in).
