---
title: Custom password recovery
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

This guide shows how to customize the self-service password recovery flow using Okta's embedded solutions. Specifically, it details how you can better control your user's password recovery experience using email authentication and magic links.

---
**Learning outcomes**

* Understand the supported flows within password recovery
* Learn step-by-step how to customize your user's password recovery experience

**What you need**

* <StackSnippet snippet="orgconfigurepwdonly" />
* <StackSnippet snippet="oiesdksetup" />

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

Okta's embedded solutions allow you to customize your authentication use cases with full support for theming, branding, and extensive ways to control the user experience. This guide covers customizations for one particular use case, self-service password recovery, where an email authenticator is used to verify the user before they can reset their password.

### Two different user experiences using email

When you configure an email authenticator with password recovery, there is out-of-the-box support for two different types of user experiences: click a magic link or copy a one-time password (OTP). With the magic link experience, the user initiates the password recovery in your app, clicks on the magic link in their email, and completes the password reset using an Okta-hosted site. With OTP, the user initiates the password recovery in your app, copies the OTP from their email to your app, and completes the password reset in your app. The following diagram illustrates these two experiences:

<div class="common-image-format">

![Diagram showing two flows for password recovery](/img/advanced-use-cases/custom-pwd-recovery-no-customizations.png)

</div>

### The case for customizing the email magic link experience

The OTP experience allows for greater customization because it keeps the user within your app when performing the password reset. However, it does introduce additional friction since the user needs to copy the OTP from their email to your app. Magic links, on the other hand, provide a smoother experience by only requiring the user to click a link. However, the drawback with this experience is that it sends them to an Okta-hosted site to reset their password, which limits the branding and other customizations you can implement.

Fortunately, you can provide your users with a password recovery experience that's friction-free and customizable. In this customized experience, your users click the magic link and, instead of redirecting to an Okta-hosted site, they get sent directly to your app to reset their password. The flow looks like the following:

<div class="common-image-format">

![Diagram showing customized password recovery](/img/advanced-use-cases/custom-pwd-recovery-customizations.png)

</div>

With this customized experience, you gain better control of the user experience, keep user interactions contained as much as possible within your app, and send your users back to your app with a single click. This guide discusses the configuration changes and updates needed to make your app support this experience.

## Before you begin

Before you begin you need to:

<StackSnippet snippet="beforeyoubegin" />

## Summary of changes

To give your users this customized experience, perform the following steps:

* [Update your org to support the email authenticator with password recovery](#update-your-org)
* [Update the Forgot Password email template to point to your app](#update-the-forgot-password-email-template)
* Depending on your embedded integration solution either:
    * [Update your Sign-In Widget based app](#update-your-sign-in-widget-integration)
    * [Update your SDK based app](#update-your-sdk-integration)

## Update your org

Confirm that you have the email authenticator set up for password recovery by performing the following steps:

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, confirm you have the **Email** authenticator added to your org. If not present, add it by clicking on **Add Authenticator** and locating **Email**.
1. Find the **Password** authenticator, click on its **Actions** link, and select **Edit** in the dropdown.
1. On the **Password** page, scroll down to the rules section. Edit the **Default Rule** (or currently active rule) by clicking on its pencil icon.
1. On the **Edit Rule** page, confirm that **Email** is checked for the **Users can initiate recovery with** field.
1. If changes were made, click **Update Rule**.

## Update the Forgot Password email template

When users initiate a password recovery, they are sent an email based on the **Forgot Password** template. Variables in this template are dynamically set before the email is generated and sent to the user. By default, the magic link is set to `resetPasswordLink`, which resolves to an Okta-hosted site. Update this link to point to your app and include the `oneTimePassword` and `request.relayState` variables in the URL's query parameter. To make this update perform the following steps:

1. In the Admin Console, go to **Customizations > Emails**.
1. On the **Emails** page, find the **Password** category on the template menu.
1. Under **Password**, click **Forgot Password**.
1. On the **Forgot Password** email template page, click **Edit**.
1. On the **Edit Default Email**, do the following:
  1. In the **Message** field, locate the magic link in the field's HTML. The link is located in the `href` attribute of an `<a>` tag with the `id` of `reset-password-link`. The following snippet shows the actual placement of the `<a>` tag within the HMTL:

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

      After your updates the URL should take the following format: `http://[your app's address]?otp=${oneTimePassword}&state=${request.relayState}`.

      <StackSnippet snippet="emailtemplate" />

  1. Click **Save** and close the dialog window.


## Update your Sign-In Widget integration

The next step is to update your app to accept the link with the `otp` and `state` parameters. If you're using the Sign-in Widget, execute the following steps to make this update. If your app uses the SDK, go to [Update your SDK integration](#update-your-sdk-integration).

### Summary of steps

The following diagram illustrates the steps in the customized password recovery using a Sign-in Widget based app.


<StackSnippet snippet="siwsummary" />

<StackSnippet snippet="siw" />

## Update your SDK integration

The next step is to update your app to accept the link with the `otp` and `state` parameters. If you're using the SDK, execute the following steps to make this update. If your app uses the Sign-in Widget, go to [Update your Sign-In Widget integration](#update-your-sign-in-widget-integration).

### Summary of steps
The following diagram illustrates the steps in the customized password recovery using a SDK based app.

<StackSnippet snippet="sdksummary" />

<StackSnippet snippet="sdk" />

## See also

<StackSnippet snippet="relatedusecases" />

</div>
