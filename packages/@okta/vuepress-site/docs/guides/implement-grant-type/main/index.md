---
title: Implement authorization by grant type
excerpt: How to implement authorization flows by grant type with Okta
layout: Guides
---

<StackSnippet snippet="nutrition" />

<StackSnippet snippet="nut-facts-samplecode" />

---

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
