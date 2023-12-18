---
title: Self-service registration
---

<ApiLifecycle access="ie" />

> **Note:** A request context for the client application is required when a server-side application uses an Embedded SDK as a proxy between itself and Okta. This context contains values (geolocation, IP address, and user agent) that inform a secure response. However, these values are currently derived from the server application rather than the client. Therefore, network zones or behaviors that drive their conditions based on these request context values won’t work until this issue is resolved.

Self-service registration allows users to sign up to an application by themselves. In this use case, the user must register with a password, email, and/or phone factors. Enable the self-service registration option for your app in the Okta org and then build the self-service registration flow in your app.

<StackSnippet snippet="pwdoptionalusecase" inline />

---

**Learning outcomes**

* Configure your Okta org for self-service registration.
* Set up the password, email, and/or phone authentication factors.
* Set up and send a verification email during new user registration.

**What you need**

* An app that uses the embedded Identity Engine SDK
* [Okta org already configured for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

Configure the Okta org to accept self-registration with the password, email, and/or phone factors.

<div class="half">

![Password and email factors](/img/oie-embedded-sdk/factor-password-email-or-phone.png)

</div>

1. See [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) to set up the password, email, and phone factors in your Okta org.
1. [Create a profile enrollment policy](#create-a-profile-enrollment-policy)
1. [Set the Email and Phone authenticators as optional enrollment factors](#set-the-email-and-phone-authenticators-as-optional-enrollment-factors)

### Create a profile enrollment policy

Create a policy for self-registration:

1. Open the Admin Console for your org.
1. Go to **Security** > **Profile Enrollment**, and click **Add Profile Enrollment Policy**.
1. Enter a policy **Name**, and click **Save**.
1. Click the pencil icon next to your new policy.
1. Ensure that  **Self-service registration** is set to **Allowed**.
1. Click **Manage apps**.
1. Click **Add an App to This Policy**.
1. Click **Apply** next to your app, and then click **Close**.

> **Note:** See [managed profile enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) for more profile enrollment policy options.

### Set the Email and Phone authenticators as optional enrollment factors

1. In the Admin Console, go to **Security** > **Authenticators** to view the available authenticators.
1. Select the **Enrollment** tab.
1. Click **Edit** under **Default Policy**.
1. Go to the **Effective factors** section of the **Edit Policy** dialog box:
   * Set **Email** to **Optional**.
   * Set **Phone** to **Optional**.
1. Click **Update Policy**.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

## Send a confirmation email even if the email authenticator is disabled

Even when only the password factor is required for an Okta application, you can still send a confirmation email.

### Set up

In this scenario, the org is set up in the following manner:

1. The org is initially configured following the steps described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case).
1. The application's authentication policy is updated for only the password factor. In the Admin Console, the **AND User must authenticate with** field is set to **Password**.
1. The **Email verification** field in the default profile enrollment policy is set to **Required before access is granted**. You can find the profile enrollment configuration by going to **Security** > **Profile Enrollment**.
1. The **Initiate login URI** field is set to the sign-in URI in the application settings. By setting this value, the email verification link for new user enrollment redirects the user to the URL provided in the **Initiate login URI** field.

### Flow behavior

During new user registration, there are no factors required other than the password. However, email verification is set to **Required** in the profile enrollment configuration. In this case, the user is sent an email using
the following email template: **Registration - Activation**.

The user clicks the link in the activation email and is redirected to the sample app's home page.
