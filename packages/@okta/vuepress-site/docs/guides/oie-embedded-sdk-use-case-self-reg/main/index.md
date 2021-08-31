---
title: Self registration
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

Self-service registration allows users to sign up for the app themselves. In this use case, the user must register with a password, email, and/or phone factors.

To enable self-service registration:

1. Enable the self-service registration option for your app in the Okta org.
1. Build the self-service registration flow in your app.

## Factor setup

This use case requires the password and either the email or the phone factor.

<div class="common-image-format">

![Displays a diagram of the required password factor and the additional required email or phone factors](/img/oie-embedded-sdk/factor-password-email-or-phone.png)

</div>

## Configuration updates

Before you can build the self-registration flow in your app, you must configure the Okta org to accept self-registration with the password, email, and/or phone factors. See [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) to set up the password, email, and phone factors in your Okta org.

In addition to setting up the recovery factors, you also need to configure the following in your Okta org:

1. [Update the profile enrollment default policy](#_1-update-the-profile-enrollment-default-policy)
1. [Confirm that the org application is assigned to everyone](#_2-confirm-that-the-org-application-is-assigned-to-everyone)
1. [Ensure both Email and Phone factors are set as optional for authentication enrollment](#_3-ensure-both-email-and-phone-factors-are-set-as-optional-for-authentication-enrollment)

### 1: Update the profile enrollment default policy

Enable self-registration in your profile enrollment default policy:

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
1. On the **Profile Enrollment** page, click the pencil icon next to the Default Policy.
1. On the **Default Policy** page, under **Enrollment Settings**, click the actions menu icon (⋮) beside the **ENABLED** flag for the rule and select **Edit**.
1. In the **Edit Rule** dialog box, under the **For new users** section, select **Allowed** in the **Sign-up** field.
1. Click **Save**.

> **Note:** See [Manage Profile Enrollment policies](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-create-profile-enrollment) for additional profile enrollment policy options.

### 2: Confirm that the org application is assigned to everyone

You need to assign anyone to your application for new user registration.

1. In the Admin Console, go to **Applications** > **Applications**.
1. On the **Applications** page, select your application.
1. On your application page, select the **Assignments** tab.
1. From the left, click the **Groups** filter.
1. Confirm that the **Everyone** group appears in the Assignment list.

### 3: Ensure that both email and phone factors are set as optional for authentication enrollment

1. In the Admin console, go to **Security** > **Authenticators**.
1. On the **Authenticators** page, click the **Enrollment** tab.
1. In **Default Policy**, click **Edit**.
1. In the **Edit Policy** dialog box, under **Effective factors**, set both email and phone authenticators to optional for enrollment:
   * Set **Email Authentication** to **Optional**.
   * Set **Phone Authentication** to **Optional**.
1. Click **Update Policy**.

<StackSelector snippet="summaryofsteps" noSelector />

<StackSelector snippet="integrationsteps" noSelector />

</div>
