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
   * [Push Providers API Postman](https://app.getpostman.com/run-collection/83575c0b5b075783862c)
   * [Custom Authenticators API Postman](https://app.getpostman.com/run-collection/836eb57018cba45da121)

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
3. [Set up notification services](): Use the Admin Console or Push Provider API to set up <StackSnippet snippet="notifservicelong" /> with your Okta org.
4. [Add a custom authenticator](): Use the Admin Console or Authenticators Administration API to create and brand a custom authenticator.
5. [Set up a global session policy and authentication policy](): Control who can access Okta and how.

### Install and configure the Okta Devices SDK

1. [Install the dependency]().
2. [Initialize the client](): Create the SDK object to work with your Okta authenticator configuration.
3. [Enroll the user](): 
4. [Respond to a challenge](): 
5. [Run your app](): 

<!-- Flow-type DIAGRAM -->

## Create a custom authenticator

<!-- Console flow DIAGRAM -->

### Create an OIDC web authentication client

The simplest way to integrate authentication in your app is with OIDC through a web browser, using the Authorization Code Flow grant. You need an access token to start the enrollment flow for the Devices SDK. For future logins, consider using refresh tokens. <StackSnippet snippet="samplecode" />

### Grant the required scopes

> **Note:** If you have a custom Authorization Server, the scopes associated with the Custom Authenticator API are granted by default. See [Create an Authorization Server](/docs/guides/customize-authz-server/-/main/).

When you are ready to grant the required scopes, follow these steps:

1. Sign in to your Okta organization with your administrator account and go to Applications > Applications.
2. Open your OpenID Connect client app.
3. On the Okta API Scopes tab, click Grant for the following scopes:
   * For access to both GET and POST/DELETE endpoints:
      * `okta.authenticators.manage.self`
   * For access to GET endpoints only:
      * `okta.authenticators.read`
      * `okta.users.read.self`

Alternatively, you can grant scopes using the [Grant consent to scope for application](/docs/reference/api/apps/#application-oauth-2-0-scope-consent-grant-operations) operation of the Apps API.

### Set up notification services

You can set up notification services in your org using the Push Providers API or the Admin Console.

#### Use the Admin Console

<StackSnippet snippet="notifserviceadminconsole" />

#### Use the Push Providers API

<StackSnippet snippet="notifservicepushapi" />

### Add a custom authenticator

The Custom Authenticator allows you to add custom push verification functionality to your mobile apps. Rather than using Okta Verify for push, you can use your own branded app, and embed the Custom Authenticator into it, to perform user verification in your app.

You can create and brand a custom authenticator in your org using the Authenticators Administration API or the Admin console.

#### Use the Admin Console

<StackSnippet snippet="customauthenticatoradminconsole" />

#### Use the Custom Authenticator API

<StackSnippet snippet="customauthenticatorcustomapi" />

### Set up a global session policy and authentication policy

You need to set up a Global Session Policy and an authentication policy to integrate with the Devices SDK. See [Configure a Global Session Policy and authentication policy](/docs/guides/configure-signon-policy/main/).

## Install and configure the Okta Devices SDK

<StackSnippet snippet="sdksteps" />

## Limitations

### Custom authenticator error in Admin Console

#### Description

Use cases that meet the following conditions receive an error message in the Admin Console UI:

* Call the `api/va/apps` endpoint to create an OIDC app with a custom `client_id`.
* Use the Admin Console to create a custom authenticator.

#### Workaround

Create both the OIDC client app (with a custom `client_id`) and the custom authenticator in the Admin Console.

Alternatively, you can call the `api/v1/apps` endpoint to create the OIDC app and `custom client_id`, and call the `api/v1/authenticators` endpoint to create a custom authenticator.

## See also

[Overview of the mobile Identity Engine SDK](/docs/guides/mobile-idx-sdk-overview/android/main/)
