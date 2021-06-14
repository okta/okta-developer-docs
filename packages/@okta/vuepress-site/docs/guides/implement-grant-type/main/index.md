---
title: Implement Authorization by grant type
excerpt: How to implement Authorization flows by grant type with Okta
layout: Guides
---

This document guides you through implementing OAuth 2.0 authorization flow for your app by grant types with Okta.

Select the authorization grant-type flow to implement: <StackSelector />

### Overview

<StackSnippet snippet="overview" />

### Grant-type flow

<StackSnippet snippet="flow-diagram"/>

### Flow usage

<StackSnippet snippet="use-flow" />

### Set up your app

<StackSnippet snippet="setup-app" />

- Stack selector for App Wizard settings

| Parameter | Description        |
| --------- | ----------- |
| Sign-on method  | xxx |
| App type  | xxx |
| Grant type | xxx |
| Sign-in redirect URIs | xxx |


### Install an Okta SDK

- stack selector for which SDK you can use for the grant type
- this could be links to other actions from the Sign-in guides

### Redirect to Auth Server for code

- stack selector for info on how to implement redirect to auth server for code
- this could be links to other actions from the Sign-in guides

### Exchange authorization code for token

- stack selector for info on how to implement redirect to auth server for token, if required
- this could be links to the Sign-in guides

### Scopes

- stack selector for scope instructions, if required

### Get access token

- stack selector for get access token instructions, if required

### Next steps

Now that you have implemented Authorization in your app, you can add features such as

* Self-service enrollment
* MFA
* Authentication recovery
* Progressive profiling

> **Note:** If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).