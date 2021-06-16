---
title: Implement Authorization by grant type
excerpt: How to implement Authorization flows by grant type with Okta
layout: Guides
---

This document guides you through implementing OAuth 2.0 authorization flow for your application (app) by grant types with Okta.

Select the authorization grant-type flow to implement: <StackSelector />

## Overview

<StackSnippet snippet="overview" />

## Grant-type flow

<StackSnippet snippet="flow-diagram"/>

## Set up your app

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

<StackSelector snippet="setup-app" />

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **<StackSnippet snippet="sign-in-method" inline />** as the **Sign-in method**.
1. Select <StackSnippet snippet="application-type" inline /> as the **Application type**, then click **Next**.

    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have and would break the sign-in or sign-out flow.

1. Specify the app integration name.
1. Select <StackSnippet snippet="grant-name" inline /> as the **Grant type**.
1. Fill in the remaining details for your app integration, then click **Save**.

Save the Okta Client ID (`client_id`) value generated from the created app integration to implement your authorization flow.

## Install an Okta SDK

Okta provides an array of language and framework SDKs to quickly implement authorization with Okta. See [Languages & SDKs overivew](/code/) for a list of SDKs you can download to start using with your app.

<StackSnippet snippet="install-sdk" />

<!-- "Redirect to Auth Server" , "Flow usage" , "Exchange authorization code for token", "Scopes", "Get access token" grant-specific content -->

## Implement flow

<StackSnippet snippet="use-flow" />

<!-- ### Exchange authorization code for token -->

<!-- ### Get access token -->

## Examples

<StackSnippet snippet="examples" />

## Next steps

Now that you have implemented Authorization in your app, you can add features such as

* [Self-service enrollment](/docs/guides/set-up-self-service-registration/)
* MFA
* Brand customization ([custom domain](/docs/guides/custom-url-domain/), [custom SMS messages](/docs/guides/sms-customization/), [custom emails](/docs/guides/email-customization/))
* Authentication recovery
* Progressive profiling

> **Note:** If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).