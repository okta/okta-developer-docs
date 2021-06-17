---
title: Alternate flows
excerpt: Alternate flows to the supported use cases
layout: Guides
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector />

This section discusses the alternate flows that can occur within your app
based on how your factors and policies are configured.

## Confirmation email sent during new user registration with only password factor required

Even when only password factor is required for the Okta Application, an email can still be sent

### Use cases with this alternate flow

[Self user registration (email and optional phone factor)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-self-reg/)

### Setup

In this scenario, the org is setup in the following manner:

1. The org is initially configured following the steps described in:
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-password-factor-only-use-cases)
and
[Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#set-up-your-okta-org-for-multi-factor-use-cases) .
1. The Application's Sign on Policy is updated for only the password factor. In
   Admin Console the **User must authenticate with** field is set to **Password**.
1. The **Email verification** field in the profile enrollment’s default policy
   is set to **Required before access is granted**. The profile enrollment can
   be found by navigate to **Security > Profile Enrollment**.
1. The **Initiate login URI** is set to sign in URI in the application settings. By setting this
   value the email verification link for new user enrollment will redirect the user
   to the URL provided in **Initiate login URI**.

### Flow behavior

During new user registration, there are no factors required other than
the password. However, an email verification is configured to be required
in the profile enrollments. In this case, the user is sent an email using
the following email template: **Registration - Activation**.

The user clicks the link in the activation email and is redirected to the
sample app's home page.

## Get user profile information after sign in

Depending on your requirements and what information you want to retrieve after a
successful user sign in, you can obtain basic user
information by making a request to Okta’s Open ID Connect authorization server.

<StackSnippet snippet="getuserprofile" />


</div>
