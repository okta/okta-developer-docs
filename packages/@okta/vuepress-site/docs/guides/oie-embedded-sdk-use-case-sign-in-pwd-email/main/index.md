---
title: Sign in with password and email factors
---

<ApiLifecycle access="ie" />

> **Note:** In proxy model architectures, where a server-side application using the Embedded SDK is used as a proxy between client applications and Okta servers, a request context for the client applications is required. Security enforcement is expected to be based on the client request context's IP address and user agent. However, since these values are currently being derived from the server application rather than the client, this enforcement isn't available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) won't work until we can find a solution to the issue.

Enable a password and email sign-in flow in your application using the embedded SDK.

<StackSnippet snippet="pwdoptionalusecase" inline />

---

**Learning outcomes**

* Configure your Okta org to use the email authenticator.
* Challenge a user's identity with password and email factors.

**What you need**

* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

With the Embedded SDK, your app can verify a user's identity using a password and then the email authenticator. The email authenticator can complete its verification using <StackSnippet snippet="magiclinksoverviewlink" inline />, a one-time passcode (OTP), or a combination of both.

<div class="half">

![A representation of the required password and email factors](/img/oie-embedded-sdk/factor-password-email.png)

</div>

## Update Configurations

<StackSnippet snippet="updateconfigurations" />

## Integrate

### Summary of steps

<StackSnippet snippet="summaryofsteps" />

<StackSnippet snippet="integrationsteps" />
