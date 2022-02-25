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

Okta Verify is a software-based authenticator created by Okta that supports identity verification through the use of Time-based One-Time passwords (TOTPs) and push notifications. Okta Verify is available for download on either Google Play or the Apple App store depending on your mobile device. For more information on Okta Verify see the [Okta Help Center](https://help.okta.com/en/prod/Content/Topics/Mobile/okta-verify-overview.htm).

Okta Verify is highly customizable and offers different ways to enroll and challenge a user. Your app's integration with the embedded SDK depends on which features your app will support. This guide details step-by-step how to integrate four flows supported by the embedded SDK and Okta Verify. They are:

* Enrollment using QR Code
* Enrollment using other channels such as email or SMS
* Challenge using push notification
* Challenge using TOTP

### Enrollment flows

The following high-level diagram illustrates the supported enrollment flows:

<div class="common-image-format">

![High level diagram showing enrollment flows](/img/authenticators/authenticators-oktaverify-overview-supported-enroll-flows.png)

</div>

### Challenge flows

The following high-level diagram illustrates the supported challenge flows:

<div class="common-image-format">

![High level diagram showing enrollment flows](/img/authenticators/authenticators-oktaverify-overview-supported-challenge-flows.png)

</div>

>**Note:** The **Push Notification: Number Challenge** flow supported in Okta Verify, is currently not supported in the embedded SDK.

## Update configurations

Before you can start using Okta Verify create an Okta org application as described in <StackSnippet snippet="orgconfigurepwdonly" inline/>. Next, configure your org to enable Okta verify for the following challenge flows:

* **Push notification:** Tap on a push notification prompt in Okta Verify to confirm the sign-in attempt.
* **Time-based one time password (TOTP):**  Copy the TOTP from Okta Verify and submit it in your app.

### Add Okta Verify

The following steps add and configure Okta Verify in your org:

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, click **Add Authenticator**.
1. On the **Add Authenticator** dialog, click **Add** under **Okta Verify**.
1. Note that **TOTP (on by default)(Android and iOS only)** is disabled and checked by default.
1. Check the box for **Push notification (Android and iOS only)**.
1. Since it's currently not supported, keep **Number challenge for Okta Verify push** set to **Never**.
1. Click **Add** to save your changes.

### Configure your org application

The following steps setup your application integration to use Okta Verify:

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

### You're ready to start integrating

After you've configured your org, start integrating the enrollment and challenge flows into your app. The following are the list of supported flows:

The authenticator enrollment and challenge flows for this setup are:

* [Integrate enrollment using QR Code](#integrate-enrollment-using-qr-code)
* [Integrate enrollment using other channels](#integrate-enrollment-using-other-channels)
* [Integrate challenge using push notification option](#integrate-challenge-using-push-notification-option)
* [Integrate challenge using TOTP option](#integrate-challenge-using-totp-option)

## Integrate enrollment using QR Code

### Summary of steps

The following summarizes the Okta Verify enrollment flow with QR Code using a sign-in use case.

<StackSnippet snippet="enrollmentqrcodeintegrationsummary" />

<StackSnippet snippet="enrollmentqrcodeintegrationsteps" />

## Integrate enrollment using other channels

### Summary of steps

The following summarizes the Okta Verify enrollment flow with email channel using a sign-in use case.

<StackSnippet snippet="enrollmentotherpintegrationsummary" />

<StackSnippet snippet="enrollmentotherintegrationsteps" />

## Integrate challenge using push notification option

### Summary of steps

The following summarizes the Okta Verify challenge flow with push notification using a sign-in use case.

<StackSnippet snippet="challengepushintegrationsummary" />

<StackSnippet snippet="challengepushintegrationsteps" />

## Integrate challenge using TOTP option

### Summary of steps

The following summarizes the Okta Verify enrollment flow with TOTP using a sign-in use case.

<StackSnippet snippet="challengetotpintegrationsummary" />

<StackSnippet snippet="challengetotpintegrationsteps" />

## Common steps

<StackSnippet snippet="commonsteps" />

</div>
