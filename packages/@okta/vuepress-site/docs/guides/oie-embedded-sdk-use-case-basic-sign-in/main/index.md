---
title: Basic sign-in flow with the password factor
---

<ApiLifecycle access="ie" />

Enable a password-only sign-in flow in your web app using the embedded SDK.

> **Note**: Passwords are a security vulnerability because they can be easily stolen and are prone to phishing attacks. You can enhance the security by replacing password-only sign-in experiences with either a [password optional](https://developer.okta.com/docs/guides/pwd-optional-overview) or a multifactor experience.
<StackSnippet snippet="pwdoptionalusecase" />

---

#### Learning outcomes

Add a sign-in flow to a server-side web app that requires only a password.

#### What you need

<StackSnippet snippet="whatyouneed" />
<br />

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Configuration updates

For instructions on configuring your app to use only a password, see <StackSnippet snippet="configureyourapp" inline />.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
