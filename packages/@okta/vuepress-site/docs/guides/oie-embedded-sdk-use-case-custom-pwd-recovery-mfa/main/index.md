---
title: Custom password recovery
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

This guide shows you how to

This guide shows you how to customize the password recovery use case to create a tighter integration


flexible self-service recovery operations in OIE

This guide shows you how to customize the password recovery use case using Okta's embedded authentication solutions. Specifically,

---
**Learning outcomes**

* Understand the password recovery use case
* Learn how to customize your password recovery integration

**What you need**

* <StackSnippet snippet="orgconfigurepwdonly" />
* <StackSnippet snippet="oiesdksetup" />

**Sample code**

<StackSnippet snippet="samplecode" />
</br>

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

Okta's embedded solutions allow you to fully customize your user's authentication journeys with full support for theming, branding and, depending your solution, complete control of the user experience. This guide covers customizations for one particular journey, self-service password recovery, where an authenticator is used to verify the user before they can reset their password.

### Two different user experiences using email

When the email authenticator is used with password recovery, there is out of the box support for two different types of user experiences: using the magic link or one-time password (OTP). With the magic link, the user initiates the password recovery in your app, clicks on the magic link in their email, and completes the password reset using an Okta hosted site. With OTP, the user intiates the password recovery in your app, copies the OTP from their email to your app, and completes the password reset in your app. The following diagram illustrates these two experiences:

<div class="common-image-format">

![Diagram showing two flows for password recovery](/img/advanced-use-cases/custom-pwd-recovery-no-customizations.png)

</div>

### The case for customizing the email magic link experience

The OTP experience allows for greater customization because it keeps the user within your app when they make the password reset. Since the user needs to copy the OTP from email to your app, it does however, introduce additional friction to the overall experience. Magic links provides a smoother experience by only requiring the user to click a link. This experience however, sends them to an Okta hosted site to complete the password reset which limits the branding and other customizations you can implement.

Fortunately, you can provide your users with a password recovery experience that friction free and customized. When your users initiate a password recovery, they click on the magic link in their email and get sent directly to your app to complete the password reset. The flow looks like the following:

<div class="common-image-format">

![Diagram showing customized password recovery](/img/advanced-use-cases/custom-pwd-recovery-customizations.png)

</div>

With this customized password recovery experience, you gain better control of the user experience, keep user interactions contained as much as possible within your app, and have your users back to your app with a single click. This guide discusses the configuration changes and updates needed to make to your app support this experience.

## Before you begin

Before you begin you need to:

* Create and Okta org and configure it as described in <StackSnippet snippet="orgconfigurepwdonly" inline/>.
* Build an app with the Embedded Sign-in Widget or SDK.
  * For Sign-in Widget based apps, implement [Basic sign-in flow](docs/guides/oie-embedded-widget-use-case-basic-sign-in/nodejs/main/).
  * For SDK based apps, implement [User Password Recovery](docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/nodejs/main/).

## Summary of changes

To give your users this customized experience, perform the following steps:

* [Update your org to support email authentication during password recovery](#update-your-org)
* [Update the Forgot Password email template to point to your app](#update-the-forgot-password-email-template)
* Depending on your embedded integration solution either:
    * [Update your Sign-In Widget based app](#update-your-app-with-the-embedded-sign-in-widget)
    * [Update your SDK based app](#update-your-app-with-the-embedded-sdk)

## Update your org

Confirm that you have the email authenticator setup for password recovery by performing the following steps:

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, confirm you have the **Email** authenticator added to your org. If not present, add it by clicking on **Add Authenticator** and locating **Email**.
1. Open the **Email** authenticator and note the value of **
1. The **Password** authenticator and click on its **Actions** menu and select **Edit**.
1. On the **Password** page, scroll down to the rules section click and edit the **Default Rule** (or currently active rule) by clicking the pencil icon.
1. On the **Edit Rule** page, confirm that **Email** is checked for the **Users can initiate recovery with** field.
1. If changes were made, click **Update Rule**

## Update the Forgot Password email template

When the user selects the email authenticator during the password recovery flow, the receive an email based on the **Forgot Password** email template. This template contains variables the dynmaically set the reset password link, one-time password, and other values in the generated email. Update the link in this template to point to your app and include the OTP and relay state variable. To update the template execute the following steps:

1. In the Admin Console, go to **Customizations > Emails**.
1. On the **Emails** page, find the **Password** category on the template menu.
1. Under **Password**, click **Forgot Password**.
1. On the **Forgot Password** email template page, click **Edit**.
1. On the **Edit Default Email**, do the following:
  1. In the **Message** field, locate the reset password link in the field's HTML. The link is located in the `href` attribute of an `<a>` tag with the `id` of `reset-password-link`.  The following snippet shows the actual placement of the `<a>` tag within the HMTL:

      ```html
      <a id="reset-password-link" href="${resetPasswordLink}" style="text-decoration: none;">
        <span style="padding: 9px ...;">
          Reset Password
        </span>
      </a>
      ```

  1. The default value of the `href` attribute is `${resetPasswordLink}`. Change this value to a URL that points to your app and include the following two query parameters with their corresponding template variables:

      | Query parameter| Template variable       |
      | ---------------| ------------------------|
      | otp            | *${oneTimePassword}*    |
      | state          | *${request.relayState}* |


      <StackSnippet snippet="emailtemplate" />

  1. Click **Save**, to save the changes and close the dialog window.


### Update your Embedded Sign-In Widget integration

<StackSnippet snippet="siw" />

### Update your Embedded SDK integratino

<StackSnippet snippet="sdk" />

</div>
