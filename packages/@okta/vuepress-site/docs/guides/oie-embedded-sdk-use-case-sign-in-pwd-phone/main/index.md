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

Before you build a sign-in flow with password and phone factors, you need to configure the Okta org to accept both factors in your app. See [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) to configure your app and Okta org for this use case.

<<<<<<< HEAD
### Step: Set up your Okta org for a password factor

Ensure your org is configured for the password factor by completing the steps in [Update the authenticators for password factor only use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#update-the-authenticators-for-password-factor-only-use-cases).

### Step: Set up your Okta org for multifactor use cases

Ensure your org is configured for multifactor use cases by completing the steps in [Set up your Okta org for multi-factor use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases).

> **Note:** Ensure your app integration is configured to use **Password + Another factor** in the app integration's **Sign On Policy** rule section.

### Step: Set the phone factor as optional for authentication enrollment
=======
### Set phone as optional for authentication enrollment

The instructions in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) enables both email and phone factors as optional for enrollment. For this use case, you need to enable the phone factor as optional and disable the email factor.
>>>>>>> 9c5aeda3289e2cb6ba7230a94a5cb13e55b33603

1. In the Admin console, go to **Security** > **Authenticators**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. In **Default Policy**, click **Edit**.
1. In the **Edit Policy** dialog box, under **Effective Factors**:
   * Set **Email Authentication** to **Disabled**.
   * Set **Phone Authentication** to **Optional**.
1. Click **Update Policy** if a value has changed.

<StackSelector snippet="summaryofsteps" noSelector />

<StackSelector snippet="integrationsteps" noSelector />

</div>
