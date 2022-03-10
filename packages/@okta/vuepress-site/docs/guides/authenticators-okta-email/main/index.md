---
title: Okta email (OTP/magic link) integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

Learn how to integrate the Okta Email authenticator into your app with the Embedded SDK.

---
**Learning outcomes**

* Configure your OKta org to use Okta email
* Enroll and challenge a user with Okta email
* Use OTP or email to complete the Okta email verification
* Disable magic links if you don't intend to use them

**What you need**

* <StackSnippet snippet="whatyouneedsdk" />
* <StackSnippet snippet="whatyouneedorg" />

**Sample code**

* <StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

Your app can verify a user's identity using email as the authenticator. The Embedded SDK supports email enrollment and challenge flows, and the ability to complete these flows with magic links or an OTP. use this guide to learn how to integrate this email functionality into your app.

## Update configurations

Before you can start using the email authenticatior, set it up in your Okta org.

### Add and configure the email authenticator

Add the email authenticator to your org:

1. Open the Admin Console for your org.
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

### Set up magic links

Enable magic links in your org.

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations you have already created.
1. Click on the application you’ve previously created on the **Applications** page.
1. In the **General Settings** tab under the **General** tab, click **Edit**
1. Under **EMAIL VERIFICATION EXPERIENCE** enter a callback URI for your application. The sample application uses <StackSnippet snippet="callbackuri" inline />.
1. Click **Save** to save your changes.

### You're ready to integrate

After configuring your org, you're ready to start integrating the enrollment and challange flows into your app. The enrollment and challenge flows can be iniitated several different ways. The following instructions use the sign-in use case to walk you through out to integrate these flows in your app:

* [Integrate enrollment flow](#integrate-enrollment-flow)
* [Integrate challenge flow](#integrate-challenge-flow)

These instructinons detail how to integrate these flows using OTP. With OTP, the user copies an automatically generated numeric string of characters from their email to your application.

With OTP, Okta sends an email to the user during these flows. The user copies an automatically generated numeric string of characters from the email to your application to complete the verfication. This flow is illustrated in the following high-level diagram:

<div class="common-image-format">

![Flowchart showing the OTP flow](/img/authenticators/authenticators-email-overview-otp-flowchart.png)

</div>

### Discover the convenience of magic links

As an alternative to OTP, give your users the option to use magic links to complete the email verfication. Magic links is a more convienent because it reduces the number of steps a user needs to take to verify their identity down to a single click. For more information about magic links, including how to integrate the feature in your app, see [Integrate magic links](#integrate-magic-links)

## Integrate enrollment flow

The following step-by-step instructions detail how to integrate the email enrollment into your app.

<StackSnippet snippet="integrateenrollsummary"/>

<StackSnippet snippet="integrateenroll"/>

## Integrate challenge flow

The following step-by-step instructions detail how to integrate the email challenge into your app.

<StackSnippet snippet="integratechallengesummary"/>

<StackSnippet snippet="integratechallenge" />

## Integrate magic links

### Overview

With Okta's email magic links, a user performs one action - a click on an email link - to complete the email verification. When compared to OTP, magic links is a balance of security and convenience and provides a frictionless experioence for your users.

Magic links is made with security in mind and only works when there is a complete assurance that the person who started the request is the same one who clicked on the link. For example, a user must click the magic link in the same device and browser - although different tab - from which they intiated your app's sign-in. If the browser or device is different, they'll be required to use an OTP to complete the verification. This OTP fallback is illustrated in the following flowchart.

<div class="common-image-format">

![Diagram showing nagic link flow](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>

The same browser and device restriction is to ensure that the user who started the sign-in in your app is the same one that clicked on the magic link.

The following step-by-step instructions detail how to integrate magic links into your app.

### Same browser and device flow

<StackSnippet snippet="integratemagiclinksummarysame"/>

### Different browser and device flow

<StackSnippet snippet="integratemagiclinksummarydiff"/>

<StackSnippet snippet="integratemagiclink" />

### Disabling magic links

Although magic links is a secure way to verify user's emails, if you want to provide a higher level of sensitivity that positively proves that the person who initiated the request is the same person that is reading the email, than OTP may be a more ideal solution. For example, if you have a banking app, which shows account information and allows for money transfers, magic links may be to convenient and OTP may provide a better solution.

To disable magic link functionality, remove the links from following email templates:

* Email Challenge
* Email Factor Verification

In each of the templates, find the anchor tag and remove it from the template HTML. The following screenshot identifies the magic link anchor tag (identified by `email-authentication-button` id) for the **Email Challenge** template.

<div class="common-image-format">

![Diagram showing email template with magic link](/img/authenticators/authenticators-email-magic-link-modify-template.png)

</div>

To learn more about customizing email templates and using the velocity template language, see [Customize an email template](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Email.htm) in the Okta Help Center.


</div>
