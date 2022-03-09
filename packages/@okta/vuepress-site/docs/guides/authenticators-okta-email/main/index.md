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

After configuring your org, you're ready to start integrating the email authenticator flows into your app. The enrollment and challenge flows support OTP and magic link to complete the user verification. See the following sections to learn more about these methods:

* [Integrate OTP](#integrate-otp)
* [Integrate magic links](#integrate-magic-links)

After learning about OTP and magic link, your ready to start integrating the enrollment and challenge flows. See the following sections for more information:

* [Integrate enrollment flow](#integrate-enrollment-flow)
* [Integrate challenge flow](#integrate-challenge-flow)

## Integrate OTP

With OTP, Okta sends an email to the user during the [enrollment](#integrate-enrollment-flow) and [challenge](#integrate-challenge-flow) flows. The user copies an OTP from the email and inputs it into your app to complete the verfication. This flow is illustrated in the following high-level diagram:

<div class="common-image-format">

![Flowchart showing the OTP flow](/img/authenticators/authenticators-email-overview-otp-flowchart.png)

</div>

Step-by-step instructions to integrate OTP into your application follows:

### Summary of steps

The following sequence diagram summarizes messaging between each component in the OTP flow.

<StackSnippet snippet="integrateotpsummary"/>

<StackSnippet snippet="integrateotp" />

## Integrate magic links

### Overview

With Okta's email magic links, a user performs one action - a click on an email link - to complete the email verification and, depending on the use case, to also complete your app sign-in. When compared to OTP, magic links is a balance of security and convenience and provides a frictionless experioence for your users.

### Magic links availablity

Magic links is made with security in mind and only works when there is a complete assurance that the person who started the request is the same one who clicked on the link. For example, a user must click on the magic link in the same device and browser - although different tab - from which they intiated your app's sign-in. If the browser or device is different, they'll be required to use an OTP to complete the verificaiton. This OTP fallback is illustrated in the following flowchart.

<div class="common-image-format">

![Diagram showing nagic link flow](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>

This OTP fallback is to ensure that magic links only works when the user who started the authentication or password recovery is the same person that clicked on the magic link.

### When to use OTP over magic links

Although magic links is a secure way to verify user's emails, if you want to provideda higher level of sensitivity that positively proves that the person who initiated the request is the same person that clicked on the magic link, than OTP may be a more ideal solution. For example, if you have a banking app, which shows account information and allows for money transfers, magic links may be to convenient and OTP may provide a better solution. you may not want to use magic links because it's too convienent and OTP may be a better option.

### Summary of steps

The following diagram summarizes the magic link flow.

<StackSnippet snippet="integratemagiclinksummary"/>

<StackSnippet snippet="integratemagiclink" />

### Disabling magic links

If you don't want to include magic links in your email authenticaton solution, you can remove its functionality by removing the link from the following email templates:

* Email Challenge
* Email Factor Verfificaiton
* Ask Bhagya for more

TBD: Show an example of modified an email template

To learn more about customizing email templates and using the velocity template language, see [Customize an email template](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Email.htm) in the Okta Help Center.

TBD: Provide link to velocity templates that describe the email temp;lates

## Integrate enrollment flow

<StackSnippet snippet="integrateenrollsummary"/>

<StackSnippet snippet="integrateenroll"/>

## Integrate challenge flow

<StackSnippet snippet="integratechallengesummary"/>

<StackSnippet snippet="integratechallenge" />

## Email customization implications with forgot password

</div>
