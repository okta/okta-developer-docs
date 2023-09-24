---
title: Basic sign-in flow using the password factor
---

<ApiLifecycle access="ie" />

> **Caution:** A request context for the client applications is required in proxy-model architectures, where a server-side application uses the Embedded SDK as a proxy between client applications and Okta servers. In this scenario, Okta expects security enforcement to be based on the client request context’s IP address and user agent. Currently these values are being derived from the server application rather than the client, where this security enforcement is not available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) do not work.

This guide explains how to authenticate credentials and handle the response. This is the simplest use cases and the first use case you should try after installing the SDK.

<StackSnippet snippet="pwdoptionalusecase" inline />

---

**What you'll learn**

Learn how to authenticate credentials and handle the responses using Okta Identity Engine.

**What you need**

* An app that uses the embedded Okta Identity Engine SDK
* A sign in page with a form that captures both the username and password
* [Okta org already configured for a password-only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* [Identity Engine SDK set up for your app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

The basic user sign-in use case requires the password factor.

<div class="half">

![Password factor only indicator](/img/oie-embedded-sdk/factor-password-only.png)

</div>

Before you build a basic sign-in flow, ensure that your org is configured for the password factor by completing the steps in [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

