---
title: Self-service registration
---

<ApiLifecycle access="ie" />

> **Note:** In proxy model architectures, where a server-side application using the Embedded SDK is used as a proxy between client applications and Okta servers, a request context for the client applications is required. Security enforcement is expected to be based on the client request context’s IP address and user agent. However, since these values are currently being derived from the server application rather than the client, this enforcement is not available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) will not work until we can find a solution to the issue.

This guide covers self-service registration, which allows users to sign up for the app themselves. In this use case, the user must register with a password, email, and/or phone factors. You must first enable the self-service registration option for your app in the Okta org and then build the self-service registration flow in your app.

<StackSnippet snippet="pwdoptionalusecase" inline />

---

**Learning outcomes**

* Configure your Okta org for self-service registration.
* Set up the password, email, and/or phone authentication factors.
* Set up and send a verification email during new user registration.

**What you need**

* An app that uses the embedded Okta Identity Engine SDK
* [Okta org already configured for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

Before you can build the self-registration flow in your app, you must configure the Okta org to accept self-registration with the password, email, and/or phone factors. See [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) to set up the password, email, and phone factors in your Okta org.

<div class="half">

![Password and email factors](/img/oie-embedded-sdk/factor-password-email-or-phone.png)

</div>

In addition to setting up the authentication factors, you also need to configure the following in your Okta org:

1. [Update the profile enrollment default policy](#_1-update-the-profile-enrollment-default-policy)
2. [Confirm that the org application is assigned to everyone](#_2-confirm-that-the-org-application-is-assigned-to-everyone)
3. [Set the Email and Phone authenticators as optional enrollment factors](#_3-set-the-email-and-phone-authenticators-as-optional-enrollment-factors)

### 1: Update the profile enrollment default policy

Enable self-registration in your profile enrollment default policy:

1. In the Admin Console, select **Security** > **Profile Enrollment** from the left-hand navigation pane.
1. On the **Profile Enrollment** page, click the pencil icon next to the Default Policy.
1. On the **Default Policy** page, under **Enrollment Settings**, click the actions menu icon (⋮) beside the **ENABLED** flag for the rule and select **Edit**.
1. In the **Edit Rule** dialog box, under the **For new users** section, select **Allowed** in the **Sign-up** field.
1. Click **Save**.

> **Note:** See [Managed Profile Enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) for additional profile enrollment policy options.

### 2: Confirm that the org application is assigned to everyone

For new user registration, your app in your Okta org needs to be assigned to everyone.

1. In the Admin Console, select **Applications** > **Applications** from the left-hand navigation pane.
1. On the **Applications** page, select your application.
1. On your application page, select the **Assignments** tab.
1. From the left, click the **Groups** filter.
1. Confirm that the **Everyone** group appears in the Assignment list.

### 3: Set the Email and Phone authenticators as optional enrollment factors

1. In the Admin console, select **Security** > **Authenticators** from the left-hand navigation pane
1. On the **Authenticators** page, click the **Enrollment** tab.
1. In **Default Policy**, click **Edit**.
1. Under the **Effective factors** section of the **Edit Policy** dialog box, set both email and phone authenticators to optional for enrollment:
   * Set **Email Authentication** to **Optional**.
   * Set **Phone Authentication** to **Optional**.
1. Click **Update Policy**.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />

## Send a confirmation email during new user registration with only the password factor required

Even when only the password factor is required for an Okta application, you can still send a confirmation email.

### Set up

In this scenario, the org is set up in the following manner:

1. The org is initially configured following the steps described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case).

2. The application's authentication policy is updated for only the password factor. In the Admin Console, the **AND User must authenticate with** field is set to **Password**.

3. The **Email verification** field in the profile enrollment's Default Policy is set to **Required before access is granted**. You can find the profile enrollment configuration by navigating to **Security** > **Profile Enrollment**.

4. The **Initiate login URI** field is set to the sign-in URI in the application settings. By setting this value, the email verification link for new user enrollment redirects the user to the URL provided in the **Initiate login URI** field.

### Flow behavior

During new user registration, there are no factors required other than the password. However, email verification is set to **Required** in the profile enrollment configuration. In this case, the user is sent an email using
the following email template: **Registration - Activation**.

The user clicks the link in the activation email and is redirected to the sample app's home page.
