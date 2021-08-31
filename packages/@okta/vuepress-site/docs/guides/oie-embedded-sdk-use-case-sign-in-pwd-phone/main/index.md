---
title: Sign in with password and phone factors
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>


<StackSelector class="cleaner-selector"/>

This use case describes a user sign-in flow with the password and phone factors.

This use case requires the **password** and **phone** factors.

<div class="common-image-format">

![Password and phone factors](/img/oie-embedded-sdk/factor-password-phone.png
 "Password and phone factors")

</div>

## Configuration updates

Before you build a sign-in flow with password and phone factors, you need to configure the Okta org to accept both factors in your app. See [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) to configure your app and Okta org for this use case.

### Set phone as optional for authentication enrollment

The instructions in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) enables both email and phone factors as optional for enrollment. For this use case, you need to enable the phone factor as optional and disable the email factor.

1. In the Admin console, go to **Security** > **Authenticators**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. In **Default Policy**, click **Edit**.
1. In the **Edit Policy** dialog box, under **Effective Factors**:
   * Set **Email Authentication** to **Disabled**.
   * Set **Phone Authentication** to **Optional**.
1. Click **Update Policy** if a value has changed.

## Summary of steps

<StackSelector snippet="summaryofsteps" noSelector />

## Integration steps

<StackSelector snippet="integrationsteps" noSelector />

</div>
