---
title: Okta Verify (Push/OTP) integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

Learn how to integrate Okta Verify into your app using the embedded SDK.

---
**Learning outcomes**

* Understand the Okta Verify enrollment and challenge flows
* Understand how to integrate Okta Verify into your app step-by-step

**What you need**

* <StackSnippet snippet="whatyouneedsdk" />
* <StackSnippet snippet="whatyouneedorg" />
* Okta Verify installed on a mobile device

**Sample code**

* <StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

Okta Verify is a software-based authenticator created by Okta that supports identity verification through Time-based One-Time Passwords (TOTPs) and push notifications. Okta Verify is available for download on either Google Play or the Apple App store, depending on your mobile device. For more information on Okta Verify, see the [Okta Help Center](https://help.okta.com/en/prod/Content/Topics/Mobile/okta-verify-overview.htm).

Okta Verify is highly customizable and offers different ways to enroll and challenge users. Your app's integration with the embedded SDK depends on which features you support. This guide details step-by-step how to integrate four flows supported by the embedded SDK and Okta Verify. They are:

* [Enrollment using QR Code](#integrate-enrollment-using-qr-code)
* [Enrollment using other channels such as email or SMS](#integrate-enrollment-using-other-channels)
* [Challenge using push notification](#integrate-challenge-using-push-notification-option)
* [Challenge using TOTP](#integrate-challenge-using-totp-option)

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

>**Note:** The **Push Notification: Number Challenge** flow supported in Okta Verify is currently not supported in the embedded SDK.

## Update configurations

First, you'll need to configure your Okta org to enable Okta Verify for the following challenge flows:

* **Push notification:** Tap on a push notification prompt in Okta Verify to confirm the sign-in attempt.
* **Time-based One-time Password (TOTP):**  Copy the TOTP from Okta Verify and submit it in your app.

This is a simple two-step process. First, you add Okta Verify to the list of enabled authenticators in your org, and then you add it to the list of allowed authenticators in your app, as shown next.

### Add Okta Verify

Add and configure Okta Verify in your org:

1. Open the Admin Console for your Okta org.
1. Choose **Security > Authenticators** to show the available authenticators.
1. Click **Add Authenticator**.
1. Click **Add** under Okta Verify in the **Add Authenticator** dialog.
1. Note that **TOTP (on by default) (Android and iOS only)** is checked by default.
1. Check the box for **Push notification (Android and iOS only)**
1. Check **Never** for **Number challenge for Okta Verify push** if it is not already checked. This option is not currently supported in the embedded SDK.
1. Click **Add** to save your changes.

### Configure your org application

Setup your application to use Okta Verify:

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations you have already created.
1. Click on the application you’ve previously created on the **Applications** page.
1. Ensure that **Interaction Code** and **Refresh Token** are selected.
1. Switch to the **Sign-On** tab
1. Scroll down to the **Sign-On Policy** section and click **Add Rule**.
1. Enter a name for the new rule (for example "2FA Rule") in the **Add Rule** dialog.
1. Set **User must authenticate with** to **Password+Another Factor**.
1. Select **Device Bound**.
1. Confirm **Your org's authenticators that satisfy this requirement** is set to **Password AND Okta Verify or ...**
1. Click **Save**.

### You're ready to start integrating

After configuring your org, you're ready to start integrating the Okta Verify flows into your app.

## Shared steps between flows

<StackSnippet snippet="commonsteps" />

## Integrate enrollment using QR Code

### Summary of steps

The following summarizes the Okta Verify enrollment flow with QR Code.

<StackSnippet snippet="enrollmentqrcodeintegrationsummary" />

<StackSnippet snippet="enrollmentqrcodeintegrationsteps" />

## Integrate enrollment using other channels

### Summary of steps

The following summarizes the Okta Verify enrollment flow with an email channel.

<StackSnippet snippet="enrollmentotherpintegrationsummary" />

<StackSnippet snippet="enrollmentotherintegrationsteps" />

## Integrate challenge using push notification option

### Summary of steps

The following summarizes the Okta Verify challenge flow with push notification.

<StackSnippet snippet="challengepushintegrationsummary" />

<StackSnippet snippet="challengepushintegrationsteps" />

## Integrate challenge using TOTP option

### Summary of steps

The following summarizes the Okta Verify enrollment flow with TOTP.

<StackSnippet snippet="challengetotpintegrationsummary" />

<StackSnippet snippet="challengetotpintegrationsteps" />

</div>
