---
title: Build a custom sign-in UI in your mobile app
excerpt: Learn how to build a custom sign-in UI in your mobile app.
layout: Guides
---

You can connect your mobile app to Okta and sign users in by [opening a browser](/docs/guides/sign-into-mobile-app/), however, if you prefer that your users not leave your app, you need to build a custom sign-in UI with native controls and screens instead. Use this guide to build a customized sign-in experience inside your mobile application.

<EmbeddedBrowserWarning />

> **Note:** If the browser sign-in method works for your application, we recommend using that since building a custom sign-in UI takes more effort and development time.

---

**Learning outcomes**

Build a custom mobile sign-in UI.

**What you need**

* An Okta Developer organization. Don't have one? [Create one for free](https://developer.okta.com/signup)
* A mobile app with Okta authentication (see [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/)) that you want to add a custom sign-in UI to

**Sample code**

<StackSelector snippet="samplecode" noSelector/>

---

## Create an Okta application

Before you can sign a user in, you need to create an Okta application that represents your mobile application.

Use the Okta application that you created when you walked through the [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/-/main/#create-an-okta-app-integration) guide.

## Add and configure packages

To build the custom sign-in UI, you need to install and configure a native Okta SDK to your application.

You should already have added and configured packages when you walked through the [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/-/main/#add-and-configure-packages) guide.

In addition, you need to install the native Okta Authentication SDK. This SDK works together with the OpenID Connect SDK that you already installed to make authentication requests to Okta.

<StackSelector snippet="installoktaauthsdk" noSelector/>

## Build the primary authentication form

Okta's Authentication SDK is built around a [state machine](/docs/reference/api/authn/#transaction-state). Review the available states before you use this library.

You can implement an authentication flow using one screen or using multiple screens. When you use multiple screens, you can spilt responsibilties across screens and then inject related data as a dependency.

For example, multiple screens could handle:

* login/password input
* multifactor enrollment
* factor selection
* multifactor verification

<StackSelector snippet="primaryauth" noSelector/>

## Handle authentication responses

Every authentication transaction starts with primary authentication, which validates a user's password. Password Policy, MFA Policy, and Sign-On Policy are evaluated during primary authentication to determine if the user's password is expired, a factor should be enrolled, or additional verification is required. The [transaction state](/docs/api/resources/authn/#transaction-state) of the response depends on the user's status, group memberships, and assigned policies.

> **Note:** Custom sign-in only works with [Org MFA](/docs/guides/mfa/sms/main/#set-up-your-org-for-mfa). This means that before you exchange the session token for an access token, you must ensure that [App-Level MFA](https://help.okta.com/okta_help.htm?id=ext_MFA_App_Level) is disabled for the application.

<StackSelector snippet="handle-responses" noSelector/>

## Next steps

You should now understand how to build a custom UI in your mobile application.

When a user signs in, their profile information (stored in Okta) is made available to your application. Use this information to personalize your app's UI for the user. See [Get info about the user](/docs/guides/sign-into-mobile-app/-/main/#get-info-about-the-user) for details.