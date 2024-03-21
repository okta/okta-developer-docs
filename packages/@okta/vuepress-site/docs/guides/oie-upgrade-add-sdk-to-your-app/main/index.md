---
title: Add the Identity Engine SDK to your app
---

<ApiLifecycle access="ie" />

This guide explains how to add the Okta Identity Engine SDK to your app, which is the preceding step before upgrading your app's authentication use cases.

> **Note:** After your Okta org is upgraded to Identity Engine, your app should still work as expected with no change in functionality. If you want to take advantage of Identity Engine features, upgrade your app to use Identity Engine SDK methods and authentication flows.

<!-- TODO:  link "upgrading your app's authentication use cases" to the landing page for the mapping guides -->

<!-- Nutrition facts bullets -->

---

#### Learning outcomes

* Upgrade to the minimum SDK requirements.
* Add or upgrade to the Identity Engine SDK.

#### What you need

An [Identity Engine-upgraded Okta org](/docs/guides/oie-upgrade-overview/)

**Sample code**

n/a

---

## Overview

After your Okta org is upgraded to Identity Engine, your next step is to add the Identity Engine SDK to your app. This step includes upgrading your app to meet the minimum software requirements. With the exception of changes related to upgrading and adding the Identity Engine SDK, there should be no other changes to your source code. This step ensures that you have the right version of the new Identity Engine SDK and that your app still works the same as it did before the upgrade.

The recommended steps to add the SDK to your app:

1. [Upgrade your app to the minimum requirements](#upgrade-your-app-to-the-minimum-requirements)
1. [Add the SDK package to your app](#add-the-sdk-package-to-your-app)
1. [Test your app](#test-your-app)

## When to use this guide

Use this guide if you've completed the Okta Org upgrade to Identity Engine, your app's authentication flows use either the Authentication API or the Okta Classic Engine SDKs, and you're ready to upgrade those flows to use the Identity Engine SDK.

<StackSnippet snippet="sdksforauthflows" />

## Upgrade your app to the minimum requirements

Before you can add the SDK to your app, it must meet the following minimum requirements:

<StackSnippet snippet="minimumrequirements" />

## Add the SDK package to your app

<StackSnippet snippet="addsdk" />

## Test your app

After you add the SDK, test your app. The type of tests, which may include unit and integration tests, depend on your testing process and methodologies specific to your organization. You may also elect to deploy the app to a variety of environments during your testing. The goal is to ensure that the relatively simple addition of the Identity Engine SDK causes no changes to the app in regards to functionality, performance, or interoperability with other apps. Specifically, you may want to ensure that your previous calls to the Classic Engine SDKs are still working as expected.

To preview the Identity Engine SDK features and authentication flows, review the sample applications included in the SDK. For information on configuring and running the sample apps, see [Run the sample apps](/docs/guides/oie-embedded-common-run-samples/-/main/#run-the-embedded-sdk-sample-app) and the use cases.

## Next Steps

<StackSnippet snippet="langspecificmapguide" inline />
