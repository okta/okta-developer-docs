--- 
title: Basic sign-in flow with password-only 
excerpt: Enable a password-only sign-in flow in your web app using the embedded SDK
layout: Guides
---

<ApiLifecycle access="ie" />

> **Note**: Passwords are a security vulnerability because they can be easily stolen and are prone to phishing attacks. Give your users the ability to use other authenticators by replacing password-only sign-in experiences with either a [password-optional](https://developer.okta.com/docs/guides/pwd-optional-overview) or a multifactor experience.
<StackSnippet snippet="pwdoptionalusecase" />

Enable a password-only sign-in flow in your web app using the embedded SDK.

---

#### Learning outcomes

Add a sign-in flow to a server-side web app that requires only a password.

#### What you need

<StackSnippet snippet="whatyouneed" />

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
