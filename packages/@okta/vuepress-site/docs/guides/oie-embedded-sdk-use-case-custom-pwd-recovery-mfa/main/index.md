---
title: Custom password recovery
---

<ApiLifecycle access="ie" />

This guide shows you how to integrate  [Email Magic Links (EML)](https://www.okta.com/passwordless-authentication/#email-magic-link) into the self-service password recovery flow of your applications using Okta's embedded solutions.

---
**Learning outcomes**

* Understand the flows supported by password recovery
* Learn to customize your user's password recovery experience

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

<div class="full">

![Diagram showing two flows for password recovery](/img/advanced-use-cases/custom-pwd-recovery-no-customizations.png)

</div>

### The case for customizing the email magic link experience

The OTP experience allows for greater customization because it keeps the user within your app when performing the password reset. However, it does introduce additional friction since the user needs to copy the OTP from their email to your app. Magic links, on the other hand, provide a smoother experience by only requiring the user to click a link. However, the drawback with this experience is that it sends them to an Okta-hosted site to reset their password, which limits the branding and other customizations you can implement.

Fortunately, you can provide your users with a password recovery experience that's friction-free and customizable. In this customized experience, your users click the magic link and, instead of redirecting to an Okta-hosted site, they get sent directly to your app to reset their password. The flow looks like the following:

<div class="full">

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

Okta sends users an email based on the **Forgot Password** template when they start a password recovery. All Okta email templates are written using [Velocity Templating Language (VTL)](https://help.okta.com/en-us/Content/Topics/Settings/velocity-variables.htm) and use predefined variables to insert relevant values into that email. Okta defines three VTL variables specific to this template:

| Variable | Contains  |
| ---------------| ------------------------|
| `${oneTimePassword}`   | The one-time password Okta generated for the user |
| `${request.relayState}` | The current SAML [relaystate](https://developer.okta.com/docs/concepts/saml/#understanding-sp-initiated-sign-in-flow) value |
| `${resetPasswordLink}` | The Okta-hosted URL that continues the password recovery flow |

By default, the magic link in the template is set to `${resetPasswordLink}`. You must update it to an endpoint in your application that expects `${oneTimePassword}` and `${request.relayState}` as query parameters and uses them to continue the password recovery flow:

1. In the Admin Console, go to **Customizations > Emails**.
1. On the **Emails** page, find the **Password** category on the template menu.
1. Under **Password**, click **Forgot Password**.
1. On the **Forgot Password** email template page, click **Edit**.
1. Under **Default Email**, click **Edit**.
1. In the **Message** field, locate the magic link in the field's HTML. The link is located in the `href` attribute of an `<a>` tag with the `id` of `reset-password-link`. It looks like this:

    ```html
   <a id="reset-password-link"
      href="${resetPasswordLink}"
      style="text-decoration: none;">
      <span style="padding: 9px ...;">
         Reset Password
      </span>
      </a>
    ```

   Replace the `${resetPasswordLink}` variable with the URL for the endpoint in your application that processes the magic link. You must append the `${oneTimePassword}` and `${request.relayState}` variables as query parameter values. For example, if you're using one of the sample apps, the updated link is as follows:

   <StackSnippet snippet="emailtemplate" />

1. Click **Save** and close the dialog.

## Update your Sign-In Widget integration

Now to implement the endpoint that you linked to in the revised **Forgot Password** email template.
If you're using the Sign-In Widget, execute the following steps. If your app uses the SDK, go to [Update your SDK integration](#update-your-sdk-integration).

### Summary of steps

The following diagram shows the steps for a customized password recovery in an app that uses the Sign-In Widget.

<StackSnippet snippet="siwsummary" />

<StackSnippet snippet="siw" />

## Update your SDK integration

Now to implement the endpoint that you linked to in the revised **Forgot Password** email template. If you're using the SDK, execute the following steps. If your app uses the Sign-In Widget, go to [Update your Sign-In Widget integration](#update-your-sign-in-widget-integration).

### Summary of steps

The following diagram shows the steps for a customized password recovery in an app that uses the SDK.

<StackSnippet snippet="sdksummary" />

<StackSnippet snippet="sdk" />

## See also

<StackSnippet snippet="relatedusecases" />
