---
title: Basic sign-in flow using the password factor
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

The basic user sign-in request is the simplest of all use cases and is the first use case that you should try after installation of the SDK.

This use case requires the password factor.

<div class="common-image-format">

![Password factor only indicator](/img/oie-embedded-sdk/factor-password-only.png "Password Factor Logo")

</div>

## Configuration updates

Before you build a basic sign-in flow, ensure your org is configured for the password factor by completing the steps in [Set up your Okta org for password factor only use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

If your org is configured with multiple factors, you need to set your app's sign-on policy to use only the password factor for this use case. To configure your app with only the password factor, perform the following steps:

1. In the Admin Console, select **Applications** > **Applications**.
1. On the **Applications** page, select your application.
1. On your application page, select the **Sign On** tab and scroll down to the **Sign On Policy** section.
1. Select the **Actions** menu icon (⋮) beside the **ENABLED** flag for the **Catch-all Rule** and select **Edit**.
1. In the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with** field and change its value to **Password**.
1. Click **Save**.

## Summary of steps

<StackSelector snippet="summaryofsteps" noSelector />

## Integration steps

<StackSelector snippet="integrationsteps" noSelector />

<StackSelector snippet="getuserprofile" noSelector />

</div>
