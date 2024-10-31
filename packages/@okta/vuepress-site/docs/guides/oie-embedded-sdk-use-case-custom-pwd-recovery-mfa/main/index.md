---
title: Custom password recovery
---

<ApiLifecycle access="ie" />

This guide shows you how to integrate [Email Magic Links (EML)](/docs/guides/email-magic-links-overview/main/) into the self-service password recovery flow of your apps using the Okta-embedded solutions.

---

#### Learning outcomes

* Understand the flows supported by password recovery
* Learn to customize your user's password recovery experience

#### What you need

* <StackSnippet snippet="orgconfigurepwdonly" />
* <StackSnippet snippet="oiesdksetup" />

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Overview

The Okta-embedded solutions allow you to customize your authentication use cases with full support for theming, branding, and extensive ways to control the user experience. This guide covers customizations for one particular use case, self-service password recovery, where an email authenticator is used to verify the user before they can reset their password.

> **Note**: The [Email Magic Links overview](/docs/guides/email-magic-links-overview/main/) explains the difference in user experience between using one-time passcodes and magic links.

## Before you begin

Before you begin you need to:

<StackSnippet snippet="beforeyoubegin" />

## Summary of changes

To give your users this customized experience, perform the following steps:

* [Update your org to support the email authenticator with password recovery](#update-your-org)
* [Update the Forgot Password email template to point to your app](#update-the-forgot-password-email-template)
* Depending on your embedded integration solution either:
    * [Update your Sign-In Widget based app](#update-your-sign-in-widget-integration)
    * [Update your SDK-based app](#update-your-sdk-integration)

## Update your org

Confirm that you have the email authenticator set up for password recovery by performing the following steps:

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, confirm you have the **Email** authenticator added to your org. If not present, add it by clicking **Add Authenticator** and locating **Email**.
1. Find the **Password** authenticator, click its **Actions** link, and then select **Edit** from the dropdown list.
1. On the **Password** page, scroll down to the rules section. Edit the **Default Rule** (or currently active rule) by clicking its pencil icon.
1. On the **Edit Rule** page, confirm that **Email** is checked for the **Users can initiate recovery with** field.
1. If changes were made, click **Update Rule**.

## Update the Forgot Password email template

Okta sends users an email based on the **Forgot Password** template when they start a password recovery. All Okta email templates are written using [Velocity Templating Language (VTL)](https://help.okta.com/okta_help.htm?type=oie&id=ext-velocity-variables) and use predefined variables to insert relevant values into that email. Okta defines three VTL variables specific to this template:

| Variable | Contains  |
| ---------------| ------------------------|
| `{oneTimePassword}`   | The one-time passcode Okta generated for the user |
| `{request.relayState}` | The current SAML [RelayState](https://developer.okta.com/docs/concepts/saml/#understanding-sp-initiated-sign-in-flow) value |
| `{resetPasswordLink}` | The Okta-hosted URL that continues the password recovery flow |

> **Note**: The `{oneTimePassword}` and `{request.relayState}` variables aren't supported in the **Password Reset by Admin** template. As a result, you can't use this template in the custom password recovery flow described in this guide.

By default, the magic link in the template is set to `{resetPasswordLink}`. Update it to an endpoint in your app that expects `{oneTimePassword}` and `{request.relayState}` as query parameters and uses them to continue the password recovery flow:

1. In the Admin Console, go to **Customizations > Emails**.
1. On the **Emails** page, find the **Password** category on the template menu.
1. Under **Password**, click **Forgot Password**.
1. On the **Forgot Password** email template page, click **Edit**.
1. Under **Default Email**, click **Edit**.
1. In the **Message** field, locate the magic link in the field's HTML. The link is in the `href` attribute of an `<a>` tag with the `id` of `reset-password-link`. It looks like this:

    ```html
   <a id="reset-password-link"
      href="{resetPasswordLink}"
      style="text-decoration: none;">
      <span style="padding: 9px ...;">
         Reset Password
      </span>
      </a>
    ```

   Replace the `{resetPasswordLink}` variable with the URL for the endpoint in your app that processes the magic link. Append the `{oneTimePassword}` and `{request.relayState}` variables as query parameter values. For example, if you're using one of the sample apps, the updated link is as follows:

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
