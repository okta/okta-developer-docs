---
title: Okta email (magic link/OTP) integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

Learn how to integrate the Okta Email authenticator into your app with the Embedded SDK.

---
**Learning outcomes**

* Configure your Okta org to use the email authenticator
* Enroll and challenge a user with email and magic links
* Enable OTP only for the email authenticator

**What you need**

* <StackSnippet snippet="whatyouneedsdk" />
* <StackSnippet snippet="whatyouneedorg" />

**Sample code**

* <StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

With the Embedded SDK, your app can verify a user's identity using the email authenticator. You can integrate the email enrollment and challenge in your app, and complete those flows using magic links and OTP.  Use this guide to learn how.

### Discover the convenience of magic links

With Okta's email magic links, a user performs one action - a click on an email link - to complete the email verification. When compared to OTP, magic links is a balance of security and convenience and provides a frictionless experience for your users.

<div class="common-image-format">

![Simple diagram illustrating magic links](/img/authenticators/authenticators-email-magic-link-summary-simple-overview.png)

</div>

This guide includes step-by-step instructions on how to integrate magic links in your app.

## Get started

First, [update](update-configuration) your Okta org configurations to enable the email authenticator. After configuring your org, you're ready to integrate the email authenticator into your app. Start with these step-by-step integration instructions:

* [Integrate email enrollment](#integrate-email-enrollment)
* [Integrate email challenge](#integrate-email-challenge)
* [Integrate different browser and device scenario](#integrate-different-browser-and-device-scenario)

These instructions detail how to integrate these flows using magic links. To learn how to integrate OTP, see the following integration instructions:

* [Integrate the email authenticator flows using OTP](#integrate-the-email-authenticator-flows-using-otp).
* [Enable only OTP for the email authenticator](#enable-only-otp-for-the-email-authenticator).

 > **Note:** This guide uses authentication use cases to describe how to integrate the email authenticator. The email authenticator also supports password recovery flows and the integration is nearly identical.

## Update configurations

Before you can start using the email authenticatior, you need to enable it in your Okta org.

### Add the email authenticator to your org

1. Open the Admin Console for your org.
1. Choose **Security > Authenticators** to show the available authenticators.
1. Locate the **Email** authenticator in the list. The **Email** authenticator is added by default for new orgs, but if it doesn't exist, use **Add Authenticator** to add it.
1. Find the **Email** authenticator in the list. If it doesn't exist, click on **Add Authenticator** to add it.
1. For the **Email** Authenticator, click on the **Actions** menu and then click **Edit**.
1. Select **Authentication and recovery** for **This authenticator can be used for**. Changing the value to **Authentication and recovery**  allows email to be used in the sign-in example used in this guide.
1. Click **Save** to save your changes.

### Setup your application to use the email authenticator

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations you have already created.
1. Click on the application you’ve previously created on the **Applications** page.
1. Switch to the **Sign-On** tab
1. Scroll down to the **Sign-On Policy** section and click **Add Rule**.
1. Enter a name for the new rule (for example "2FA Rule") in the **Add Rule** dialog.
1. Set **User must authenticate with** to **Password+Another Factor**.
1. Confirm **Your org's authenticators that satisfy this requirement** is set to **Password AND Email or ...**
1. Click **Save**.

### Set up callback URI for magic links

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations you have already created.
1. Click on the application you’ve previously created on the **Applications** page.
1. In the **General Settings** tab under the **General** tab, click **Edit**
1. Under **EMAIL VERIFICATION EXPERIENCE** enter a **Callback URI** for your application. This value should be a URL to your application that accepts OTP and state. The sample application uses <StackSnippet snippet="callbackuri" inline />.
1. Click **Save** to save your changes.

## Integrate email enrollment

The following step-by-step instructions detail how to integrate the email enrollment into your app.

<StackSnippet snippet="integrateenrollsummary"/>

<StackSnippet snippet="integrateenroll"/>

## Integrate email challenge

The following step-by-step instructions detail how to integrate the email challenge into your app.

<StackSnippet snippet="integratechallengesummary"/>

<StackSnippet snippet="integratechallenge" />

## Integrate different browser and device scenario

Magic links is made with security in mind and only works when there is complete assurance that the person who started the request is the same one who clicked on the magic link. For example, a user who started a sign-in in your app in one browser and device must be on the same browser and device when they click on the magic link in their email. If the browser or device is different, magic links is disablede and they need to use OTP or be on the same browser and device to complete the email verification. This logic is illustrated in the following flowchart.

<div class="common-image-format">

![Diagram showing nagic link flow for same and diff browsers](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>

The following step-by-step instructions detail how to integrate the different browser and device scenario. Even though the instructions use the email challenge example, handling the different browser and device scenario in the email enrollment is nearly identical.

<StackSnippet snippet="integratediffbrowserdevicesummary"/>

<StackSnippet snippet="integratediffbrowserdevice" />

## Integrate the email authenticator using OTP

These instructions use OTP to verify the email. With OTP, the user copies an automatically generated numeric string from their email to your application to verify their identity. This flow is illustrated in the following diagram:

<div class="common-image-format">

![Flowchart showing the OTP flow](/img/authenticators/authenticators-email-overview-otp-flowchart.png)

</div>

The following step-by-step instructions detail how to integrate the OTP flow. Even though the instructions use the email challenge example, integrating OTP in the email enrollment is nearly identical.

<StackSnippet snippet="integratechallengeotpsummary"/>

<StackSnippet snippet="integratechallengeotp" />

## Enable only OTP for the email authenticator

Although magic links is a secure way to verify user's emails, if you want to provide a higher level of sensitivity that positively proves that the person who initiated the request is the same person that is reading the email, than OTP may be a more ideal solution. For example, if you have a banking app, which shows account information and allows for money transfers, magic links may be too convenient and OTP may provide a better solution.

To disable magic link functionality, remove the links from following email templates:

* Email Challenge
* Email Factor Verification
* Forgot password

In each of the templates, find the anchor tag and remove it from the template HTML. The following screenshot identifies the magic link anchor tag (identified by `email-authentication-button` id) for the **Email Challenge** template.

<div class="common-image-format">

![Diagram showing email template with magic link](/img/authenticators/authenticators-email-magic-link-modify-template.png)

</div>

To learn more about customizing email templates and using the velocity template language, see [Customize an email template](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Email.htm) in the Okta Help Center.

</div>

## TODO

1. Add bhagya's comments from my notes
2. Add comments from last meeting with Jeff
3. Understand what happens if callback URI is empty
4. Update sign on policy configurations
5. Look at Bhagya's doc: https://docs.google.com/document/d/1t1HDUkXMDDEb7H1ip5WaBacDlu_j5XEy8GJHZZ5PIaE/edit and give feedback
