---
title: User password recovery
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

> **Limited GA:** Okta Identity Engine is under Limited General Availability (LGA) and currently available only to a selected audience.

<StackSelector class="cleaner-selector"/>

This use case describes how a user would reset their forgotten password using the email factor.

## Factor setup

This use case requires the **password** and **email** factors.

<div class="common-image-format">

![Password and email factors](/img/oie-embedded-sdk/factor-password-email.png
 "Password and email factors")

</div>

This use case describes how to integrate a password recovery flow into your
app using the SDK. The flow includes an email factor step that the user needs
to verify before changing their password.

## Configuration updates

You need to complete the following configurations before you continue with this use case.

### Step 1:  Complete steps in Set up your Okta org for password factor only use cases

If not already done, complete the steps described in the
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 2:  Complete steps in Set up your Okta org (for multi-factor use cases)

If not already done, complete the steps described in the
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases) section.

### Step 3:  Reconfigure Okta application for password only

If you completed the steps in

[Set up your Okta org (for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multi-factor-use-cases),
you have set up your application for multiple factors. Ensure that the application's policy is set up for **Password + Another factor**.

1. In the Admin Console, select **Applications** > **Applications** from the
   left navigation menu.
1. On the **Applications** page, select your application.
1. On your application page, select the **Sign On** tab and scroll down to
   the **Sign On Policy** section.
1. Select the **Actions** menu icon (⋮) beside the **ENABLED** flag for the **Catch-all Rule** and select **Edit**.
1. In the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with**
   field and change its value to **Password + Another factor** if it isn't already set to that value.
1. Click **Save**.

### Step 4:  Ensure only email is only factor enabled for password recovery

1. In the Admin Console, select **Security** > **Authenticators** from the left
   navigation menu.
1. On the **Authenticators** page, click **Actions** and then **Edit** for the
   **Password** authenticator.
1. In the **Password** page, scroll down to the bottom of the page for the **Default Policy** and click
   the edit pencil icon for the **Default Rule**.
1. In the **Edit Rule** dialgo box, ensure that the following values are configured for the **AND Users can initiate recovery with** field:
   * **Phone (SMS / Voice call)**: Clear
   * **Email**: Selected
1. Click **Update Rule** if you change any values.

## Summary of steps

The following are the sequence of steps for the Facebook sign-in flow.

<StackSelector snippet="summaryofsteps" noSelector />

## Integration steps

<StackSelector snippet="integrationsteps" noSelector />

## Troubleshooting Tips

Ensure that the user is valid and that the user status is set to **Active** in your Okta org.

</div>
