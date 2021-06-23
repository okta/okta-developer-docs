---
title: Self registration
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

Self-service registration allows users to sign up for your app themselves.
In this use case, we require the user to register with the password and email or SMS factors. To enable self-service registration, perform the
following steps:

1. Enable the self-service registration option for your app in the Okta org.
1. Build the self-service registration flow in your app.

## Factor setup

This use case requires the password and either the email
or the phone factor.

<div class="common-image-format">

![Password and email factors](/img/oie-embedded-sdk/factor-password-email-or-phone.png
 "Password and email factors")

</div>

## Configuration updates

Before building the self-registration flow in your app, perform the
following steps to configure the Okta org to accept self registration with
the password, email, and or phone factors.

### Step 1: Complete steps in Set up your Okta org for password factor only use cases

If not already done, complete the steps described in the
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases) section.

### Step 2: Complete steps in Set up your Okta org (for multi-factor use cases)

If not already done, complete the steps described in the
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multi-factor-use-cases) section.

### Step 3: Update the profile enrollment default policy

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
1. From the Profile Enrollment page, click the pencil icon
   next to the Default Policy.
1. From the Default Policy page, select the **Actions** menu icon (⋮) beside
   the **ENABLED** flag for the rule under **Enrollment Settings**.
1. In the **Edit Rule** dialog box, select **Allowed** in the **For new users** section for the **Sign up**
      field.
1. Click **Save**.

> **Note:** See [Create a Profile Enrollment policy for self-registration](https://help.okta.com/en/oie/Content/Topics/identity-engine/policies/create-profile-enrollment-policy-sr.htm).

### Step 4: Confirm org application is assigned to everyone

1. In the Admin Console, select **Applications** > **Applications** from the left
   navigation menu.
1. On the **Applications** page, select your application.
1. On your application page, select the **Assignments** tab.
1. From the left, click the **Groups** filter.
1. Confirm that the **Everyone** group appears in the Assignment list.

### Step 5: Reconfigure application for email and optional phone factors

1. In the Admin Console, select **Applications** > **Applications** from the left
   navigation menu.
1. On the **Applications** page, select your application.
1. On your application page, select the **Sign On** tab and scroll down to the
   **Sign On Policy** section.
1. Select the **Actions** menu icon (⋮) beside the **ENABLED** flag for the **Catch-all Rule** and select **Edit**.
1. In the **Edit Rule** dialgo box, scroll down to the **AND User must authenticate with** field and change its value to **Password + Another factor.**
1. Click **Save**.

### Step 6:  Ensure both Email and Phone factors are set as optional for authentication enrollment

1. In the Admin console, select **Security** > **Authenticators** from the left navigation menu.
1. On the **Authenticators** page, click the **Enrollment** tab.
1. Click **Edit** for the **Default Policy**.
1. In the **Edit Policy** dialog box, note the factors under **Effective factors** and do the following:
   * Set **Email Authentication** to **Optional**.
   * Set **Phone Authentication** to **Optional**.
1. Click **Update Policy**.

## Summary of steps

The sequence of steps for self-service registration is described in the following three sequence diagrams:

<StackSelector snippet="summaryofsteps" noSelector />

## Integration steps

<StackSelector snippet="integrationsteps" noSelector />


</div>
