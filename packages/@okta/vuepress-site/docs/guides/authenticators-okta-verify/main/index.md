---
title: Okta Verify (Push/OTP) integration guide
---

The expected behavior of Okta Verify is to reflect the context of the original client request when receiving a Push Notification. This behavior isn't honored in proxy model architectures, where a server-side application using the Embedded SDK is used as a proxy between client applications and Okta servers. Specifically, the Okta Verify push notification always displays the server's IP Address and user agent regardless of any passed-in request context. As a result, Okta Verify is unavailable for server-side applications using the Embedded SDK until we find a solution to this issue.

<!--

<ApiLifecycle access="ie" /><br>

Learn how to integrate Okta Verify into your app using the embedded SDK.

---

#### Learning outcomes

* Understand the Okta Verify enrollment and challenge flows
* Understand how to integrate Okta Verify into your app step-by-step

#### What you need

* <StackSnippet snippet="whatyouneedsdk" />
* Okta Verify installed on a mobile device

**Sample code**

* <StackSnippet snippet="samplecode" />

---

## Overview

Okta Verify is a software-based authenticator created by Okta that supports identity verification through time-based one-time passcodes (TOTPs) and push notifications. Okta Verify is available for download on either Google Play or the Apple App store, depending on your mobile device. For more information on Okta Verify, see the [Okta Help Center](https://help.okta.com/okta_help.htm?id=ext_okta_verify).

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
* **Time-based one-time passcode (TOTP):**  Copy the TOTP from Okta Verify and submit it in your app.

This is a simple two-step process. First, you need to enable it in your Okta org and then assign it an authentication policy which requires it to be used.

### Add Okta Verify to your org

First, add Okta Verify to your org and enable it.

1. Open the **Admin Console** for your org.
2. Choose **Security > Authenticators** to show the available authenticators.
3. If **Okta Verify** isn't in the list:
   1. Click **Add Authenticator**.
   2. Click **Add** on the **Okta Verify** tile.
   3. Verify that **TOTP (on by default) (Android and iOS only)** is checked.
   4. Check **Push notification (Android and iOS only)**.
   5. Select **Never** for **Number challenge for Okta Verify push**. This option is not currently supported in the embedded SDK.
   6. Click **Add**.

   If **Okta Verify** is in the list:
   1. Select **Actions > Edit** for **Okta Verify**.
   2. Verify that **TOTP (on by default) (Android and iOS only)** is checked.
   3. Check **Push notification (Android and iOS only)**.
   4. Select **Never** for **Number challenge for Okta Verify push**. This option is not currently supported in the embedded SDK.
   5. Click **Save** to save your changes.

4. Select the **Enrollment** tab.
5. Check that **Okta Verify** is set to either **Optional** or **Required** in the **Eligible Authenticators** section of the Default Policy.
   1. If **Okta Verify** is set to **Disabled**, click **Edit** for the Default Policy
   2. Select **Optional** from the drop-down box for **Okta Verify**, and then click **Update Policy**.

### Set your app integration to use Okta Verify

New apps are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup. In production, it becomes evident when you can share your authentication needs between apps. In testing, it's recommended that you create a new policy specifically for your app.

1. Open the **Admin Console** for your org.
2. Choose **Security > Authentication Policies** to show the available authentication policies.
3. Click **Add a Policy**.
4. Give the policy a name, and then click **Save**.
5. Locate the Catch-all Rule of the new policy and select **Actions > Edit**.
6. Select **Allowed after successful authentication**.
7. Set **User must authenticate with** to **Password + Another factor**.
8. For **Possession factor constraints**
   1. Verify that **Device Bound** is selected.
   2. Verify that **Okta Verify** is listed in the box under **Additional factor types**. If it is not listed, check the authenticator has been enabled using steps 4 and 5 of [Add Okta Verify to your org](#add-okta-verify-to-your-org).
   3. Click **Save**.

9. Select the **Applications** tab for your newly created policy, and then click **Add App**.
10. Find your app in the list and click **Add** next to it.
11. Click **Close**.
12. Verify that the app is now listed in the **Applications** tab of the new policy.

### You're ready to start integrating

After you configure your org, you can start integrating the enrollment and challenge flows into your app. The following are the list of supported flows:

* Integrate enrollment using QR code
* Integrate enrollment using other channels
* Integrate challenge using push notification option
* Integrate challenge using TOTP option

Each of these has some common steps for initiating the flow after the user is signed in, and for polling Okta Verify for a response midway through the flow. We cover these first before seeing how they fit into the individual flows.

## Shared steps between flows

<StackSnippet snippet="commonsteps" />

## Integrate enrollment using QR Code

In this flow, the user enrolls Okta Verify as an authenticator using a QR code. The following diagram summarizes this flow.

<StackSnippet snippet="enrollmentqrcodeintegrationsummary" />

<StackSnippet snippet="enrollmentqrcodeintegrationsteps" />

## Integrate enrollment using other channels

A user can enroll Okta Verify using several methods other than a QR code. The flow for each of these is the same but we use email as the option in this guide. The following diagram summarizes this flow.

<StackSnippet snippet="enrollmentotherintegrationsummary" />

<StackSnippet snippet="enrollmentotherintegrationsteps" />

## Integrate challenge using push notification option

After a user enrolls Okta Verify, they can authenticate themselves with Okta Verify using a push notification challenge. When they want to sign in, they must go to Okta Verify where they tap **Yes it's me** sent by the Okta servers. The following diagram summarizes this flow.

<StackSnippet snippet="challengepushintegrationsummary" />

<StackSnippet snippet="challengepushintegrationsteps" />

## Integrate challenge using TOTP option

After a user enrolls Okta Verify, they can authenticate themselves with Okta Verify using a time-based one-time passcode (TOTP) challenge. When they want to sign in, they must retrieve the TOTP that Okta Verify generates, and submits this to the service provider for verification. The Okta server independently generates the same password and validates that the submitted password is identical to the generated one. If it is the same, the user is authenticated and signed in.

The following diagram summarizes this flow.

<StackSnippet snippet="challengetotpintegrationsummary" />

<StackSnippet snippet="challengetotpintegrationsteps" />

## See also

<StackSnippet snippet="relatedusecases" />

-->