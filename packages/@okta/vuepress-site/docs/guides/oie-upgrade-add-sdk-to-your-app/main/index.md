---
title: Add the Identity Engine SDK to your app
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

This article explains how to add the Identity Engine SDK to your app, which is the preceding step before upgrading your app's authentication use cases.

<!-- Nutrition facts bullets -->

---

**Learning outcomes**

* Upgrade to the minimum SDK requirements
* Add or upgrade to the Identity Engine SDK

**What you need**

* An Identity Engine upgraded Okta org <!-- Update this section later with links to the upgrade org guides -->

**Sample code**

N/A

---

## Overview

After your Okta org is upgraded to the Identity Engine, your next step is to add the Identity Engine SDK to your app. This step includes upgrading your app to meet the minimum software requirements. With the exception of changes related to upgrading and adding the Identity Engine SDK, there should be no other changes to your source code. This step is to ensure that you have the right version of the new Identity Engine SDK and that your app retains the Okta Classic Engine user experience.

The recommended steps to add the SDK to your app:

1. [Upgrade your app to the minimum requirements](#upgrade-your-app-to-the-minimum-requirements)
1. [Add the SDK package to your app](#add-the-sdk-package-to-your-app)
1. [Test your app](#test-your-app)

## When to use this guide

Use this guide if you've completed the Okta Org upgrade to the Identity Engine, your app's authentication flows use either the Okta authN APIs directly or the Okta classic authN SDKs, and you're ready to upgrade those flows to use the Identity Engine IDX SDK.

<StackSnippet snippet="sdksforauthflows" />

## Upgrade your app to the minimum requirements

Before you can add the SDK to your app, it must meet the following minimum requirements:

<StackSnippet snippet="minimumrequirements" />

## Add the SDK package to your app

After you upgrade your app to the minimum requirements, the next step is to either add the Identity Engine SDK to your app or upgrade your existing SDK to the Identity Engine version.

<StackSnippet snippet="addsdk" />

## Test your app

After you add the SDK, test your app. The type of tests, which may include unit and integration tests, depend on your testing process and methodologies specific to your organization. You may also elect to deploy the app to a variety of environments during your testing.   The goal is to ensure that the relatively simple addition of the Identity Engine SDK causes no changes to the app in regards to functionality, performance, or interoperability with other app. Specifically, you may want to test to ensure your previous calls to the authN SDK are still working as expected.

## Next Steps

After you’ve completed adding the SDK to your app, the next step is to upgrade your authentication use cases to the Identity Engine SDK. See <StackSnippet snippet="langspecificmapguide" inline /> to learn about how to map your existing implementations to the Identity Engine SDK.

<!-- The above link will be updated with the correct mapping guide URL-->
