---
title: Custom authenticator integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

This guide explains how to create a custom authenticator, using the Devices SDK to turn your mobile app into an authenticator.

---
**Learning outcomes**

* Create a custom authenticator.
* Use the Devices SDK to turn your mobile app into a push authenticator.

**What you need**

* An Okta developer app
* <StackSnippet snippet="notifservicelink" />
* <StackSnippet snippet="appreq" />
* (Optional) The following Postman collections (see [Get started with Okta APIs](/code/rest/)):
   * Push Providers API Postman
   * Custom Authenticators API Postman

**Sample code**

* <StackSnippet snippet="samplecode" />

---

## About custom authentication and the Devices SDK

The Devices SDK allows you to embed push notifications and biometrics directly into your native mobile app. As a result, you can control the entire experience because users are prompted to continue the sign-in process on your mobile app. You aren’t limited to using only Okta Verify for push notifications. Also, using custom authentication helps drive downloads of your app.

## Get started

This guide walks you through the two main tasks needed to integrate with Okta Devices SDK:

### Create a custom authenticator

1. [Create an OIDC app integration](): Set up OAuth for your app.
2. [Grant the required scopes](): Grant the scopes you need to call the Custom Authenticator API.
3. [Set up notification services](): Use the Admin Console or Push Provider API to set up <StackSnippet snippet="notifservice" /> with your Okta org.
4. [Add a custom authenticator](): Use the Admin Console or Authenticators Administration API to create and brand a custom authenticator.
5. [Set up a global session policy and authentication policy](): Control who can access Okta and how.

### Install and configure the Okta Devices SDK

1. [Install the dependency]().
2. [Initialize the client](): Create the SDK object to work with your Okta authenticator configuration.
3. [Enroll the user](): 
4. [Respond to a challenge](): 
5. [Run your app](): 

<!-- DIAGRAM -->


