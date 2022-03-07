---
title: Okta email (OTP/magic link) integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

Learn how to integrate Okta Email into your app using the Embedded SDK.

---
**Learning outcomes**

* Understand the Okta Email enrollment and challenge flows
* Understand how to integrate Okta Email into your app step-by-step

**What you need**

* <StackSnippet snippet="whatyouneedsdk" />
* <StackSnippet snippet="whatyouneedorg" />
* An email address

**Sample code**

* <StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

Okta supports the email authenticator to verify the user's idenity in your authentication and password recovery use cases.  With this authenticator, Okta sends an email to the user's registered email address where the user can verify their identity by either using an OTP or magic link provided in the email. Like the other authenticators, the user enrolls in the email authenticator first before being able to use in in subsquence sign-ins. To integrate the emai authenticator into your app, integrate both the enrollment and OTP flows. The email authenticator gives to options to complete the flows. One using OTP and the other using a magic link.

Completing the flows with OTP, during sign-in Okta sends an email to the user's registered emeail address. Your app presents them with an OTP input field. The user finds the OTP in their email and enters it into your app to complete the follow. The other mechanism is through a magic link, where the user simply clicks on a link and is automatically signed into your app.

### OTP flow

<div class="common-image-format">

![Diagram showing email magic link flow](/img/authenticators/authenticators-email-magic-otp-flowchart.png)

</div>

### Magic link flow

<div class="common-image-format">

![Diagram showing OTP flow](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>

## Update configurations

### Add and configure the email authenticator

1. Open the Admin Console for your Okta org.
1. Choose **Security > Authenticators** to show the available authenticators.
1. Locate the **Email** authenticator in the list. The **Email** authenticator is added by default for new orgs, but if it doesn't exist, use **Add Authenticator** to add it.
1. Find the **Email** authenticator in the list. If it doesn't exist, click on **Add Authenticator** to add it.
1. For the **Email** Authenticator, click on the **Actions** menu and then click **Edit**.
1. Select **Authentication and recovery** for **This authenticator can be used for**. Changing the value to **Authentication and recovery**  allows email to be used in the sign-in example used in this guide.
1. Click **Save** to save your changes.

### Configure your org application

Setup your application to use the email authenticator:

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations you have already created.
1. Click on the application you’ve previously created on the **Applications** page.
1. Switch to the **Sign-On** tab
1. Scroll down to the **Sign-On Policy** section and click **Add Rule**.
1. Enter a name for the new rule (for example "2FA Rule") in the **Add Rule** dialog.
1. Set **User must authenticate with** to **Password+Another Factor**.
1. Confirm **Your org's authenticators that satisfy this requirement** is set to **Password AND Email or ...**
1. Click **Save**.

Setup your applications magic link URI:

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations you have already created.
1. Click on the application you’ve previously created on the **Applications** page.
1. In the **General Settings** tab under the **General** tab, click **Edit**
1. Under **EMAIL VERIFICATION EXPERIENCE** enter a callback URI for your application. The sample application uses <StackSnippet snippet="callbackuri" inline />.
1. Click **Save** to save your changes.

### You're ready to start integrating

After configuring your org, you're ready to start integrating the email authenticator flows into your app.

## Integrate OTP flow

<StackSnippet snippet="integrateotp" />

## Integrate magic link

<StackSnippet snippet="integratemagiclink" />

## Integrate enrollment flow

<StackSnippet snippet="integrateenroll />

## Integrate challenge flow

<StackSnippet snippet="integratechallenge" />

</div>
