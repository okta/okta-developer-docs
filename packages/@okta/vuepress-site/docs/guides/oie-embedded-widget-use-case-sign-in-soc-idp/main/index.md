---
title: Sign in with Facebook using the Widget
---

<ApiLifecycle access="ie" />

This guide describes how to allow users to sign in with the Facebook social Identity Provider by using the Sign-In Widget.

---

#### Learning outcomes

Set up your app to support the sign-in flow with Facebook IdP use cases by using the Sign-In Widget.

#### What you need

* An app that uses the embedded Okta Sign-In Widget and Identity Engine SDK
* An [Okta org already set up for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-social-idp-use-case)
* A [Sign-In Widget and SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#set-up-the-sign-in-widget-and-sdk-for-your-own-app)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

Before building the Facebook IdP sign-in flow using the widget, ensure that you've [set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-social-idp-use-case).

After you've set up your Okta org for the social IdP use case, [download and configure the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/-/main/). These steps guide you to the appropriate repository and location of the embedded Sign-In Widget sample app. They also identify the packages to install and describe other changes to the Okta org that are required for the widget.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />