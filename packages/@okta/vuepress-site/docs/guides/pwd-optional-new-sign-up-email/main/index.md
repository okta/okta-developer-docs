---
title: Sign up for new account with email only
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

Learn how to enable an email-only sign-up in your application using the Embedded SDK.

**Learning outcomes**

* Configure your Okta org to enable user sign-up without a password.
* Integrate email-only sign-up support into your application with the Embedded SDK.

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

## Update configurations

Before you can start integrating password-optional sign-ups in your app, <StackSnippet snippet="setupoktaorg" inline/>. Additionally, you must enable new user sign-ups with the following steps:

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
1. Locate the **Default Policy** and select the pencil icon.
1. Locate the **Enrollment Settings** of the default policy and select **Actions > Edit**.
1. Under **For new users**, set **Sign-up** to **Allowed**.
1. Click **Save**.

## Integrate

### Summary of steps

The following summarizes the steps involved in the password-optional sign-up.

<StackSnippet snippet="integrationsummary" />

<StackSnippet snippet="integrationsteps" />

</div>
