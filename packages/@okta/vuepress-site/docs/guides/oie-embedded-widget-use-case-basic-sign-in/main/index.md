---
title: Basic sign-in flow using the Widget
---

<ApiLifecycle access="ie" />

This guide covers a basic user sign-in flow that uses the Sign-In Widget. The flow diagram and steps describe the process to sign in to an app with the embedded Sign-In Widget.

---

**Learning outcomes**

Understand the sequence of steps in the basic sign-in flow when you use the Sign-In Widget.

**What you need**

* An app that uses the embedded Okta Sign-In Widget and Identity Engine SDK
* [Okta org already set up for your use case](/docs/guides/oie-embedded-common-org-setup/)
* [Sign-In Widget and SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#set-up-the-sign-in-widget-and-sdk-for-your-own-app)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

Ensure that you've completed the steps to [download and configure the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/). These steps guide you to the appropriate repository and location of the embedded Sign-In Widget sample app, identify the packages to install, and describe additional changes to the Okta org that are required for the Widget.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />