---
title: Alternate flows
excerpt: Alternate flows to the supported use cases
layout: Guides
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

> **Limited GA:** Okta Identity Engine is under Limited General Availability (LGA) and currently available only to a selected audience.

<StackSelector />

This section discusses the alternate flows that can occur within your app based on how your factors and policies are configured.

## Confirmation email sent during new user registration with only password factor required

Even when only the password factor is required for an Okta application, an email can still be sent.

### Use cases with this alternate flow

[Self-service registration (email and optional phone factor)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-self-reg/)

### Setup

In this scenario, the org is set up in the following manner:

1. The org is initially configured following the steps described in:
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases)
and

[Set up your Okta org (for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multi-factor-use-cases).
1. The application's sign-on policy is updated for only the password factor. In
   the Admin Console, the **AND User must authenticate with** field is set to **Password**.
1. The **Email verification** field in the profile enrollment's Default Policy
   is set to **Required before access is granted**. Profile enrollment configuration can
   be found by navigating to **Security** > **Profile Enrollment**.
1. The **Initiate login URI** field is set to the sign-in URI in the application settings. By setting this
   value, the email verification link for new user enrollment redirects the user
   to the URL provided in the **Initiate login URI** field.

### Flow behavior

During new user registration, there are no factors required other than
the password. However, email verification is set to **Required**
in the profile enrollment configuration. In this case, the user is sent an email using
the following email template: **Registration - Activation**.

The user clicks the link in the activation email and is redirected to the
sample app's home page.

## Get user profile information after sign in

Depending on your requirements and what information you want to retrieve after the user successfully signs in, you can obtain basic user information by making a request to the authorization server.

<StackSnippet snippet="getuserprofile" />

</div>
