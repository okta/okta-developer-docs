---
title: Basic sign in
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

The basic user sign in is the simplest of all use cases and is the first
use case that should be executed after installation of the SDK.

## Factor setup

This use case requires the **password** factor.

<div class="common-image-format">

![Password Factor Only](/img/oie-embedded-sdk/factor-password-only.png
 "Password Factor")

</div>

## Configuration updates

You need to complete the following configurations before you continue with this use case.

### Step 1: Complete steps in Set up your Okta org for password factor only use cases

If not already done, complete the steps described in the
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 2: Reconfigure application for password factor only

If you completed the steps in
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases), you have set up your application for multiple factors.
To use this password factor only use case, do the following:

1. In the [Admin Console](https://developer.okta.com/docs/guides/quickstart/using-console/),
   select **Applications > Applications** from the left navigation menu.
1. In the **Applications** page, select your application.
1. In your application page, select the **Sign On** tab and scroll down
   to the **Sign On Policy** section.
1. Select the **Actions** menu icon (⋮) beside the **ENABLED** flag for the **Catch-all Rule** and select **Edit**.
1. In the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with** field and change its value to **Password**.
   1. Click **Save**.

<StackSelector snippet="summaryofsteps" noSelector />

<StackSelector snippet="integrationsteps" noSelector />

</div>
