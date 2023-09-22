---
title: Basic sign-in flow using the password factor
---

<ApiLifecycle access="ie" />

This guide shows you how to implement a basic user sign-in flow using the password factor in Okta Identity Engine. The flow diagram and integration steps below describe how to build a simple sign-in form and how to authenticate credentials.

<StackSnippet snippet="pwdoptionalusecase" inline />

---

**What you need**

* [Okta org already configured for a password-only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration overview

The basic user sign-in use case requires the password factor.

<div class="half">

![Password factor only indicator](/img/oie-embedded-sdk/factor-password-only.png)

Figure: Password factor only indicator

</div>

Before you build a basic sign-in flow, [set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

## Summary of steps
<StackSnippet snippet="summaryofsteps" />

Figure: Basic sign-in sequence flow diagram for Okta Auth JS SDK

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
