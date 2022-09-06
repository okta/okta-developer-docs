---
title: Sign in with email only
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

Enable an email-only sign-in flow in your application using the Embedded SDK.

**Learning outcomes**

* Configure your Okta org to enable user sign-in flows without a password.
* Integrate email only sign-in flow support into your application with the Embedded SDK.

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
