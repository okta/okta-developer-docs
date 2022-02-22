---
title: Okta Verify (Push/OTP) integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

This guide shows you how to integrate Okta Verify into your app using the embedded SDK.

---
**Learning outcomes**

* Understand the Okta Verify enrollment and challenge flows
* Learn step-by-step how to integrate Okta Verify into your authentication use case

**What you need**

* <StackSnippet snippet="whatyouneedsdk" />
* <StackSnippet snippet="whatyouneedorg" />

**Sample code**

* <StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

...

<!--
<div class="common-image-format">

![Diagram showing the WebAuthn enrollment flow](/img/authenticators/authenticators-webauthn-flow-overview.png)

</div>

As the service provider, you can provide WebAuthn support to your users by enabling it in your Okta org and building out support for it in your application using the Embedding SDK.
-->

## Update configurations
<!--

Before you can start using Web Authentication (WebAuthn), create an Okta org application as described in <StackSnippet snippet="orgconfigurepwdonly" inline/>. Then add WebAuthn to your app integration by executing the following steps:

### Add WebAuthn to the Okta org

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, click **Add Authenticator**.
1. On the **Add Authenticator** dialog, click **Add** under **FIDO2 (WebAuthn)**.
1. Leave the default value for **User Verification**, which is set to "Discouraged".
1. On the **Add FIDO2(WebAuthn)** dialog, click **Add**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. On the **Enrollment** tab, click **Edit** for the **Default Policy**.
1. Set **FIDO2 (WebAuthn)** to **Optional** and click **Update Policy**.

### Configure your Okta org application to use WebAuthn

1. In the Admin Console, go to **Applications** and **Applications**.
1. On the **Applications** page, click on the application you've previously created.
1. On the **General** tab ensure that **Interaction Code** and **Refresh Token** are selected.
1. On the **Sign-On** tab, scroll down to the **Sign-On Policy** section and click **Add Rule**.
1. On the **Add Rule** dialog box, do the following:
   1. Enter a name for the new rule (for example "2FA Rule").
   1. Set **User must authenticate with** to **Password+Another Factor**.
   1. Select **Device Bound**.
   1. Confirm **Your org's authenticators that satisify this requirment** is set to **Password AND FIDO2 (WebAuthn) or ...**.
   1. Click **Save**.
-->

## Integrate enrollment using QR Code

### Summary of steps

The following summarizes ...

<StackSnippet snippet="enrollmentqrcodeintegrationsummary" />

<StackSnippet snippet="enrollmentqrcodeintegrationsteps" />

## Integrate enrollment using other channels

### Summary of steps

The following summarizes ...

<StackSnippet snippet="enrollmentotherpintegrationsummary" />

<StackSnippet snippet="enrollmentotherintegrationsteps" />

## Integrate challenge using push notification

### Summary of steps

The following summarizes ...

<StackSnippet snippet="challengepushintegrationsummary" />

<StackSnippet snippet="challengepushintegrationsteps" />

## Integrate challenge using number challenge

### Summary of steps

The following summarizes ...

<StackSnippet snippet="challengenumintegrationsummary" />

<StackSnippet snippet="challengenumintegrationsteps" />

</div>
