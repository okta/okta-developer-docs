---
title: User password recovery
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" />

This use case describes how to integrate a password recovery flow into your app using an Okta SDK. The flow includes an email factor step that the user needs to verify before updating their password.

---

**Learning outcomes**

* Understand how to set up password recovery with only an email factor.
* Integrate the password recovery flow into your app.

**What you need**

* An app that uses the embedded Okta Identity Engine SDK
* [Okta org already configured for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

The password recovery use case requires the **password** and **email** factors.

<div class="common-image-format">

![Displays Password and Email factor indicators](/img/oie-embedded-sdk/factor-password-email.png)

</div>

Before you build a password recovery flow with an email factor, ensure that your org is configured for a multifactor use case by completing the steps in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case).

### Set email as the only factor enabled for password recovery

In addition to configuring your Okta org for the multifactor use case, you need to enable email as the only factor for password recovery for this flow.

1. In the Admin Console, go to **Security** > **Authenticators**.
1. From the **Setup** tab, select **Edit** from the **Actions** drop-down menu on the **Password** authenticator row.
1. On the **Password** page, scroll down to the **Add Rule** section of the **Default Policy** and click
   the edit pencil icon for the **Default Rule**.
1. In the **Edit Rule** dialog box, ensure that the following values are configured for the **AND Users can initiate recovery with** field:
   * **Phone (SMS / Voice call)**: Clear
   * **Email**: Selected
1. Click **Update Rule** if you change any values.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

## Troubleshooting tips

Verify that the password recovery user is valid with an active user status in your Okta org.

</div>
