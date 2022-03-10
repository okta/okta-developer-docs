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

With the Embedded SDK, your app can verify a user's identity using the email authenticator. You can integrate the email enrollment and challenge in your app, and complete those flows using magic links and OTP Use this guide to learn how to integrate this authenticator into your app.

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

### Set up magic links

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations you have already created.
1. Click on the application you’ve previously created on the **Applications** page.
1. In the **General Settings** tab under the **General** tab, click **Edit**
1. Under **EMAIL VERIFICATION EXPERIENCE** enter a **Callback URI** for your application. This value should be a URL to your application that accepts OTP and state. The sample application uses <StackSnippet snippet="callbackuri" inline />.
1. Click **Save** to save your changes.

### You're ready to integrate

After configuring your org, you're ready to start integrating the email authenticator into your app. Start by integrating the enrollment and challenge flows with these step-by-step instructions:

* [Integrate enrollment flow](#integrate-enrollment-flow)
* [Integrate challenge flow](#integrate-challenge-flow)

These instructions use OTP to verify the email. With OTP, the user copies an automatically generated numeric string from their email to your application to verify their identity. This flow is illustrated in the following diagram:

<div class="common-image-format">

![Flowchart showing the OTP flow](/img/authenticators/authenticators-email-overview-otp-flowchart.png)

</div>

#### Discover the convenience of magic links

As an alternative to OTP, give your users the option to use magic links to complete the email verfication. Magic links is a more convienent method because it reduces emai verification down to a single step - click of an email link. See [Integrate magic links](#integrate-magic-links) for step-by-step instructions on how to integrate magic links into your app.

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

<div class="common-image-format">

![Simple diagram illustrating magic links](/img/authenticators/authenticators-email-magic-link-summary-simple-overview.png)

</div>

### Same browser same device

Magic links is made with security in mind and only works when there is a complete assurance that the person who started the request in your app is the same one who clicked on the link. For example, a user must click the magic link in the same device and browser - although different tab - from which they intiated your app's sign-in. If the browser or device is different, they can optionally use an OTP to complete the verification in the original tab. This restirction and OTP fallback is illustrated in the following flowchart.

<div class="common-image-format">

![Diagram showing nagic link flow](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>

### Same browser and device flow

The following step-by-step instructions detail how to integrate magic links into your app for the same device and browser scenario.

<StackSnippet snippet="integratemagiclinksummarysame"/>

<StackSnippet snippet="integratemagiclinksame" />

### Different browser and device flow

<StackSnippet snippet="integratemagiclinksummarydiff"/>

<StackSnippet snippet="integratemagiclinkdiff" />

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

## TODO

1. Add bhagya's comments from my notes
2. Add comments from last meeting with Jeff
3. Understand what happens if callback URI is empty
4. Update sign on policy configurations
5. Look at Bhagya's doc: https://docs.google.com/document/d/1t1HDUkXMDDEb7H1ip5WaBacDlu_j5XEy8GJHZZ5PIaE/edit and give feedback
