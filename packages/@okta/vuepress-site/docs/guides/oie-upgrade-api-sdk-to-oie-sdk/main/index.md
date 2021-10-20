---
title: Upgrade your application to the Okta Identity Engine SDK
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

After your project is updated to the latest Okta Identity Engine SDKs, and you have an enabled Identity Engine org, you can begin the incremental process of migrating your application to use the Identity Engine SDK methods.

Review the following sections to understand the concepts behind the Okta Identity Engine SDK, and the differences between the Okta Classic Engine Authentication SDK and APIs and the Identity Engine approach to authentication. The mappings of Classic Engine Authentication SDK method calls, as well as back-end APIs, to the Okta Identity Engine SDK methods are provided for the following use cases:

- Basic sign-in authentication
- Multifactor sign-in authentication
- Password recovery
- Basic sign out

## Prerequisites

Before updating your applications to use the Okta Identity Engine SDK, ensure that you have completed the following tasks:

- Links to other docs like org migration
- Links to other docs like use interaction code grant
- Links to other docs like update your SDK

## Why upgrade your application to the Okta Identity Engine SDK

<StackSelector snippet="upgrade" noSelector />

## Okta Classic Engine Authn APIs and SDK vs Okta Identity Engine SDK

<StackSelector snippet="classicvsoie" noSelector />

## Mapping Authentication code to the Okta Identity Engine SDK

The following sections highlight the Okta Classic Engine Authn SDK method calls and back-end Authn APIs that require migration to the Okta Identity Engine SDK, which can perform authentication using the Identity Engine’s new features and workflows.

<StackSelector snippet="auth" noSelector />

### Mapping Authn APs to Okta Identity Engine SDK

If your application uses direct APIs for an authentication flow, your application code may call the following Okta APIs:

- `/api/v1/authn` to begin the primary authentication, which validates the password credentials and evaluates org policies
- If successful, call the `/api/v1/sessions` API with a sessionToken returned from the first call to create a new session

See the following sample calls and responses for this basic authentication flow:

... coming

## Mapping MFA Authentication code to the Okta Identity Engine SDK

The following sections highlight the Classic Engine Authn SDK method calls and back-end Authn APIs that require migration to the Okta Identity Engine SDK, which can perform multifactor authentication using the Identity Engine’s new features and workflows.

<StackSelector snippet="mfaauth" noSelector />

### Mapping MFA Authn APIs to Okta Identity Engine SDK

If your application uses direct APIs for a multifactor authentication flow, your application code may call the following Okta APIs:

- `/api/v1/authn` to begin the MFA authentication, with the password credentials, which sets the transaction state to MFA_REQUIRED
- `/api/authn/factors/(($emailFactorId}}/verify` to send the user an email with a sign-in code
- `/api/authn/factors/(($emailFactorId}}/verify` again with the sign-in code from the email challenge

>**Note:** If you call the direct `/api/v1/policies` API to manage or update MFA enrollment policies, you need to update these calls to use the Identity Engine policies. See App sign-on policy and Profile enrollment policy.

... coming (fix links in note above)

## Mapping Password Recovery code to the Okta Identity Engine SDK

The following sections highlight the Authn SDK method calls and back-end Authn APIs that require migration to the Okta Identity Engine SDK, which can perform a password reset using the Identity Engine’s new features and workflows.

<StackSelector snippet="pswrvy" noSelector />

### Mapping Password Recovery APIs to Okta Identity Engine

If your application uses direct APIs for a password recovery flow, your application code may call the following Okta APIs:

- `/api/v1/authn/recovery/password` to initiate the password recovery process and set the transaction state to RECOVERY_CHALLENGE
- `/api/v1/authn/recovery/token` to challenge the factor code
- `/api/v1/authn/credentials/reset_password` to reset the password if the challenge is successful

See the following sample calls and responses for the password recovery flow using SMS as a factor:

... more to come (include link in 1st bullet)

## Mapping Basic Sign out APIs to Okta Identity Engine SDK

<StackSelector snippet="signout" noSelector />