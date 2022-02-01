---
title: Web Authentication integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

This guide shows you how to integrate WebAuthn into your app using the embedded SDK.

---
**Learning outcomes**

* ...
* ...

**What you need**

* <StackSnippet snippet="orgconfigurepwdonly" />
* <StackSnippet snippet="oiesdksetup" />
* Google Authenticator installed on a mobile device

**Sample code**

<StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

...

<div class="common-image-format">

![Diagram showing the WebAuthN enrollment flow](/img/authenticators/authenticators-google-flow-overview.png)

</div>

## Update configurations

Before you can start using WebAuthN, create an Okta org application as described in <StackSnippet snippet="orgconfigurepwdonly" inline/>. Then add WebAuthN to your app integration by executing the following steps:

### Add WebAuthN to the Okta org

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, click **Add Authenticator**.
1. On the **Add Authenticator** dialog box, click **Add** under **FIDO2 (WebAuthn)**.
1. On the **Add FIDO2(WebAuthN)** dialog box, click **Add**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. On the **Enrollment** tab, click **Edit** for the **Default Policy**.
1. Set **FIDO2 (WebAuthn)** to **Optional** and click **Update Policy**.

### Configure your Okta org application to use Google Authenticator

1. In the Admin Console, go to **Applications** and **Applications**.
1. On the **Applications** page, click on the application you've previously created.
1. On the **General** tab ensure that **Interaction Code** and **Refresh Token** are selected.
1. On the **Sign-On** tab, scroll down to the **Sign-On Policy** section and click **Add Rule**.
1. On the **Add Rule** dialog box, do the following:
   1. Enter a name for the new rule (for example "2FA Rule").
   1. Set **User must authenticate with** to **Password+Another Factor**.
   1. Select **Device Bound**.
   1. Confirm **Your org's authenticators that satisify this requirment** is set too **Password AND FIDO2 (WebAuthn) or ...**.
   1. Click **Save**.

## Ensure your OS and browser supports WebAuthN

...

## Integrate SDK for authenticator enrollment

### Summary of steps

The following summarizes the WebAuthN enrollment flow using a basic user sign-in use case.

<StackSnippet snippet="enrollmentintegrationsummary" />

The following instructions detail step-by-step how to integrate the Google Authenticator enrollment flow into your app.

<StackSnippet snippet="enrollmentintegrationsteps" />

## Integrate SDK for authenticator challenge

### Summary of steps

The following summarizes the WebAuthN challenge flow using a basic user sign-in use case.

<StackSnippet snippet="challengeintegrationsummary" />

The following instructions detail step-by-step how to integrate the WebAuthN challenge flow into your app.

<StackSnippet snippet="challengeintegrationsteps" />

</div>
