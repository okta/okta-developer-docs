---
title: Basic sign-in flow with the password factor
excerpt: Learn how to implement a password-only sign-in flow in a server-side web app using the Okta Identity Engine SDK.
layout: Guides
---

<ApiLifecycle access="ie" />

This guide explains how to implement a password-only sign-in flow in a server-side web application using the embedded Okta Identity Engine SDK. You can set up a sign-in page, authenticate user credentials, handle authentication responses, and retrieve user information after successful authentication.

> **Note**: Passwords are vulnerable to theft and phishing attacks. Enable users to utilize alternative authenticators by replacing password-only experiences with either a [password-optional approach](/docs/guides/pwd-optional-overview) such as [Sign in with email only](docs/guides/pwd-optional-sign-in-email) or a multifactor approach to enhance security.

<StackSnippet snippet="pwdoptionalusecase" />

---

#### Learning outcomes

* Configure your Okta org to support a password-only authentication experience.
* Integrate a password-only sign-in flow into a server-side web app.

#### What you need

* An app that uses the embedded [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js)
* Download and set up [Okta Identity Engine SDK](/docs/guides/oie-embedded-common-download-setup-app)

<StackSnippet snippet="whatyouneed" />
<br />

#### Sample code
[Node.js Okta Identity Engine sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-auth-with-sdk)
<StackSnippet snippet="samplecode" />

---

## Configuration updates

Before you begin, ensure your app is configured to support password as authentication. For information on configuring your app for a password-only experience, see [Set up your Okta org for a password factor-only use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
<StackSnippet snippet="configureyourapp" inline />

## Summary of steps
The following diagram summarizes the steps involved in a password-only sign-in flow.

<StackSnippet snippet="summaryofsteps" />

## Integration steps
### 1. Build a sign-in page for the user
Build and display a sign-in page to capture username and password.
### 2. Authenticate the user credentials
When the user submits the username and password, pass them as parameters to [`idx. authenticate`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate).
### 3. Handle the response from the sign-in flow
Call `authenticate.transaction()` to retrieve the current state of the authentication process. The return `IdxStatus` value indicates either a successful or an unsuccessful authentication.
#### Success status
If the authentication is successful, the `IdxStatus` value indicates `IdxStatus.SUCCESS`. Call `tokenManager.setTokens()` to save the tokens retrieved from the response for future requests. Redirect the user to the home page to complete the sign-in flow. The user is now signed in.
#### Other authentication statuses
If the `IdxStatus` value indicates anything other than `IdxStatus.SUCCESS`, it signifies that the user failed authenticate successfully. Analyze the IdxStatus value to identify and resolve the cause.

<StackSnippet snippet="integrationsteps" />

### 4. Get the user profile information
> **Note**: This step is optional.

After successful user authentication, call `/v1/userinfo` to retrieve the basic user information from the authorization server using the tokens retrieved in the previous step.
<StackSnippet snippet="getuserprofile" />
