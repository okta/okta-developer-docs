---
title: Custom authenticator integration guide
---

<ApiLifecycle access="ie" /><br>

This guide explains how to create a custom authenticator, using the Devices SDK to turn your mobile app into an authenticator.

---
**Learning outcomes**

* Create a custom authenticator.
* Use the Devices SDK to turn your mobile app into a push authenticator.

**What you need**

* An Okta developer app
* <StackSnippet snippet="notifservicelink" inline />
* <StackSnippet snippet="appreq" inline />

**Sample code**

* <StackSnippet snippet="samplecode" />

---

## About custom authentication and the Devices SDK

The Devices SDK allows you to embed push notifications and biometrics directly into your native mobile app. As a result, you can control the entire experience because users are prompted to continue the sign-in process on your mobile app. You aren’t limited to using only Okta Verify for push notifications. Also, using custom authentication helps drive downloads of your app.

## Get started

This guide walks you through the two main tasks needed to integrate with Okta Devices SDK:

**Create a custom authenticator**

1. [Create an OIDC web authentication client](#create-an-oidc-web-authentication-client): Set up OAuth for your app.
2. [Grant the required scopes](#grant-the-required-scopes): Grant the scopes you need to create a custom authenticator.
3. [Set up notification services](#set-up-notification-services): Set up <StackSnippet snippet="notifservicelong" inline /> with your Okta org.
4. [Add a custom authenticator](#add-a-custom-authenticator): Create and brand a custom authenticator.
5. [Set up a global session policy and authentication policy](#set-up-a-global-session-policy-and-authentication-policy): Control who can access Okta and how.

**Install and configure the Okta Devices SDK**

1. [Install the dependency](#install-the-dependency): Add the Okta Devices SDK dependency to your `build.gradle` file.
2. [Initialize the client](#initialize-the-client): Create the SDK object to work with your Okta authenticator configuration.
3. [Enroll the device](#enroll-the-device): Register a device and optional biometrics with an account for use with the custom authenticator.
4. [Respond to a challenge](#respond-to-a-challenge): Resolve a delivered challenge from the custom authenticator or retrieve an undelivered challenge. Refresh the FCM device registration token, remediate changed biometrics, and deregister the account on the device.

The following image shows what the Devices SDK enables for end users:

<div class="three-quarter">

![Custom authenticator flowchart](/img/authenticators/authenticators-custom-authenticator-flowchart.png)

</div>

## Create a custom authenticator

The following image shows the Devices SDK setup in the Admin Console:

<div class="three-quarter">

![Custom authenticator Admin Console](/img/authenticators/authenticators-custom-authenticator-admin-console.png)

</div>

### Create an OIDC web authentication client

The simplest way to integrate authentication in your app is with OIDC through a web browser, using the [Authorization Code flow grant type](/docs/guides/implement-grant-type/authcode/main/). You need an access token to start the enrollment flow for the Devices SDK. For future sign-in attempts, consider using refresh tokens. <StackSnippet snippet="samplecode" inline />

### Grant the required scopes

> **Note:** You must use an Org Authorization Server to grant the scopes needed to create a custom authenticator. Custom Authorization Servers (including the default Custom Authorization Server) don't work.

When you are ready to grant the required scopes, follow these steps:

1. Sign in to your Okta organization with your administrator account and go to **Applications** > **Applications**.
2. Open your OpenID Connect client app.
3. On the **Okta API Scopes** tab, click **Grant** for the following scopes:
   * For access to both GET and POST/DELETE endpoints:
      * `okta.authenticators.manage.self`
   * For access to GET endpoints only:
      * `okta.authenticators.read`
      * `okta.users.read.self`

Alternatively, you can grant scopes using the [Grant consent to scope for application](/docs/reference/api/apps/#application-oauth-2-0-scope-consent-grant-operations) operation of the Apps API.

### Set up notification services

<StackSnippet snippet="notifserviceadminconsole" />

### Add a custom authenticator

<StackSnippet snippet="customauthenticatoradminconsole" />

### Set up a global session policy and authentication policy

You need to set up a global session policy and an authentication policy to integrate with the Devices SDK. See [Configure a global session policy and authentication policy](/docs/guides/configure-signon-policy/main/).

## Install and configure the Okta Devices SDK

<StackSnippet snippet="sdksteps" />

## Limitations

### Custom authenticator error in Admin Console

#### Description

Use cases that meet the following conditions receive an error message in the Admin Console:

* Call the `api/v1/apps` endpoint to create an OIDC app with a custom `client_id`.
* Use the Admin Console to create a custom authenticator.

#### Workaround

Create both the OIDC client app (with a custom `client_id`) and the custom authenticator in the Admin Console.

Alternatively, you can call the `api/v1/apps` endpoint to create the OIDC app and `custom client_id`, and call the `api/v1/authenticators` endpoint to create a custom authenticator.

## Troubleshoot

If your push notifications aren't delivering:

1. Follow the steps to [view push notification events](https://help.okta.com/okta_help.htm?type=oie&id=ext-all-notification-services).
2. To narrow your search parameters, enter the following: `eventType eq "device.push.provider.update" and displayMessage eq "Push Provider Configuration verification failed"`. See [Event types](/docs/reference/api/event-types/).
3. In the **Reason** section, locate the error message from your push provider. Consult the push provider documentation, if necessary.
4. Verify that your notification services configuration is valid. See [Edit a notification service](https://help.okta.com/okta_help.htm?type=oie&id=ext-all-notification-services).
5. Click **Save** to allow push providers to attempt to send notifications again.
6. If your push notifications still aren't delivering, repeat steps 1-5.

## See also

[Overview of the mobile Identity Engine SDK](/docs/guides/mobile-idx-sdk-overview/android/main/)
