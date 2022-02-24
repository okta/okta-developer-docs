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

TBD

<!--
<div class="common-image-format">

![Diagram showing the WebAuthn enrollment flow](/img/authenticators/authenticators-webauthn-flow-overview.png)

</div>

As the service provider, you can provide WebAuthn support to your users by enabling it in your Okta org and building out support for it in your application using the Embedding SDK.
-->

## Update configurations

Before you can start using Okta Verify create an Okta org application as described in <StackSnippet snippet="orgconfigurepwdonly" inline/>. Next

### Add Okta Verify for push notification and TOTP

Next, add Okta Verify to your org and enable it for push notification and TOTP. This setup enables the user to do one of the following during the sign-in:

* **Push notification:** Tap on a push notification prompt in Okta Verify to confirm the sign-in attempt.
* **Time-based one time password (TOTP):**  Copy the TOTP from Okta Verify and submit it in your app.

The authenticator enrollment and challenge flows for this setup are:

* [Integrate enrollment using QR Code](#update-okta-verify-to-use-push-notification-number-challnege)
* [Integrate enrollment using other channels](#integrate-enrollment-using-other-channels)
* [Integrate challenge using push notification prompt](#integrate-challenge-using-push-notification-prompt)
* [Integrate challenge using number TOTP](#integrate-challenge-using-number-totp)

#### Add authenticator

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, click **Add Authenticator**.
1. On the **Add Authenticator** dialog, click **Add** under **Okta Verify**.
1. Note that **TOTP (on by default)(Android and iOS only)** is disabled and checked by default.
1. Check the box for **Push notification (Android and iOS only)**.
1. Keep **Number challenge for Okta Verify push** set to **Never**.
1. Click **Add** to save your changes.

#### Configure your org application to use Okta Verify

1. In the Admin Console, go to **Applications** and **Applications**.
1. On the **Applications** page, click on the application you've previously created.
1. On the **General** tab ensure that **Interaction Code** and **Refresh Token** are selected.
1. On the **Sign-On** tab, scroll down to the **Sign-On Policy** section and click **Add Rule**.
1. On the **Add Rule** dialog box, do the following:
   1. Enter a name for the new rule (for example "2FA Rule").
   1. Set **User must authenticate with** to **Password+Another Factor**.
   1. Select **Device Bound**.
   1. Confirm **Your org's authenticators that satisify this requirment** is set to **Password AND Okta Verify or ...**.
   1. Click **Save** to save your changes.

### Update Okta Verify to use push notification number challenge

The embedded SDKs currently don't support using the push notification number challenge. If you need to use this option use the embedded widget or redirect option.

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

## Integrate challenge using push notification prompt

### Summary of steps

The following summarizes ...

<StackSnippet snippet="challengepushintegrationsummary" />

<StackSnippet snippet="challengepushintegrationsteps" />

## Integrate challenge using number TOTP

### Summary of steps

The following summarizes ...

<StackSnippet snippet="challengetotpintegrationsummary" />

<StackSnippet snippet="challengetotpintegrationsteps" />

## Common steps

<StackSnippet snippet="commonsteps" />

</div>
