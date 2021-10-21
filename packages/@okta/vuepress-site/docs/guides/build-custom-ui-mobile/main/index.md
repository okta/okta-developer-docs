---
title: Build a custom sign-in UI in your mobile app
excerpt: Learn how to build a custom sign-in UI in your mobile app.
layout: Guides
---

You can connect your mobile app to Okta and sign users in by [opening a browser](/docs/guides/sign-into-mobile-app/before-you-begin/), however, if you prefer that your users not leave your app, you need to build a custom sign-in UI with native controls and screens instead. Use this guide to build a customized sign-in experience inside your mobile application.

> **Note:** If the browser sign-in method works for your application, we recommend using that since building a custom sign-in UI takes more effort and development time.

---

**Learning outcomes**

* Add the required packages to your application.
* Build a custom mobile sign-in UI.
* Handle the authentication responses appropriately.

**What you need**

* An Okta Developer organization. Don't have one? [Create one for free](https://developer.okta.com/signup)
* An app that you want to add a custom UI to
* Knowledge of how Okta mobile auth works (see [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/))

**Sample code**

* [Android example](https://github.com/okta/samples-android/tree/master/sign-in-kotlin)
* [iOS example](https://github.com/okta/samples-ios/tree/master/custom-sign-in/)
* [React Native example](https://github.com/okta/samples-js-react-native/tree/master/custom-sign-in)

---

## Create an Okta application

Before you can sign a user in, you need to create an Okta application that represents your mobile application.

Use the Okta application that you created when you walked through the [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/create-okta-application/) guide.

## Add and configure packages

Next, you need to add Okta to your application by installing and configuring our SDK.

You should already have added and configured packages when you walked through the [Sign users in to your mobile app](/docs/guides/sign-into-mobile-app/android/configure-packages/) guide.

Then, you need to install one additional package: the Okta Authentication SDK. This SDK works together with the OpenID Connect SDK that you already installed to make authentication requests to Okta from your own views.

<StackSelector snippet="installoktaauthsdk" />

## Build the primary authentication form

Okta's Authentication SDK is built around a [state machine](/docs/reference/api/authn/#transaction-state). To use this library, you should be familiar with the available states.

You can implement an authentication flow using one screen or using multiple screens. When you use multiple screens, you can spilt responsibilties across screens and then inject related data as a dependency.

For example, multiple screens could handle:

* login/password input
* multi-factor enrollment
* factor selection
* multi-factor verification

<StackSelector snippet="primaryauth" />

## Handle authentication responses

Every authentication transaction starts with primary authentication, which validates a user's password. Password Policy, MFA Policy, and Sign-On Policy are evaluated during primary authentication to determine if the user's password is expired, a factor should be enrolled, or additional verification is required. The [transaction state](/docs/api/resources/authn/#transaction-state) of the response depends on the user's status, group memberships, and assigned policies.

> **Note:** Custom sign-in works only with [Org MFA](/docs/guides/mfa/sms/set-up-org/). This means that, before you exchange the session token for an access token, you must make sure the application has disabled [App-Level MFA](https://help.okta.com/okta_help.htm?id=ext_MFA_App_Level).

<StackSelector snippet="handle-responses" />

## Next steps

You should now understand how to build a custom UI in your mobile application.

When a user signs in, their profile information (stored in Okta) is made available to your application. It's common to use this information to update your app's UI. See [Get info about the user](/docs/guides/sign-into-mobile-app/get-user-info/) for the steps.