---
title: Self-service registration
---

<ApiLifecycle access="ie" />

> **Note:** A request context for the browser client is required when a server-side web application uses an embedded SDK as a proxy between itself and Okta. This context contains values (geolocation, IP address, and user agent) that inform a secure response. However, these values are currently taken from the server rather than the client. As a result, network zones and behaviors that drive their conditions based on these request context values don’t currently work.

Enable a self-registration flow in your application using the embedded SDK.

---

#### Learning outcomes

* Configure your Okta org for self-service registration.
* Set up the password, email, and/or phone authentication factors.
* Set up and send a verification email during new user registration.

#### What you need

* An app that uses the embedded Identity Engine SDK
* [Okta org already configured for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

Self-service registration allows users to sign up to an application by themselves. In this use case, the user must register with a password, email, and/or phone factors. Enable self-service registration for the app in your Okta org and then build the self-service registration flow in your app.

<div class="half">

![Password, email, and phone factors](/img/oie-embedded-sdk/factor-password-email-or-phone.png)

</div>

<StackSnippet snippet="pwdoptionalusecase" />

## Configuration updates

Configure your Okta org to accept self-registration with the password, email, and/or phone factors.

1. See <StackSnippet snippet="setupyourorglink" inline />.
1. [Create a profile enrollment policy](#create-a-profile-enrollment-policy)
1. [Set the Email and Phone authenticators as optional enrollment factors](#set-the-email-and-phone-authenticators-as-optional-enrollment-factors)

### Create a profile enrollment policy

Create a policy for self-registration:

1. Open the Admin Console for your org.
1. Go to **Security** > **Profile Enrollment**, and click **Add Profile Enrollment Policy**.
1. Enter a policy **Name**, and click **Save**.
1. Click the pencil icon next to your new policy.
1. Ensure that **Self-service registration** is set to **Allowed**.
1. Click **Manage apps**.
1. Click **Add an App to This Policy**.
1. Click **Apply** next to your app, and then click **Close**.

> **Note:** See [managed profile enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) for more profile enrollment policy options.

### Set the email and phone authenticators as optional enrollment factors

1. Go to **Security** > **Authenticators** to view the available authenticators.
1. Select the **Enrollment** tab.
1. Click **Edit** under **Default Policy**.
1. Go to the **Effective factors** section of the **Edit Policy** dialog:
   1. Set **Email** to **Optional**.
   {style="list-style-type:lower-alpha"}
   1. Set **Phone** to **Optional**.
1. Click **Update Policy**.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

## Send a confirmation email even if the email authenticator is disabled

Even when only the password factor is required for an Okta application, you can still send a confirmation email.

To replicate this scenario:

1. Configure your org following the steps described in <StackSnippet snippet="setupyourorglink" inline />.
1. Set your app's authentication policy to require only the password factor.
   1. In the Admin Console, go to **Applications** > **Applications**.
   {style="list-style-type:lower-alpha"}
   1. Select your app, and then go to the **Sign On** tab.
   1. In the **User authentication** section, click **Edit**.
   1. Set **Authentication Policy** to **Password only**, and click **Save**.
1. Set your app's **Initiate login URI** to its sign-in URI. By setting this value, the email verification link for new user enrollment redirects the user to the URL provided in the **Initiate login URI** field.
   1. Select the **General** tab.
   {style="list-style-type:lower-alpha"}
   1. In the **General Settings** section, click **Edit**.
   1. Set **Initiate login URI** to your **Sign-in Redirect URI**, and click **Save**.
1. Make email verification mandatory in your default profile enrollment policy.
   1. Go to **Security** > **Profile Enrollment**.
   {style="list-style-type:lower-alpha"}
   1. Click the pencil icon next to the **Default policy**.
   1. Ensure that **Required before access is granted** is selected for **Email Verification**.

During new user registration, there are no factors required other than the password. However, email verification is set to **Required** in the profile enrollment configuration. In this case, the user is sent an email using the **Registration - Activation** email template. The user clicks the link in the activation email and is redirected to the sample app's home page.
