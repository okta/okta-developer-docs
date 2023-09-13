---
title: Run the sample apps
excerpt: Run the sample apps
layout: Guides
---

<ApiLifecycle access="ie" />

This guide covers how you can run the embedded Okta Identity Engine SDK<StackSnippet snippet="abstractrunlink" inline /> sample app after you successfully [create and set up your Okta org](/docs/guides/oie-embedded-common-org-setup/) and [download and set up the SDK](/docs/guides/oie-embedded-common-download-setup-app).

---

**Learning outcomes**

Run the Okta Identity Engine embedded SDK<StackSnippet snippet="outcomessiwsample" inline /> sample app.

**What you need**

* [Okta org already configured for a password only use case](/docs/guides/oie-embedded-common-org-setup/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* [Identity Engine SDK set up for the sample app](/docs/guides/oie-embedded-common-download-setup-app/)
* Sample code:
<StackSnippet snippet="samplecode" />

---

## The embedded Widget flow

<StackSnippet snippet="embeddedflow" />

## Run the embedded Widget sample app

<StackSnippet snippet="runwidgetapp" />

## The embedded SDK flow

The SDK integrates into your app by using a native language interface and communicates directly with Okta APIs by using a REST interface. The following diagram illustrates the SDK flow.

<div class="three-quarter">

![Embedded SDK overview diagram](/img/oie-embedded-sdk/embedded-sdk-overview.png)

</div>

## Run the embedded SDK sample app

<StackSnippet snippet="runsdkapp" />
