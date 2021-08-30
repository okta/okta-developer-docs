---
title: Sign in with Facebook
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

You can build your app to allow users to sign in with the Facebook social Identity Provider.

## Factor setup

This use case skips the factor requirements since it uses the Facebook Identity Provider.

## Configuration updates

The following configurations need to be completed before you continue with this use case.

### Step: Set up your Okta org for password factor only use cases

If not already done, complete the steps described in [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers).

### Step: Set up your Okta org for social Identity Providers

If not already done, complete the steps described in [Set up your Okta org (for social Identity Providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers).

### Step: Reconfigure the Okta application for password only

If you completed the steps in [Set up your Okta org (for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases), you've set up your application for multiple factors. Since this use case has no additional factors, the application's policy needs to be set up for password only. Perform the following steps to set the app up for password only.

1. In the Admin Console, select **Applications** > **Applications** from the left navigation pane.
1. On the **Applications** page, select your application.
1. On your application page, select the **Sign On** tab and scroll down to the **Sign On Policy** section.
1. Click the actions menu icon (⋮) beside the **ENABLED** flag for the **Catch-all Rule** and select **Edit**.
1. In the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with** field and change the value to **Password** if it isn't already set to that value.
1. Click **Save**.

<StackSelector snippet="summaryofsteps" noSelector />

<StackSelector snippet="integrationsteps" noSelector />

</div>
