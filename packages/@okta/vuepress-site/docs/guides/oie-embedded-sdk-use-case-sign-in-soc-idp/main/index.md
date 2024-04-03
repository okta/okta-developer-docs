---
title: Sign in with Facebook
---

<ApiLifecycle access="ie" />

> **Note:** In proxy model architectures, where a server-side application using the embedded SDK is used as a proxy between client applications and Okta servers, a request context for the client applications is required. The expectation is that security enforcement is based on the client request context's IP address and user agent.
>
> However, since these values are currently derived from the server application rather than the client, this enforcement isn't available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) won't work until a solution to the issue is found.

This guide covers a sequence of steps that you can follow to build an app that allows users to sign in with the Facebook social Identity Provider.

---

#### Learning outcomes

* Configure your Okta org to use Facebook as an Identity Provider.
* Challenge a user's identity using Facebook.

#### What you need

* An app that uses the embedded Identity Engine SDK
* [Okta org already set up for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-social-idp-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Configuration updates

Before you build the Facebook IdP sign-in flow, ensure that you've completed the following steps:

* [Set up your app for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)

* [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-social-idp-use-case)

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />
