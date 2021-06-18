---
title: Sign in with password and email factors
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

This use case describes a user sign in with the password and email factors,

## Factor setup

This use case requires the **password** and **email** factor.

<div class="common-image-format">

![Password and email factors](/img/oie-embedded-sdk/factor-password-email.png
 "Password and email factors")

</div>

## Configuration updates

Before building out the self registration flow in your app, perform
the following steps to configure the Okta org to accept self registration
with both the password and email factors.

### Step 1:  Complete steps in Set up your Okta org for password factor only use cases

If not already done, complete the steps described in the
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 2:  Complete steps in Set up your Okta org (for multi-factor use cases)

If not already done, complete the steps described in the
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-multi-factor-use-cases) section.

### Step 3:  Ensure application is configured for password and another factor

1. In the Admin console, select **Applications > Applications** from the left
   navigation menu.
1. In the **Applications** page, click on your application.
1. In your application page, select the **Sign On** tab and scroll down to the
   **Sign on policy** section.
1. Under **Sign on Policy** select the **Actions** menu icon (⋮) beside the
   **ENABLED** flag for the **Catch-all rule** and select Edit.
   1. In the **Edit Rule** page scroll down to the
     **User must authenticate with** field and ensure it’s value is set to
     **Password + Another factor**.
   1. Click **Save** if an update was made.

### Step 4:  Ensure only Email is set as optional for authentication enrollment

1. In the Admin console, select **Security > Authenticators** from the left navigation menu.
1. In the **Authenticators** page, click on the enrollment tab..
1. Click **Edit** for the **Default Policy**.
1. In the **Edit Policy** page note the factors under **Effective Factors** and do the following:
   1. Set **Email Authentication** to Optional.
   1. Set **Phone Authentication** to **Disabled**.
1. Click **Update Policy** if a value has changed.

## Summary of steps

The sequence of steps for the Facebook sign in flow is shown below.

<StackSelector snippet="summaryofsteps" noSelector />

## Integration steps

<StackSelector snippet="integrationsteps" noSelector />

</div>
