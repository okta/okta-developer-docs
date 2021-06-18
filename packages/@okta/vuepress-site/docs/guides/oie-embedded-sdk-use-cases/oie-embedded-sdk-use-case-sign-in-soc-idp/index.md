---
title: Sign in with Facebook
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

The user sign in with Facebook describes how to build your application to allow users to sign in with the Facebook social identity provider.

## Factor setup

This use case skips any factor requirements since it uses the Facebook identity provider.

## Configuration updates

The following configurations need to be completed before continuing with this use case.

### Step 1:  Complete steps in Set up your Okta org for password factor only use cases

If not already done, complete the steps described in the
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 2: Complete steps in Set up your Okta org (for social identity providers)

If not already done, complete the steps described in the
[Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-social-identity-providers)
section.

### Step 3:  Reconfigure Okta application for password only

If you completed the steps in
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-multi-factor-use-cases),
you have set up your application for multiple factors. Since this use case has
no additional factors, the application’s policy needs to be set up for password
only. Perform the following steps to set the app up for password only.

1. In the Admin console, select **Applications > Applications** from the
   left navigation menu.
1. In the **Applications** page, click on your application.
1. In your application page, select the **Sign On** tab and scroll
   down to the **Sign on policy** section.
1. Under **Sign on Policy** select the **Actions** menu icon (⋮) beside the
   **ENABLED** flag for the **Catch-all** rule and select **Edit**.
1. In the **Edit Rule** page scroll down to the **User must authenticate with**
   field and change it’s value to **Password** if it is not already set to that
   value.
1. Click **Save**.

## Summary of steps

The sequence of steps for the Facebook sign in flow is shown below.

<StackSelector snippet="summaryofsteps" noSelector />

## Integration steps

<StackSelector snippet="integrationsteps" noSelector />

</div>
