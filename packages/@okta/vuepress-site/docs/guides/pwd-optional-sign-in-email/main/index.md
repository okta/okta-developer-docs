---
title: Sign in with email only
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

Enable users to sign in with email only in an application based on an embedded SDK.

**Learning outcomes**

* Configure your Okta org to enable user sign-in without a password.
* Integrate a password-optional sign-in flow into an application based on an embedded SDK.

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Update configurations

<StackSnippet snippet="setupoktaorg" inline/>

> **Note:** To test the sign-in integration, you must use a user with an enrolled email authenticator.

## Integrate

### Summary of steps

The following summarizes the steps involved in the password-optional sign-in flow.

<StackSnippet snippet="integrationsummary" />

<StackSnippet snippet="integrationsteps" />

</div>
