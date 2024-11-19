---
title: Basic sign-in flow with the password factor
---

<ApiLifecycle access="ie" />

This content discusses how to use the embedded SDK to enable password-only sign-in on your web-app. 

> **Note**: Passwords are easily stolen and prone to phishing attacks. We recommend resolving this security vulnerability by giving your users the ability to use other authenticators by replacing password-only sign-in experiences with a [password-optional](https://developer.okta.com/docs/guides/pwd-optional-overview) or a multifactor experience.
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

To configure your app so it requires only a password, see <StackSnippet snippet="configureyourapp" inline />.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
