---
title: Sign up for new account with email only
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

Learn how to use the Embedded SDK to integrate password optional sign up in your app.

**Learning outcomes**

* Configure your org to allow users the option to sign up without a password
* Enable your app to support password optional sign ups

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

## Update configurations

Before you can start integrating password optional sign ups in your app, [set up your Okta org for a password optional use case](/docs/guides/oie-embedded-common-org-setup/android/main/#set-up-your-okta-org-for-a-password-optional-use-case). Additionally, you must enable new user sign ups with the following steps:

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
1. Locate the **Default Policy** and select the pencil icon.
1. Under **Enrollment Settings**, select **Actions > Edit**.
1. Under **For new users**, select **Allowed** for **Sign-up**.
1. Click **Save**.

## Integrate

<StackSnippet snippet="integrationsummary" />

<StackSnippet snippet="integrationsteps" />

</div>
