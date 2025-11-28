---
title: Manage credentials using the Okta Client SDK
meta:
  - name: description
    content: Learn about how to securely manage user credentials using the Okta Client SDK.
---

<StackSnippet snippet="intro" />

---

#### Learning outcomes

* Store credentials.
* Retrieve and work with credentials, including the default credentials.
* Refresh user tokens.
* Remove credentials.

#### What you need

<StackSnippet snippet="what-you-need" />

---

## About credential management using the Okta Client SDK

The primary goal of using authentication APIs is to receive credentials that allow your users to interact with your app. If you don’t have some way to save and retrieve those credentials for later use, your users need to sign into your app every time.

After the user (or other identity) is authenticated within an app, you must manage the token's lifecycle:

* Store it in a secure manner
* Retrieve the correct credential for the user from storage
* Use it to perform requests on behalf of the user
* Ensure that it's correctly refreshed as required
* Remove it after reaching expiration or a direct deletion request

The Okta Client SDK provides a robust token management system that's designed to handle complex scenarios, such as multi-threaded access and data race conditions. This allows you to focus on your app's features rather than building a complex token management system from scratch.

### Core components of the token management system

<StackSnippet snippet="core-components" />

## Store credentials

<StackSnippet snippet="store-credentials" />

## Manage the default credentials

<StackSnippet snippet="default-credentials" />

## Manage multiple credentials

<StackSnippet snippet="multiple-credentials" />

## Refresh user tokens

<StackSnippet snippet="token-refresh" />

## Implement token cleanup

<StackSnippet snippet="token-cleanup" />

## Best practices

<StackSnippet snippet="best-practices" />
