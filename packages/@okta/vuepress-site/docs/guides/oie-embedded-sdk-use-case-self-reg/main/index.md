---
title: Self-service registration
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

Self-service registration allows users to sign up for the app themselves. In this use case, the user must register with a password and email or SMS factors.

To enable self-service registration:

1. Enable the self-service registration option for your app in the Okta org.
1. Build the self-service registration flow in your app.

This use case requires the password and either the email or the phone factor.

<div class="common-image-format">

![Password and email factors](/img/oie-embedded-sdk/factor-password-email-or-phone.png)

</div>

## Configuration updates

Before you can build the self-registration flow in your app, you must configure the Okta org to accept self-registration with the password, email, and/or phone factors.

Before you begin:

* If not already done, complete the steps in [Set up your Okta org for password factor only use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

* If not already done, complete the steps in [Set up your Okta org for multifactor use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases).

### 1: Update the profile enrollment default policy

1. In the Admin Console, select **Security** > **Profile Enrollment** from the left-hand navigation pane.
1. On the **Profile Enrollment** page, click the pencil icon next to the Default Policy.
1. On the **Default Policy** page, under **Enrollment Settings**, click the actions menu icon (⋮) beside the **ENABLED** flag for the rule and select **Edit**.
1. In the **Edit Rule** dialog box, under the **For new users** section, select **Allowed** in the **Sign-up** field.
1. Click **Save**.

> **Note:** See [Create a Profile Enrollment policy for self-registration](https://help.okta.com/en/oie/Content/Topics/identity-engine/policies/create-profile-enrollment-policy-sr.htm).

### 2: Configure your app for email and phone factors

1. In the Admin Console, select **Applications** > **Applications** from the left-hand navigation pane.
1. On the **Applications** page, select your application.
1. On your application page, select the **Assignments** tab.
1. From the left, click the **Groups** filter.
1. Confirm that the **Everyone** group appears in the Assignment list.
1. Select the **Sign On** tab and scroll down to the **Sign On Policy** section.
1. Click the actions menu icon (⋮) beside the **ENABLED** flag for the **Catch-all Rule** and select **Edit**.
1. In the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with** field and change the value to **Password + Another factor**.
1. Click **Save**.

### 3: Verify that Email and Phone factors are set as optional enrollment factors

1. In the Admin console, select **Security** > **Authenticators** from the left-hand navigation pane.
1. On the **Authenticators** page, click the **Enrollment** tab.
1. In **Default Policy**, click **Edit**.
1. In the **Edit Policy** dialog box, note the factors under **Effective factors** and do the following:
   * Set **Email Authentication** to **Optional**.
   * Set **Phone Authentication** to **Optional**.
1. Click **Update Policy**.

## Summary of steps

<StackSelector snippet="summaryofsteps" noSelector />

## Integration steps

<StackSelector snippet="integrationsteps" noSelector />

</div>
