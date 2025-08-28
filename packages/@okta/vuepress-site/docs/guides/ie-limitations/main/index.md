---
title: Identity Engine limitations
excerpt: Okta Identity Engine introduces a lot of changes to the Okta platform. Some of these changes result in a lack of support for previously available features.
---

<ApiLifecycle access="ie" />

Okta Identity Engine introduces many changes to the Okta platform. Some of these changes result in a lack of support for previously available features. Also, some of these changes result in Identity Engine features not supported for use with Classic Engine APIs.

Are you an admin? See the Identity Engine [limitations](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-limitations) doc for admins.

> **Note:** This doc is designed for people who are familiar with Classic Engine. If you're new to Okta and Identity Engine, see [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) with Identity Engine.

## Classic Engine features not supported in Identity Engine

### Custom sign-in page for embedded app links

**What Changed:** Using a custom sign-in page for embedded app links isn't supported. Users who click an app embed link are now evaluated by their org's Okta sign-on policy. Admins can customize an Okta-hosted sign-in page or configure an IdP routing rule for the app.

**Further information:** [Configure a custom Okta-hosted sign-in page](/docs/guides/custom-widget/) and [Configure routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext_Identity_Provider_Discovery).

***

### Event type availability for event hooks

**What changed:** The following event types aren't available in Identity Engine because Device Trust isn't currently supported:

* `user.authentication.authenticate`
* `user.credential.enroll`

The following event type isn't available in Identity Engine because it's no longer being triggered:

`user.account.unlock_token`

The following event types are available only in Identity Engine:

* `device.enrollment.create`
* `user.mfa.factor.suspend`
* `user.mfa.factor.unsuspend`
* `security.authenticator.lifecycle.activated`
* `security.authenticator.lifecycle.deactivate`

**Further information:** [Event types](/docs/reference/api/event-types/)

***

### Support number

**What changed:** In Identity Engine, if the user is unable to use an authenticator, the support number is no longer provided. The only support available is the authenticator list page that provides alternative ways for the user to authenticate.

***

### Reset Factor API - email enrollment

**What changed:** With Identity Engine, a user's verified `primaryEmail` is considered as an email (authenticator) enrollment for the user. Therefore, the GET `/factors` API always returns the verified `primaryEmail` as an active email factor.

Okta discourages the use of the Classic Engine Reset Factor operation for resetting a user's email enrollment. This is because email is an auto-enrolling authenticator in Identity Engine. A user's verified `primaryEmail` is always usable as long as the Email authenticator is set to `ACTIVE`. The user can use it for **recovery only** or for both **authentication and recovery**, depending on the Email authenticator settings.

***

### Reset Factor API - question enrollment

**What changed:** Identity Engine steers away from the notion of separate questions for MFA and recovery. Therefore, the GET `/factors` API now returns the recovery question (forgot password question) in the absence of an MFA Security Question enrollment for the user.

In Classic Engine, when a user is using both the forgot password question and a Security Question for MFA, and an API call is made to `v1/lifecycle/reset_factors` to reset all the factors for the user, only the Security Question is reset. If the GET `/factors` API is called, the forgot password question isn't returned as a factor.

In Identity Engine, after you reset all the factors, calling the GET `/factors` API returns the forgot password question in the response.

> **Note:** With Identity Engine, if a user is using both the forgot password question and a Security Question for MFA, and an API call is made to `v1/lifecycle/reset_factors` to reset all the factors for the user, just the Security Question is reset with that call. To reset the forgot password question after that first call, make a second call to `/v1/lifecycle/reset_factors`.

***

### Self-Service Registration

**What changed:** The Classic Engine Self-Service Registration feature isn't supported. The Identity Engine Self-Service Registration is now accomplished through a user profile policy. In a user profile policy, admins select the attributes they want to collect when a new end user clicks **Sign up**. After the end user is authenticated into the app, their profile is complete and they're provisioned to the appropriate groups.

> **Note:** The form for the user profile policy only supports read-write attributes. If you added read-only or hidden attributes to your Self-Service Registration form in Classic Engine, they're not migrated to your user profile policy.

**Further information:** APIs not supported in Identity Engine self-registration: POST `/api/v1/registration`.

See [Configure user profile policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).

***

### Sessions APIs

**What changed:** This POST `/api/v1/sessions?additionalFields=cookieToken` request using the Sessions API isn't supported in Identity Engine. However, your existing app could continue to work as long as session management and app interactions are fully contained within the `v1/sessions` APIs.

> **Note:** See [Understand how sessions work after the upgrade](/docs/guides/oie-upgrade-sessions-api/main/).

***

### Session token created before an Identity Engine upgrade prompts user for password after upgrade completes

**What changed:** If a user authenticates in Classic Engine (which creates a `sessionToken`), and the upgrade to Identity Engine completes while the `sessionToken` is valid (five minutes), then when a user attempts to access an OpenID Connect app after the upgrade, the user is prompted for their password again.

> **Note:** This scenario only happens during an upgrade from Classic Engine to Identity Engine. It doesn't continue to happen after the upgrade.

***

### SMS Factors Administration lifecycle operations

**What Changed:** The SMS Factor can no longer be activated or deactivated using the Factors API (`/api/v1/org/factors`).

**Further information:** [Factors Administration API](/docs/reference/api/factor-admin)

***

### The `audience` parameter in the Authentication API

**What changed:** Passing the `audience` parameter to the `/api/v1/authn` API isn't supported in Identity Engine because of the new flexible authentication policy that comes with Identity Engine. The Classic Engine pipeline doesn't support the flexible authentication policy.

**Further information:** [IdP-initiated step-up authentication](/docs/reference/api/authn/#idp-initiated-step-up-authentication)

***

## Identity Engine features not supported with Classic Engine APIs

### Factor API enrollment limitations

The following Identity Engine features aren't supported using the Factor APIs:

* Enroll in multiple Okta Verify factors using the [Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/#tag/UserFactor/operation/enrollFactor). You can only use the Factors API to enroll the first Okta Verify factor.
* Okta Verify authenticator settings aren't enforced when enrolling using the Factors API:

  * The FIPS compliance requirement for enrollments
  * The user verification requirement for enrollments
  * New Okta Verify enrollments that are created with the Factors API aren't mapped to a device.
  * WebAuthn authenticator user verification settings aren't enforced when enrolling using the Factors API.

See the [SDK use cases](/docs/guides/oie-embedded-common-org-setup/main/) in our embedded SDK guides for more information on profile enrollment.

***

### Password recovery limitations with the Classic Authentication API

If you use the `/api/v1/authn` APIs to build custom password reset and account unlock experiences, you can't use the new recovery options in Identity Engine. Specifically, if you set a password policy rule to require Okta Verify Push for recovery or configure **Any enrolled authenticator used for MFA/SSO** for additional verification, end users who use the Classic Engine authentication APIs are denied recovery.

**Further information:** [Recovery operations](/docs/reference/api/authn/#recovery-operations) section of the Authentication API.

***

## Okta Sign-In Widget upgrade

For Identity Engine, some specific objects that were previously in the Sign-In Widget configuration are no longer supported and must be removed. Also, specific feature flags aren't supported when you upgrade Sign-In Widget and must be removed from `features` in the JSON code. See [Upgrade your Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/main/) for a comprehensive list of configuration and feature changes.
