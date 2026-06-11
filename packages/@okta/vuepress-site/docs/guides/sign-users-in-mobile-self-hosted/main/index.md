---
title: Sign in mobile users with a self-hosted page
excerpt: Learn how to sign users in to your mobile app using a self-hosted sign-in page with the Okta Client SDK.
layout: Guides
---

Add authentication to your mobile app using a self-hosted sign-in page with the Okta Client SDK.

---

#### Learning outcomes

* Configure your Okta org for password-based direct authentication.
* Set up a mobile project with the necessary Okta SDKs.
* Build a credential manager to handle authentication state.
* Create an interface for username/password sign-in flows.
* Implement token refresh and session management.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Familiarity with mobile app development concepts

---

## Overview

Building a streamlined authentication experience is essential for modern mobile apps. While multifactor authentication provides enhanced security, many apps start with a simpler approach, such as username and password authentication. With the Okta Client SDK, you can implement a fully native, password-based sign-in flow like direct authentication. This keeps users within your app while still using the Okta identity platform.

## Understand Okta direct authentication for password authentication

Direct authentication enables your mobile app to authenticate users directly through the Okta APIs without browser-based flows. This means that your app maintains complete control over the UI and user experience while Okta handles the security and token management behind the scenes.

For password-only authentication, the flow is straightforward:

1. The user enters credentials in your mobile UI.
1. Your app sends credentials to Okta using direct authentication.
1. Okta validates the credentials and returns OAuth 2.0 tokens.
1. Your app securely stores these tokens for API access.

This approach works well for internal apps, rapid prototyping, or scenarios where you want to add MFA capabilities later without restructuring your codebase.

## Security considerations

While this implementation provides a functional authentication system, keep these security points in mind:

* **Use only HTTPS**: Ensure that all API calls use secure connections. Okta enforces this by default.

* **Consider adding MFA**: Password-only authentication is less secure than password + MFA. Consider adding support for more authenticators as your app matures.

* **Handle token expiration**: Always implement token refresh logic to maintain sessions without requiring the user to repeatedly sign in.

* **Secure storage**: Never store passwords locally. The Okta Client SDK handles secure token storage automatically.

* **Error handling**: Provide clear error messages without exposing sensitive security details.

## How the components work together

<StackSnippet snippet="componentflow" />

## Configure your Okta org

Before diving into code, set up your Okta org to support direct authentication with password authentication.

### Set up a mobile app

1. Go to **Applications** > **Applications** in your Admin Console.
1. Click **Create App Integration** and select **OIDC - OpenID Connect** as the sign-in method.
1. Choose **Native Application** as the app type, and then click **Next**.
1. Give your app a name, and then configure the other app settings:
    * **Grant type**: Ensure that **Authorization Code** is selected.
    * **Sign-in redirect URIs**: `com.okta.{yourOktaDomain}:/callback`
    * **Sign-out redirect URIs**: `com.okta.{yourOktaDomain}:/`
    > **Note**: Replace `{yourOktaDomain}` with your actual Okta domain, such as, `dev-123456.okta.com`.
1. In the **Assignments** > **Controlled access** section, choose your preferred access control method.
1. Click **Save** and note the client ID. You need this later.

### Configure your authorization server

To enable password-based authentication, follow these steps:

1. Go to **Security** > **API**.
1. Select the authorization server that you want to use.
1. Click the **Access Policies** tab.
1. Create an access policy:
    * Click **Add Policy**.
    * Name the policy and give it a description.
    * Assign the policy to **All clients**.
    * Click **Create Policy**.
1. Add a rule to your policy:
    * Click **Add rule**.
    * Name the policy rule.
    * In the **IF Grant type is** section, click **Advanced** and select **Resource Owner Password**.
    * Leave the **Any user assigned the app** default for **AND User is**.
    * Leave the **Any scopes** default for **AND Scopes requested**.
    * Click **Create rule**.
1. Go to **Applications** > **Applications** and select the app that you created.
1. Select the **Sign On** tab (or **Authentication**, depending on your org configuration) and scroll down to the **User authentication** section.
1. For this example, select **Password only**.

> **Caution:** You need to enable the Resource Owner Password grant type for use with the direct authentication password flows.

## Set up your project

Now that you've configured your Okta org, create the mobile app.

### Create a project

<StackSnippet snippet="createproject" />

### Add Okta SDK dependencies

<StackSnippet snippet="adddependencies" />

### Create the configuration file

<StackSnippet snippet="configfile" />

## Build the authentication service

With setup complete, implement the core authentication logic and create a service layer that handles all interactions with the Okta direct authentication APIs.

<StackSnippet snippet="authservice" />

## Understand session persistence

<StackSnippet snippet="sessionmanagement" />

## The full authentication service code

<StackSnippet snippet="fullauthservice" />

## Build the user interface

With the service layer complete, create the user interface.

<StackSnippet snippet="buildui" />

## Test your implementation

<StackSnippet snippet="testapp" />

## Handle common issues

<StackSnippet snippet="handleissues" />

## Beyond username and password

You've built a complete, mobile authentication system using Okta direct authentication with username and password. Your app now handles credential validation, secure token storage, session management, and token refresh all without leaving your mobile UI.

This foundation makes it easy to add more sophisticated authentication features later like biometric verification or passwordless, while maintaining the same clean architecture.

The Okta Client SDK provides a secure and user-friendly authentication experience that can scale with your app's needs.
