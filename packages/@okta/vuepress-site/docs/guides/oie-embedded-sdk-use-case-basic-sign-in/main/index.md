---
title: Basic sign-in flow with the password factor
excerpt: Learn how to enable a password-only sign-in flow in your app using the embedded SDK.
layout: Guides
---

<ApiLifecycle access="ie" />

Enable a password-only sign-in flow in your web app using the embedded SDK.

> **Note**: Passwords present security vulnerabilities as they're prone to theft and phishing attacks. Give your users the ability to use other authenticators by replacing password-only sign-in experiences with a [password-optional](/docs/guides/pwd-optional-overview/aspnet/main/) or a multifactor experience.
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

To configure your app so that it requires only a password, refer to <StackSnippet snippet="configureyourapp" inline />.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
