---
title: Basic sign-in flow with the password factor
---

<ApiLifecycle access="ie" />

Enable a password-only sign-in flow in your web app using the Okta Identity Engine embedded SDK.

> **Note**: Passwords are a security vulnerability because they can be easily stolen and are prone to phishing attacks. Consider replacing password-only sign-in experiences with either [password-optional](https://developer.okta.com/docs/guides/pwd-optional-overview) or multifactor authentication.
<StackSnippet snippet="pwdoptionalusecase" />

---

#### Learning outcomes

Add a password-only sign-in flow to a server-side web app.

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
