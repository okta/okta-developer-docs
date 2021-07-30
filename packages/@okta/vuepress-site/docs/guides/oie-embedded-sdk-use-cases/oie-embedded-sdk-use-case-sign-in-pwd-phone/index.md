---
title: Sign in with password and phone factors
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>


<StackSelector class="cleaner-selector"/>

This use case describes a user sign-in with the password and phone factors.

## Factor setup

This use case requires the **password** and **phone** factors.

<div class="common-image-format">

![Password and phone factors](/img/oie-embedded-sdk/factor-password-phone.png
 "Password and phone factors")

</div>

## Configuration updates

Before you build the self-registration flow in your app, configure the Okta org to accept self-registration with both the password and phone factors by performing the following steps.

### Step 1: Set up your Okta org for password factor only use cases

If not already done, complete the steps described in [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 2: Set up your Okta org (for multi-factor use cases)

If not already done, complete the steps described in [Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases) section.

### Step 3: Ensure application is configured for password and another factor

1. In the Admin Console, select **Applications** > **Applications** from the left-hand navigation pane.
1. In the **Applications** page, select your application.
1. On your application page, select the **Sign On** tab and scroll down to the **Sign On Policy** section.
1. Click the actions menu icon (⋮) beside the **ENABLED** flag for the **Catch-all Rule** and select Edit.
   1. In the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with** field and ensure the value is set to **Password + Another factor**.
   1. Click **Save** if an update was made.

### Step 4: Ensure only phone is set as optional for authentication enrollment

1. In the Admin console, select **Security** > **Authenticators** from the left-hand navigation pane.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. In **Default Policy**, click **Edit**.
1. In the **Edit Policy** dialog box, note the factors under **Effective Factors** and do the following:
   1. Set **Email Authentication** to **Disabled**.
   1. Set **Phone Authentication** to Optional.
1. Click **Update Policy** if a value has changed.

<StackSnippet snippet="summaryofsteps" noSelector />

<StackSnippet snippet="integrationsteps" noSelector />

</div>
