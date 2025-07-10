---
title: Basic sign-in flow with the password factor
---

<ApiLifecycle access="ie" />

Enable a password-only sign-in flow in your web app using the embedded SDK.

> **Note:** Passwords are vulnerable to theft and phishing. Allow users to choose other authenticators by replacing password-only sign-in experiences with either a [password-optional](/docs/guides/pwd-optional-overview) or a [multifactor experience](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email). <StackSnippet snippet="pwdoptionalusecase" />

---

#### Learning outcomes

Add a password-only sign-in flow to a server-side web app.

#### What you need

<StackSnippet snippet="whatyouneed" />

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Configuration updates

To configure your app so that it requires only a password, see <StackSnippet snippet="configureyourapp" inline />.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
