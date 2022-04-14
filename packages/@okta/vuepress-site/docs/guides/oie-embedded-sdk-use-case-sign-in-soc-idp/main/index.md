---
title: Sign in with Facebook
---

<ApiLifecycle access="ie" />

This guide covers a sequence of steps that you can follow to build an app that allows users to sign in with the Facebook social Identity Provider.

---

**Learning outcomes**

Set up your Okta org and app to support sign-in with Facebook IdP use cases.

**What you need**

* An app that uses the embedded Okta Identity Engine SDK
* [Okta org already set up for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-social-idp-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

Before you build the Facebook IdP sign-in flow, ensure that you've [set up your app for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case) and [set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-social-idp-use-case).

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />