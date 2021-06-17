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

## Configuration Updates

The following configurations need to be completed before continuing with this use case.

### Step 1:  Complete steps in Set up your Okta org for password factor only use cases

If not already done, complete the steps described in the
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 2:  Reconfigure application for password factor only

If you completed the steps in
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-multi-factor-use-cases),
you have set up your application for multiple factors.
In order to use this password factor only use case,
perform the following steps:

1. In the [Admin console](https://developer.okta.com/docs/guides/quickstart/using-console/),
   select **Applications > Applications** from the left navigation menu.
1. In the **Applications** page, click on your application.
1. In your application page, select the **Sign On** tab and scroll down
   to the **Sign on policy** section.
1. Under **Sign on Policy** select the **Actions** menu icon (⋮) beside
   the **ENABLED** flag for the **Catch-all rule** and select **Edit**.
   1. In the **Edit Rule** page scroll down to the **User must authenticate with** field and change it’s value to **Password**.
   1. Click **Save**.

## Summary of steps

This use case entails building out a simple UI to capture the username and password
and authenticating the credentials with Okta using the SDK. See sequence diagram below:

<StackSelector snippet="summaryofsteps" noSelector />

### Integration steps

<StackSelector snippet="integrationsteps" noSelector />

</div>
