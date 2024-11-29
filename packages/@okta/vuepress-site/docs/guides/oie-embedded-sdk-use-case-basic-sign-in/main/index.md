---
title: Basic sign-in flow with the password factor
---

<ApiLifecycle access="ie" />

Enable a password-only sign-in flow in your web app using the embedded SDK.

> **Note**: Passwords present a security risk as they can be easily stolen and are vulnerable to phishing attacks. Enhance user security by offering alternative authentication methods, such as replacing password-only sign-ins with [password-optional](https://developer.okta.com/docs/guides/pwd-optional-overview) or multifactor authentication options.
<StackSnippet snippet="pwdoptionalusecase" />

---

#### Learning outcomes

Implement a sign-in flow for a server-side web app that only requires a password for authentication.

#### What you need

<StackSnippet snippet="whatyouneed" />
<br />

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Configuration updates

To configure your app to require only a password, see <StackSnippet snippet="configureyourapp" inline />.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
