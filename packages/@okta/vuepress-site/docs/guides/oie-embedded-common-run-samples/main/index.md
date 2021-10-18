---
title: Run the sample apps
excerpt: Run the sample apps
layout: Guides
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

This guide covers how you can run both the sample Widget app and the sample SDK app, after you have successfully [created and set up your Okta org](/docs/guides/oie-embedded-common-org-setup/) and [downloaded and set up the SDK](/docs/guides/oie-embedded-common-download-setup-app).
---
**Learning outcomes**
* Run your sample app and build your integration.

**What you need**
* [Okta org](https://developer.okta.com/signup/oie.html)
* [SDK, Sign-In Widget and sample app](/docs/guides/oie-embedded-common-download-setup-app), downloaded and set up

**Sample code**
* n/a
---

## The embedded Widget flow

In tandem with the embedded SDK, the Widget integrates into your app by using a native language interface and communicates directly with the Okta APIs. The following diagram summarizes the flow.

<div class="common-image-format">

![Displays the Embedded SDK Widget flow](/img/oie-embedded-sdk/embedded-widget-overview.png)

</div>

## Run the embedded Widget sample app

<StackSelector class="cleaner-selector"/>

<StackSelector snippet="runwidgetapp" noSelector />

### Start your work with the use cases

After you have successfully run the sample app, the next step is to build your integration by using the sample app as your guide. See [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/) to start using the Widget and explore the available use cases.

## The embedded SDK flow

The SDK integrates into your app by using a native language interface and communicates directly with Okta APIs by using a REST interface. The following diagram illustrates the SDK flow.

<div class="common-image-format">

![Embedded SDK overview diagram](/img/oie-embedded-sdk/embedded-sdk-overview.png)

</div>

## Run the embedded SDK sample app

<StackSelector class="cleaner-selector"/>

<StackSelector snippet="runsdkapp" noSelector />

### Work with the use cases

After you've successfully run the sample app, you can build your own integration by using the sample app as your guide. Explore use cases that are available with the SDK, starting with the [Basic sign-in flow using the password factor](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/) use case.
