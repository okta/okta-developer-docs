---
title: User password recovery
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

This use case describes how to integrate a password recovery flow into your app using the SDK. The flow includes an email factor step that the user needs to verify before updating their password.

## Factor setup

This use case requires the **password** and **email** factors.

<div class="common-image-format">

![Displays Password and Email factor indicators](/img/oie-embedded-sdk/factor-password-email.png)

</div>

## Configuration updates

Before you build a password recovery flow with an email factor, ensure your org is configured for a multifactor use case by completing the steps in
 [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case).

### Set email as the only factor enabled for password recovery

In addition to configuring your Okta org for the multifactor use case, you need to enable email as the only factor for password recovery.

1. In the Admin Console, go to **Security** > **Authenticators**.
1. On the **Authenticators** page, click **Actions** and then **Edit** for the **Password** authenticator.
1. In the **Password** page, scroll down to the bottom of the page for the **Default Policy** and click
   the edit pencil icon for the **Default Rule**.
1. In the **Edit Rule** dialog box, ensure that the following values are configured for the **AND Users can initiate recovery with** field:
   * **Phone (SMS / Voice call)**: Clear
   * **Email**: Selected
1. Click **Update Rule** if you change any values.

<StackSelector snippet="summaryofsteps" noSelector />

<StackSelector snippet="integrationsteps" noSelector />

## Troubleshooting Tips

Ensure that the password recovery user is valid with an **Active** user status in your Okta org.

</div>
