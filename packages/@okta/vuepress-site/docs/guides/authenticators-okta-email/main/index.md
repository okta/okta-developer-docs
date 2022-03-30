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

* Configure your Okta org to use the email authenticator.
* Enroll and challenge a user with email OTP and magic links.
* Enable OTP only for the email authenticator.

</br>

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />  <!-- UNIQUE FOR EACH LANGUAGE  -->

---

## Overview

With the Embedded SDK, your app can verify a user's identity using the email authenticator. You can integrate the email enrollment and challenge in your app and complete those flows using magic links, OTP, or a combination of both. Use this guide to learn how.

### Discover the convenience of magic links

When using OTP, a user must switch from your app to their email, find the OTP, switch back to your app again, type in the OTP and click submit to verify their identity. Compare this to using magic links, where verification only requires the user to click a link in the email - a far quicker, more user-convenient, and yet still secure experience.

<div class="common-image-format">

![Simple diagram illustrating magic links](/img/authenticators/authenticators-email-magic-link-summary-simple-overview.png)

</div>

## Get started

This guide walks you through the email authenticator user journeys for both magic links and OTP and details how to integrate the email enrollment and challenge flows into your app. For more details, see the following sections in this guide:

**Magic links**

1. [Understand the magic link flow before you integrate](#understand-the-magic-link-flow): Learn the magic link user journey.
1. [Know which use cases support magic link and OTP](#know-which-use-cases-support-magic-link-and-otp): Understand magic link and OTP support across the supported use cases.
1. [Update configurations](#update-configurations): Set up your org to enable the email authenticator and magic links.
1. [Integrate email challenge with magic links](#integrate-email-challenge-with-magic-links): Integrate email challenge using magic links with step-by-step instructions.
1. [Integrate different browser and device scenario with magic links](#integrate-different-browser-and-device-scenario-with-magic-links): Integrate the different browser and device scenarios with step-by-step instructions.

**OTP**

1. [Integrate email enrollment with OTP](#integrate-email-enrollment-with-otp): Integrate email enrollment using OTP with step-by-step instructions.
1. [Enable only OTP for the email authenticator](#enable-only-otp-for-the-email-authenticator): Update the email templates to only support OTP.

**Advanced use cases**

1. [Design considerations when customizing magic link for password recovery](#design-considerations-when-customizing-magic-link-for-password-recovery): Learn about recommended magic link implementations for specific customized password recovery solutions.

## Understand the magic link flow

Before integrating email magic links in your app, it's important to understand how your app's user journey starts and ends. An example user journey for a sign-in with email use case:

1. Using your app, a user submits their username and password. Next, an email is sent to the user and your app displays an OTP input page.
1. Using a new tab in the browser, the user opens their email and clicks the magic link.
1. In a new tab, the link redirects the browser to your app and automatically signs the user in.

The following diagram illustrates these steps.

<div class="common-image-format">

![Diagram showing magic link flow for same and different browsers](/img/authenticators/authenticators-email-magic-link-summary-user-flow-overview.png)

</div>

> **Note:** The user stays within the same browser when they start the sign-in flow and clicks the magic link in their email.

### The reason for the OTP input page

Your app should always display an OTP input page to allow the user to use the OTP as an alternative method to complete the verification. For security reasons, the user must use an OTP when they access their email on a different browser or device. See [Integrate different browser and device scenario](#integrate-different-browser-and-device-scenario-with-magic-links) to learn how to handle this scenario and [Integrate email enrollment with OTP](#integrate-email-enrollment-with-otp) to integrate OTP in your application.

## Know which use cases support magic link and OTP

Out of the box, the Embedded SDK solution supports the Email Magic Link feature for various use cases. For those use cases where the feature isn't fully supported, OTP is available. See the following support matrix for more details:

| Email template name  | Use cases  | Email authenticator flow  | Supported methods | Template customizations needed |
| ----------------------------| ------------------|------------------------|-------------|-------------------------|
| Email Factor Verification   | Self-service registration, Sign-in with email - enroll   | Email enrollment  | [OTP](#integrate-email-enrollment-with-otp)              | Yes, remove magic link
| Email Challenge             | Sign-in with email - challenge                           | Email challenge   | [Magic link](#integrate-email-challenge-with-magic-links), OTP  | No
| Forgot Password             | Self-service password recovery                           | Email challenge   | [Magic link](#integrate-email-challenge-with-magic-links), OTP  | Yes, add `otp` and `state` parameters. See <StackSnippet snippet="custompwdguide" inline />.

> **Note:** This guide uses the sign-in with email use cases to describe how to integrate email enrollment and challenge.


## Update configurations

Before you can start using the email authenticator, you need to enable it in your Okta org and assign it an authentication policy that requires the email authenticator.

### Add the email authenticator to your org

First, add the email authenticator to your org and enable it for both authentication and recovery.

1. Open the **Admin Console** for your org.
2. Choose **Security > Authenticators** to show the available authenticators.
3. If the **Email** authenticator isn’t in the list:
   1. Click **Add Authenticator**.
   2. Click **Add** on the **Email** tile.
   3. Select the **Authentication and recovery** option, and then click **Save**.

   If the **Email** authenticator is in the list:
   1. Click the **Actions** menu for the **Email** authenticator.
   2. Click **Edit**.
   3. Select the **Authentication and recovery** option, and then click **Save**.
4. Select the **Enrollment** tab.
5. Check that **Email** is set to either **Optional** or **Required** in the **Eligible Authenticators** section of the Default Policy.
   1. If **Email** is set to **Disabled**, click **Edit** for the Default Policy.
   2. Select **Optional** from the dropdown list for the **Email** authenticator, and then click **Update Policy**.

### Set your app integration to use the email authenticator

New app integrations are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup. In production, multiple app integrations can share the same application policy. In testing however, it's recommended that you create a new policy specifically for your test application.

1. Open the **Admin Console** for your org.
2. Choose **Security > Authentication Policies** to show the available authentication policies.
3. Click **Add a Policy**.
4. Give the policy a name, and then click **Save**.
5. Locate the Catch-all Rule of the new policy and select **Actions > Edit**.
6. Select **Allowed after successful authentication**.
7. Set **User must authenticate with** to **Password + Another factor**.
8. For **Possession factor constraints**:
   1. Verify that **Device Bound** isn’t selected.
   2. Verify that **Email** is listed in the box under **Additional factor types**. If it isn't listed, verify that the authenticator is enabled using steps 4 and 5 of [Add the email authenticator to your org](#add-the-email-authenticator-to-your-org).
   3. Click **Save**.

9. Select the **Applications** tab for your newly created policy, and then click **Add App**.
10. Find your app in the list and click **Add** next to it.
11. Click **Close**.
12. Verify that the app is now listed in the **Applications** tab of the new policy.

### Set up magic links

Enable magic links in your org.

1. Open the **Admin Console** for your Okta org.
2. Choose **Applications > Applications** to show the app integrations that you have already created.
3. Click on the application that you previously created.
4. In the **General Settings** section on the **General** tab, click **Edit**.
5. Under **EMAIL VERIFICATION EXPERIENCE** enter a callback URI for your application. The sample application uses <StackSnippet snippet="callbackuri" inline />.
6. Click **Save** to save your changes.

<StackSnippet snippet="integratechallengemagiclinksummary"/>

<StackSnippet snippet="integratechallengemagiclink" /> <!-- UNIQUE FOR BACKEND  -->

## Integrate different browser and device scenario with magic links

The Email Magic Links feature is designed with security in mind and only works when there is complete assurance that the person who started the request is the same one who clicked the magic link. For example, a user who started signing in to your app in a web browser must be in the same browser when they click the magic link. If the user's browser or device is different, the magic link is disabled, and they need to use OTP or return to the original browser to complete the email verification. The following flowchart illustrates this logic.

<div class="common-image-format">

![Diagram showing magic link flow for same and diff browsers](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>

<StackSnippet snippet="integratediffbrowserdevicesummary"/> <!-- UNIQUE FOR EACH LANGUAGE -->

<StackSnippet snippet="integratediffbrowserdevice" /> <!-- UNIQUE FOR EACH LANGUAGE -->

<StackSnippet snippet="integrateenrollmagiclinksummary"/> <!-- UNIQUE FOR EACH LANGUAGE -->

<StackSnippet snippet="integrateenrollmagiclink"/> <!-- UNIQUE FOR EACH LANGUAGE  -->

<StackSnippet snippet="integrateenrollotpsummary"/> <!-- UNIQUE FOR EACH LANGUAGE  -->

<StackSnippet snippet="integrateenrollotp" /> <!-- UNIQUE FOR EACH LANGUAGE  -->

## Enable only OTP for the email authenticator

Magic links is a secure way to verify users' emails. However, you may want to use only OTP to provide an even higher level of security that positively proves that the person who started the request is the same person reading the email. In this case, OTP may be a more compatible solution. For example, if you have a banking app, which shows account information and allows for money transfers, magic links may be too convenient, and OTP may provide a better solution.

To disable magic link functionality, open the Admin Console and select **Customizations > Emails**. Now remove the links from the following email templates:

* Other > Email Challenge
* Other > Email Factor Verification
* Password > Forgot password

In each template, find the anchor tag and remove it from the template HTML. The following screenshot identifies the magic link anchor tag (identified by `email-authentication-button` id) for the **Email Challenge** template.

<div class="common-image-format">

![Diagram showing email template with magic link](/img/authenticators/authenticators-email-magic-link-modify-template.png)

</div>

To learn more about customizing email templates and using the velocity template language, see [Customize an email template](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Email.htm) in the Okta Help Center.

</div>

<StackSnippet snippet="designconsiderationscustompasswordrecovery"/>  <!-- MOSTLY SHARED FOR BACKEND -->

## See also

<StackSnippet snippet="seealso" /> <!-- UNIQUE FOR EACH LANGUAGE  -->
