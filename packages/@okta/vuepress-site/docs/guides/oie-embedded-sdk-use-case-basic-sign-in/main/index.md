---
title: Basic sign-in flow using the password factor
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

This guide covers a basic user sign-in request, which is the simplest of all use cases and is the first use case that you should try after you install the SDK. The flow diagram and steps describe how to build a simple sign-in form and how to authenticate the credentials.

---

**Learning outcomes**

Understand how to implement basic sign-in using Okta Identity Engine.

**What you need**

* An app that uses the embedded Okta Identity Engine SDK
* [Okta org already configured for a password-only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

The basic user sign-in use case requires the password factor.

![Password factor only indicator](/img/oie-embedded-sdk/factor-password-only.png)

Before you build a basic sign-in flow, ensure that your org is configured for the password factor by completing the steps in [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />

</div>
