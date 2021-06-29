---
title: Implement Authorization by grant type
excerpt: How to implement Authorization flows by grant type with Okta
layout: Guides
---

This document guides you through implementing OAuth 2.0 authorization flow for your application by grant types with Okta.

Select the authorization grant-type flow to implement: <StackSelector />

## Overview

<StackSnippet snippet="overview" />

## Grant-type flow

<StackSnippet snippet="flow-diagram"/>

## Set up your app

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **<StackSnippet snippet="sign-in-method" inline />** as the **Sign-in method**.

<StackSnippet snippet="setup-app" />

## Install an Okta SDK

Okta provides an array of language and framework SDKs to quickly implement authorization with Okta. See [Languages & SDKs overivew](/code/) for a list of SDKs you can download to start using with your app.

<StackSnippet snippet="install-sdk" />

<!-- "Redirect to Auth Server" , "Flow usage" , "Exchange authorization code for token", "Scopes", "Get access token" grant-specific content -->

## Implement flow

<StackSnippet snippet="use-flow" />

<!-- ### Exchange authorization code for token -->

<!-- ### Get access token -->

<StackSnippet snippet="examples" />

## Next steps

<StackSnippet snippet="nextsteps" />

<br>

> **Note:** If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).