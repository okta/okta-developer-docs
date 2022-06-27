---
title: Sign in with email only
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

Learn how to use the Embedded SDK to integrate password-optional sign-in in your app.

**Learning outcomes**

* Configure your Okta org to allow your users the option to sign in without a password
* Enable your app to support password-optional sign-ins

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

## Update configurations

Before you can start integrating password-optional sign-ins in your app, <StackSnippet snippet="setupoktaorg" inline/>. Additionally, for this use case, you must have created a user with an email authenticator as described in the <StackSnippet snippet="signupfornewaccount" inline/> guide.

## Integrate

### Summary of steps

The following summarizes the steps involved in the password-optional sign-in.

<StackSnippet snippet="integrationsummary" />

<StackSnippet snippet="integrationsteps" />

</div>
