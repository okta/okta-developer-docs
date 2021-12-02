---
title: Implement authorization by grant type
excerpt: How to implement authorization flows by grant type with Okta
layout: Guides
---

> **Note**: [Okta’s Developer Edition](/signup/) makes most key developer features available by default for testing purposes. Please note that [API Access Management](/docs/concepts/api-access-management/) — a requirement for Custom Authorization Servers — is an optional add-on in production.

## Overview

This document guides you through implementing an OAuth 2.0 authorization flow for your application by grant type with Okta.

Select the authorization grant-type flow to implement: <StackSelector />

<StackSnippet snippet="overview" />

## Grant-type flow

<StackSnippet snippet="flow-diagram"/>

<StackSnippet snippet="configuration"/>

## Set up your app

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

1. In the Admin Console, go to **Applications** > **Applications**.
2. Click **Create App Integration**.
3. Select **<StackSnippet snippet="sign-in-method" inline />** as the **Sign-in method**.

<StackSnippet snippet="setup-app" />

<StackSnippet snippet="install-sdk" />

## Flow specifics

<StackSnippet snippet="use-flow" />

<StackSnippet snippet="examples" />

## Next steps

<StackSnippet snippet="nextsteps" />

<br>

> **Note:** If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).
