---
title: Build a custom sign-in UI in your mobile app
excerpt: Learn how to build a custom sign-in UI in your mobile app.
layout: Guides
---

<ClassicDocOieVersionNotAvailable />

You can connect your mobile app to Okta and sign users in by [opening a browser](/docs/guides/sign-into-mobile-app-redirect/). However, if you prefer that users not leave your app, build a custom sign-in UI with platform-specific controls and screens instead.

Use this guide to build a customized sign-in experience inside your mobile app.

<EmbeddedBrowserWarning />

> **Note:** If the browser sign-in method works for your app, Okta recommends using that because building a custom sign-in UI takes more effort and development time.

---

#### Learning outcome

Customize the sign-in experience with a mobile sign-in UI.

#### What you need

* An Okta Integrator Free Plan org. Don't have one? [Create one for free](https://developer.okta.com/signup).
* A mobile app with Okta authentication that you want to add a custom sign-in UI to. See [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/).

#### Sample code

<StackSelector snippet="samplecode" noSelector/>

---

## Create an Okta app

Before you can sign a user in, you need to create an Okta app that represents your mobile app.

Use the Okta app that you created when you walked through the [Sign users into your mobile app using the redirect model](/docs/guides/sign-into-mobile-app/-/main/#create-an-okta-integration-for-your-app) guide.

## Add and configure packages

To build the custom sign-in UI, you need to install and configure a platform-specific Okta SDK to your app.

You should already have added and configured packages when you walked through the [Sign users into your mobile app using the redirect model](/docs/guides/sign-into-mobile-app/-/main/#add-packages) guide.

In addition, you need to install the platform-specific Okta Authentication SDK. This SDK works together with the OpenID Connect SDK that you have already installed to make authentication requests to Okta.

<StackSelector snippet="installoktaauthsdk" noSelector/>

## Build the primary authentication form

The Okta Authentication SDK is built around a [state machine](/docs/reference/api/authn/#transaction-state). Review the available states before you use this library.

You can implement an authentication flow using one screen or using multiple screens. When you use multiple screens, you can split responsibilities across screens and then inject related data as a dependency.

For example, multiple screens could handle:

* Sign-in/password input
* Multifactor enrollment
* Factor selection
* Multifactor verification

<StackSelector snippet="primaryauth" noSelector/>

## Handle authentication responses

Every authentication transaction starts with primary authentication, which validates a user's password. The password policy, MFA policy, and sign-on policy are evaluated during primary authentication. The policies are evaluated to determine if the user's password is expired, a factor should be enrolled, or additional verification is required. The [transaction state](/docs/api/resources/authn/#transaction-state) of the response depends on the user's status, group memberships, and assigned policies.

> **Note:** Custom sign-in only works with [Org MFA](/docs/guides/mfa/sms/main/#set-up-your-org-for-mfa). This means that before you exchange the session token for an access token, you must ensure that [App-Level MFA](https://help.okta.com/okta_help.htm?id=ext_MFA_App_Level) is disabled for the application.

> **Note:** In Identity Engine, the MFA Enrollment Policy name has changed to [authenticator enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy).

<StackSelector snippet="handle-responses" noSelector/>

## Next steps

When a user signs in, their profile information (stored in Okta) is made available to your application. Use this information to personalize your app's UI for the user. See [Get info about the user](/docs/guides/sign-into-mobile-app-redirect/-/main/#get-info-about-the-user) for details.
