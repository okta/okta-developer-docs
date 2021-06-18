---
title: User password recovery
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

This use case describes how a user would reset their forgotten password with the email factor.

## Factor setup

This use case requires the **password** and **email** factor.

<div class="common-image-format">

![Password and email factors](/img/oie-embedded-sdk/factor-password-email.png
 "Password and email factors")

</div>

The use case describes how to integrate a password recovery flow in your
app using the SDK. The flow includes an email factor step that the user needs
to verify before changing their password.

## Configuration updates

The following configurations need to be completed before continuing with this use case.

### Step 1:  Complete steps in Set up your Okta org for password factor only use cases

If not already done, complete the steps described in the
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 2:  Complete steps in Set up your Okta org (for multi-factor use cases)
If not already done, complete the steps described in the
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-multi-factor-use-cases) section.


### Step 3:  Reconfigure Okta application for password only

If you completed the steps in
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-multi-factor-use-cases),
you have set up your application for multiple factors. Ensure the application’s
policy is setup for **Password + Another factor**.

1. In the Admin console, select **Applications > Applications** from the
   left navigation menu.
1. In the **Applications** page, click on your application.
1. In your application page, select the **Sign On** tab and scroll down to
   the **Sign on** policy section.
1. Under **Sign on Policy** select the **Actions** menu icon (⋮) beside the
   **ENABLED** flag for the **Catch-all** rule and select Edit.
1. In the **Edit Rule** page scroll down to the **User must authenticate with**
   field and change it’s value to **Password + Another factor** if it is not
   already set to that value.
1. Click **Save**.

### Step 4:  Ensure only email is only factor enabled for password recovery

1. In the Admin console, select **Security > Authenticators** from the left
   navigation menu.
1. In the **Authenticators** page, click on **Actions** and **Edit** for the
   **Password** authenticator.
1. In the **Password** page, scroll down on the **Default Policy** and click
   the edit pencil icon for the **Default rule**.
1. In the **Edit Rule** page, ensure the following values are checked for the
   **Users can initiate recovery** with field:
   1. **Phone (SMS / Voice call)** is unchecked.
   1. **Email** is checked.
   1. Click the **Update rule** button if any values have changed.

## Summary of steps

The sequence of steps for the Facebook sign in flow is shown below.

<StackSelector snippet="summaryofsteps" noSelector />

## Integration steps

<StackSelector snippet="integrationsteps" noSelector />

## Troubleshooting Tips

Ensure the user is valid and it’s status is **Active** in your Okta org

</div>
