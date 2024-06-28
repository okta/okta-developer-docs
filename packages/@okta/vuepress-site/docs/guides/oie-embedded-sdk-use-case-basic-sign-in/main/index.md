---
title: "Sign-in flow: password-only"
---

<ApiLifecycle access="ie" />

Enable a password-only sign-in flow in your web app using the embedded SDK.

> **Note**: Passwords are a security vulnerability because they can be easily stolen and are prone to phishing attacks. Give users robust options by replacing password-only authentication with either:
> * a multifactor experience, such as: [Sign-in flow: password and email](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/) or [Sign-in flow: password and phone](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-phone) 
> * a [password-optional experience](https://developer.okta.com/docs/guides/pwd-optional-overview) 
>
><StackSnippet snippet="pwdoptionalusecase" />

---

## Learning outcomes

Add a sign-in flow to a server-side web app where the only authentication requirement is a user password.

## What you need

<StackSnippet snippet="whatyouneed" />

## Sample code

<StackSnippet snippet="samplecode" />

---

## Configuration updates

Your app must be configured to support password as single factor authentication. For more information, see <StackSnippet snippet="configureyourapp" inline />.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
