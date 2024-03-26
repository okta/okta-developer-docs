---
title: Unlock a mobile app with biometrics
excerpt: Learn how to integrate biometric authentication like Face ID and Touch ID to your mobile apps that use Okta.
layout: Guides
---

<ClassicDocOieVersionNotAvailable />

In this guide you will learn how to integrate biometric authentication like Face ID and Touch ID to your mobile apps that use Okta.

---

#### Learning outcomes

* Handle biometric challenges for your users, storing and retrieving tokens as required
* Delete access tokens when no longer required

#### What you need

An app to update with biometric unlock with Touch ID, Face ID, and Smart Lock. See [Sign users into your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/) guide.

**Sample code**

<StackSelector snippet="samplecode" noSelector/>

---

## Overview

When you [configure the Okta SDK](/docs/guides/sign-into-mobile-app/-/main/#add-packages) with the `offline_access` scope, your mobile app gets a refresh token from Okta. The refresh token is long-lived and is used to keep the user signed in to your app.

The refresh token is used to get new access tokens. Access tokens allow your mobile app to make authenticated requests to your API, but are short-lived. As access tokens expire, the refresh token is used to obtain new access tokens.

By storing the refresh token on the device and encrypting it with a biometric challenge, you can safely keep the user signed in, but require the user to pass a biometric challenge to keep using the app. This means that the user must sign in with their password the first time, but can then use their fingerprint or face to unlock the app after that.

## Add and configure packages

You need to add the Okta SDK to your application.

<StackSelector snippet="installsdk" noSelector/>

## Store tokens

When the user finishes signing in and you receive tokens from Okta, store the refresh token with a biometric requirement.

<StackSelector snippet="storerefreshtoken" noSelector/>

## Discard access tokens

When you need to delete the access token from secure storage (for example, when an access token expires or a user wants to delete their account), do the following:  

<StackSelector snippet="discardaccesstoken" noSelector/>

## Retrieve refresh token

To get a new refresh token, present a biometric challenge to the user.

<StackSelector snippet="challenge" noSelector/>

Then, use the refresh token to get a new access token.

<StackSelector snippet="getnewaccesstoken" noSelector/>