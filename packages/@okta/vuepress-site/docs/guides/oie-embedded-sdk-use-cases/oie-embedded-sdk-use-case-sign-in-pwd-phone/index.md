---
title: Sign in with password and phone factors
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>


<StackSelector class="cleaner-selector"/>

This use case describes a user sign-in flow with the password and phone factors.

## Factor setup

This use case requires the **password** and **phone** factors.

<div class="common-image-format">

![Password and phone factors](/img/oie-embedded-sdk/factor-password-phone.png
 "Password and phone factors")

</div>

## Configuration updates

Before you build a sign-in flow with password and phone factors, you need to configure the Okta org to accept both factors in your app:

### Step 1: Set up your Okta org for a password factor

Ensure your org is configured for the password factor by completing the steps in [Update the authenticators for password factor only use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#update-the-authenticators-for-password-factor-only-use-cases).

### Step 2: Set up your Okta org for multifactor use cases

Ensure your org is configured for multifactor use cases by completing the steps in [Set up your Okta org for multi-factor use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases).

> **Note:** Ensure your app integration is configured to use **Password + Another factor** in the app integration's **Sign On Policy** rule section.

### Step 3: Set phone as optional for authentication enrollment

1. In the Admin console, go to **Security** > **Authenticators**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. In **Default Policy**, click **Edit**.
1. In the **Edit Policy** dialog box, note the factors under **Effective Factors** and do the following:
   * Set **Email Authentication** to **Disabled**.
   * Set **Phone Authentication** to **Optional**.
1. Click **Update Policy** if a value has changed.

<StackSelector snippet="summaryofsteps" noSelector />

<StackSelector snippet="integrationsteps" noSelector />

</div>
