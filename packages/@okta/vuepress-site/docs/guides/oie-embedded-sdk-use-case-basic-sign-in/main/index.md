---
title: Basic sign-in flow using the password factor
---

<ApiLifecycle access="ie" />

> **Note:** In proxy model architectures, where a server-side application using the Embedded SDK is used as a proxy between client applications and Okta servers, a request context for the client applications is required. Security enforcement is expected to be based on the client request context’s IP address and user agent. However, since these values are currently being derived from the server application rather than the client, this enforcement is not available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) will not work until we can find a solution to the issue.

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

<div class="half">

![Password factor only indicator](/img/oie-embedded-sdk/factor-password-only.png)

</div>

Before you build a basic sign-in flow, ensure that your org is configured for the password factor by completing the steps in [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

<StackSnippet snippet="getuserprofile" />
