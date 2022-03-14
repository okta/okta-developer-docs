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

With the Embedded SDK, your app can verify a user's identity using the email authenticator. You can integrate the email enrollment and challenge in your app and complete those flows using magic links and OTP. Use this guide to learn how.

### Discover the convenience of magic links

Although magic links is the preferred method,  both it and OTP are supported out of the box. A user performs one action with magic links - a click on an email link - to complete the email verification. The experience is less choppy than OTP, where a user must switch between their email and your app to find and submit the OTP. Because of this, magic links is a balance of security and convenience and provides a frictionless experience for your users.

<div class="common-image-format">

![Simple diagram illustrating magic links](/img/authenticators/authenticators-email-magic-link-summary-simple-overview.png)

</div>

This guide includes step-by-step instructions on integrating magic links in your app.

## Get started

Before integrating the email authenticator in your app, learn the magic link user journey and update your org to support the email authenticator. This guide walks you through these prerequisites before guiding you through step-by-step instructions of the supported flows.

1. [Understand magic link flow before you integrate](#understand-the-magic-link-flow): Understand the magic link flow before you integrate the email authenticator
1. [Update Configurations](update-configuration): Set up your org for the email authenticator
1. [Integrate email enrollment](#integrate-email-enrollment): Integrate step-by-step email enrollment using magic links
1. [Integrate email challenge](#integrate-email-challenge): Integrate step-by-step email challenge using magic links
1. [Integrate different browser and device scenario](#integrate-different-browser-and-device-scenario): Integrate the different browser and device scenarios in your app
1. [Integrate the email authenticator using OTP](#integrate-the-email-authenticator-using-otp): Integrate the OTP method to verify email in your app

 > **Note:** This guide uses authentication use cases to describe how to integrate the email authenticator. The email authenticator also supports [password recovery](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa) and the integration is nearly identical.

Learn also about the following:

1. [Enable only OTP for the email authenticator](/#enable-only-otp-for-the-email-authenticator): Update the email templates to only support OTP
1. [Design considerations when customizing magic link for password recovery](#design-considerations-when-customizing-magic-link-for-password-recovery): Learn about the design considerations when customizing magic link for password recovery

## Understand the magic link flow

Before integrating the email authenticator in your app, you need to understand how the user, the magic link, and your app interact within the browser. The steps are as follows:

1. The user attempts a sign-in. Okta sends an email, and your app displays an OTP input page
2. Using a new tab in the browser, the user opens their email and clicks on the magic link.
3. Your app opens in another new tab and automatically signs the user in.

Note that the user stays within the same browser when they initiate the sign-in and click on the magic link. The following diagram illustrates these steps.

<div class="common-image-format">

![Diagram showing magic link flow for same and different browsers](/img/authenticators/authenticators-email-magic-link-summary-user-flow-overview.png)

</div>

### Display the OTP input page

In the first step, your app displays the OTP input page to allow the user to use the OTP as an alternative method to complete the verification. For security reasons, the user is required to use OTP when they check their email on a different browser or device. See [Integrate different browser and device scenario](#integrate-different-browser-and-device-scenario) to learn how to handle this scenario and [Integrate the email authenticator using OTP](#integrate-the-email-authenticator-using-otp) to learn how to integrate OTP in your application.

## Update configurations

Before you can start using the email authenticator, you need to enable it in your Okta org.

### Add the email authenticator to your org

1. Open the Admin Console for your org.
1. Choose **Security > Authenticators** to show the available authenticators.
1. Locate the **Email** authenticator in the list. The **Email** authenticator is added by default for new orgs, but if it doesn't exist, use **Add Authenticator** to add it.
1. Find the **Email** authenticator in the list. If it doesn't exist, click on **Add Authenticator** to add it.
1. For the **Email** Authenticator, click on the **Actions** menu and then click **Edit**.
1. Select **Authentication and recovery** for **This authenticator can be used for**. Changing the value to **Authentication and recovery**  allows email for sign-ins and password recoveries.
1. Click **Save** to save your changes.

### Setup your application to use the email authenticator

#### Add new authentication policy

1. Open the Admin Console for your org.
1. Choose **Security > Authentication Policies** to show the authentication policies for your org.
1. Click on **Add a Policy**.
1. In the **Add Authentication Policy** dialog window, enter a policy name (for example, "2FA Policy) and description.
1. Click **Save** to save the new policy.
1. In the new rule page, click **Add rule**
1. Enter a name for the new rule (for example, "2FA Rule").
1. Set **User must authenticate with** to **Password+Another Factor**.
1. Confirm **Your org's authenticators that satisfy this requirement** is set to **Password AND Email or ...**
1. Click **Save**.

#### Assign authentication policy to your app

1. Choose **Applications > Applications** to show the list of app integrations
1. Click on the application integration you want to use for this guide
1. Switch to the **Sign-On** tab
1. Scroll down to the **User authentication** section and click **Edit**.
1. For the **Authentication policy**, select the new authentication policy you created in the last step.
1. Click **Save**.

### Set up callback URI for magic links

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations you have already created.
1. Click on the application you’ve previously created on the **Applications** page.
1. In the **General Settings** tab under the **General** tab, click **Edit**
1. Under **EMAIL VERIFICATION EXPERIENCE** enter a **Callback URI** for your application. This value should be a URL to your application that accepts OTP and state. The sample application uses <StackSnippet snippet="callbackuri" inline />.
1. Click **Save** to save your changes.

## Integrate email enrollment

The following step-by-step instructions detail integrating the email enrollment into your app.

<StackSnippet snippet="integrateenrollsummary"/>

<StackSnippet snippet="integrateenroll"/>

## Integrate email challenge

The following step-by-step instructions detail integrating the email challenge into your app.

<StackSnippet snippet="integratechallengesummary"/>

<StackSnippet snippet="integratechallenge" />

## Integrate different browser and device scenario

Magic links is made with security in mind and only works when there is complete assurance that the person who started the request is the same one who clicked on the magic link. For example, a user who started a sign-in in your app in one browser must be on the same browser when they click on the magic link. If the browser or device is different, magic links is disabled, and they need to use OTP or be in the same browser to complete the email verification. The following flowchart illustrates this logic.

<div class="common-image-format">

![Diagram showing nagic link flow for same and diff browsers](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>

The following step-by-step instructions detail how to integrate the different browser scenario. Even though the instructions use the email challenge example, handling this scenario in the email enrollment is nearly identical.

<StackSnippet snippet="integratediffbrowserdevicesummary"/>

<StackSnippet snippet="integratediffbrowserdevice" />

## Integrate the email authenticator using OTP

These instructions use OTP to verify the email. With OTP, the user copies an automatically generated numeric string from their email to your application to verify their identity. The following diagram illustrates this flow.

<div class="common-image-format">

![Flowchart showing the OTP flow](/img/authenticators/authenticators-email-overview-otp-flowchart.png)

</div>

The following step-by-step instructions detail how to integrate the OTP flow. Even though the instructions use the email challenge example, integrating OTP in the email enrollment is nearly identical.

<StackSnippet snippet="integratechallengeotpsummary"/>

<StackSnippet snippet="integratechallengeotp" />

## Enable only OTP for the email authenticator

Magic links is a secure way to verify users' emails. However, you may want to use only OTP to provide an even higher level of security that positively proves that the person who started the request is the same person reading the email. In this case, OTP may be a more compatible solution. For example, if you have a banking app, which shows account information and allows for money transfers, magic links may be too convenient, and OTP may provide a better solution.

To disable magic link functionality, remove the links from the following email templates:

* Email Challenge
* Email Factor Verification
* Forgot password

In each template, find the anchor tag and remove it from the template HTML. The following screenshot identifies the magic link anchor tag (identified by `email-authentication-button` id) for the **Email Challenge** template.

<div class="common-image-format">

![Diagram showing email template with magic link](/img/authenticators/authenticators-email-magic-link-modify-template.png)

</div>

To learn more about customizing email templates and using the velocity template language, see [Customize an email template](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Email.htm) in the Okta Help Center.

</div>

## Design considerations when customizing magic link for password recovery

### Overview

If you have a customized self-service password recovery experience as described in the [Custom password recovery guide](docs/guides/oie-embedded-sdk-use-case-custom-pwd-recovery-mfa/nodeexpress/main/), you need to consider your design if you've also initiate password recoveries using the [/forgot_password API](). Specifically, your design has the following attributes:

* The magic link `href` attribute in the **Forgot Password** template has been updated to replace the `${resetPasswordLink}` variable with a URL string containing the `otp` and `state` parameters using the `${oneTimePassword}` and `${request.relayState}` variables. An example of the URL string: `http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}`.

* Besides the self-service password recovery where the user initiates the [password recovery using the Embedded SDK](docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/android/main/), your system also supports password recoveries using other methods. These methods include calling the [/forgot_password API](/docs/reference/api/users/#forgot-password) with the `sendEmail` parameter sent to `true` or also using the Embedded Sign-in Widget to initiate password recoveries. These methods send an email to the user with a magic link meant to continue the password recovery.

### Considerations
In this design, the other password recovery methods (for example, /forgot_password API
In these other password recovery methods,  the `${oneTimePassword}` variable in the recovery email resolves to an empty string because the user did not initiate the recovery through the Embedded SDK. When the user clicks on the link and redirects to your app, the `otp` value is missing, and your app cannot complete the password reset using the Embedded SDK. As a result, you have two available options:

#### Option 1: Use `resetPasswordLink` variable

In this option you set the magic link in the **Forgot Password** template to use the `${resetPasswordLink}` variable or include logic to only set it to `${resetPasswordLink}` when `${oneTimePassword}` is empty.

```velocity
#if(${oneTimePassword})
    <a id="reset-password-link" href="http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}">
    ...
#else
    <a id="reset-password-link" href="${resetPasswordLink}" style="text-decoration: none;">
    ...
```

> **Note:** Using `${resetPasswordLink}` sends the user to an Okta hosted page to complete the sign-in. If your looking for a fully branded experience where you control the page experience, then [Option 2]() is a better alternative.

#### Option 2 (Recommended): Use your own infrastructure to send the password recovery email

In this option, make a call to [/forgot_password API](/docs/reference/api/users/#forgot-password) and use your own infrastructure to notify the user to reset their password. Specifically, do the following:

1. Call [/forgot_password API](/docs/reference/api/users/#forgot-password) with `sendEmail` equal to `false`. Instead of sending a recovery email to the user, `sendEmail=false` returns a URL with a recovery token.

```json
{
  "resetPasswordUrl": "https://${yourOktaDomain}/signin/reset-password/XE6wE17zmphl3KqAPFxO"
}
```

In the above example, the recovery token is `XE6wE17zmphl3KqAPFxO`. Parse out this token and send it using your infrastructure via an out-of-band channel to the end user's verified email address or SMS phone number. See [Authentication API - Recovery Token](docs/reference/api/authn/#recovery-token) for more information on recovery tokens.
