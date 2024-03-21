---
title: Run the sample apps
excerpt: Run the sample apps
layout: Guides
---

<ApiLifecycle access="ie" />


This guide describes how to run the embedded Identity Engine SDK or Sign-In Widget sample app. Make sure to successfully [create and set up your Okta org](/docs/guides/oie-embedded-common-org-setup/) first. You also need to [download and set up the SDK](/docs/guides/oie-embedded-common-download-setup-app).

---

#### Learning outcomes

Run the embedded Identity Engine SDK or Sign-In Widget sample app.

#### What you need

* An [Okta org already configured for a password only use case](/docs/guides/oie-embedded-common-org-setup/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* An [Identity Engine SDK set up for the sample app](/docs/guides/oie-embedded-common-download-setup-app/)
* An Identity Engine [sample app](#sample-code)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## The embedded widget flow

In tandem with the embedded SDK, the widget integrates into your app by using a native language interface and communicates directly with the Okta APIs. The following diagram summarizes the flow.

<div class="three-quarter">

![Displays the embedded SDK widget flow](/img/oie-embedded-sdk/embedded-widget-overview.png)

</div>

## Run the embedded widget sample app

<StackSnippet snippet="runwidgetapp" />

## The embedded SDK flow

The SDK integrates into your app by using a native language interface and communicates directly with the Okta APIs by using a REST interface. The following diagram illustrates the SDK flow.

<div class="three-quarter">

![Embedded SDK overview diagram](/img/oie-embedded-sdk/embedded-sdk-overview.png)

</div>

## Run the embedded SDK sample app

<StackSnippet snippet="runsdkapp" />
