---
title: Sign in with Facebook
---

<ApiLifecycle access="ie" />

> **Note:** In proxy model architectures, where a server-side application using the Embedded SDK is used as a proxy between client applications and Okta servers, a request context for the client applications is required. Security enforcement is expected to be based on the client request context’s IP address and user agent. However, since these values are currently being derived from the server application rather than the client, this enforcement is not available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) will not work until we can find a solution to the issue.

This guide covers a sequence of steps that you can follow to build an app that allows users to sign in with the Facebook social Identity Provider.

---

#### Learning outcomes

Set up your Okta org and app to support sign-in with Facebook IdP use cases.

#### What you need

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
