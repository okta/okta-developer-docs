---
title: Okta Identity Engine Limitations
excerpt: Okta Identity Engine introduces a lot of changes to the Okta platform. Some of these changes result in a lack of support for previously available features.
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" />

Okta Identity Engine introduces a lot of changes to the Okta platform. Some of these changes result in a lack of support for previously available features. Additionally, some of these changes result in the Identity Engine features not supported for use with Okta Classic Engine APIs.

> **Note:** This doc is designed for people who are familiar with the Classic Engine. If you are new to Okta and the Identity Engine, see [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) with the Identity Engine.

Are you an admin? See the Identity Engine [Limitations](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-limitations) doc for admins.

### Classic Engine features not supported in the Identity Engine

#### Custom sign-in page for embedded app links

**What Changed:** Using a custom sign-in page for embedded app links isn't supported. Users who click an app embed link are now evaluated by their org's Okta sign-in policy. Admins can customize an Okta-hosted sign-in page or configure an IdP routing rule for the app.

**Further information:** [Configure a custom Okta-hosted sign-in page](/docs/guides/style-the-widget/before-you-begin/) and [Configure routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext_Identity_Provider_Discovery)

***

#### Event Type availability for Event Hooks

**What Changed:** The following Event Types aren't available in the Identity Engine because Device Trust isn't currently supported:

* `user.authentication.authenticate`
* `user.credential.enroll`

The following Event Type isn’t available in Identity Engine because it is no longer being triggered:

`user.account.unlock_token`

The following Event Types are available only in the Identity Engine and can't be used by Classic Engine customers:

* `device.enrollment.create`
* `user.mfa.factor.suspend`
* `user.mfa.factor.unsuspend`
* `security.authenticator.lifecycle.activated`
* `security.authenticator.lifecycle.deactivate`

**Further Information:** [Event Types](/docs/reference/api/event-types/)

***

#### Help Support number

**What Changed:** In the Identity Engine, if the user is unable to use an Authenticator, the Help Support number is no longer provided. The only support available is the Authenticator list page that provides alternative ways for the user to authenticate.

***

#### Personal identity verification

**What Changed:** Not supported

**Further Information:** [Learn more about PIV](https://help.okta.com/okta_help.htm?id=ext-idp-smart-card-workflow)

***

#### Reset Factor API - email enrollment

**What Changed:** With Identity Engine, a user’s verified `primaryEmail` is considered an email (Authenticator) enrollment for the user. Therefore, the GET `/factors` API always returns the verified `primaryEmail` as an active email factor.

The use of the Classic Engine Reset Factor API for resetting a user’s email enrollment is discouraged and considered moot, because email is an auto-enrolling Authenticator in Identity Engine. A user’s verified `primaryEmail` is always usable as long as the Email Authenticator is set to `ACTIVE`, and the user can use it for **recovery only** or for both **authentication and recovery**, depending on the Email Authenticator settings.

***

#### Reset Factor API - question enrollment

**What Changed:** Identity Engine steers away from the notion of separate questions for MFA and Recovery. Therefore, the GET `/factors` API now returns the Recovery Question (Forgot Password Question) in the absence of an MFA Security Question enrollment for the user.

In Classic Engine, when a user is using both the Forgot Password Question and a Security Question for MFA, and an API call is made to `v1/lifecycle/reset_factors` to reset all the factors for the user, only the Security Question is reset. And then, if the GET `/factors` API is called, the Forgot Password Question isn't returned as a factor. With an upgrade to Identity Engine, after resetting all the factors, when the GET `/factors` API is then called, the Forgot Password Question is returned as a factor in the response.

> **Note:** With Identity Engine, if a user is using both the Forgot Password Question and a Security Question for MFA, and an API call is made to `v1/lifecycle/reset_factors` to reset all the factors for the user, just the Security Question is reset with that call. To reset the Forgot Password Question after that first call, make a second call to `/v1/lifecycle/reset_factors`.

***

#### Self-Service Registration

**What Changed:** The Self-Service Registration feature isn't supported. Self-service registration is now accomplished through a profile enrollment policy. In a profile enrollment policy, admins select the attributes they want to collect when a new end user clicks **Sign up**. After the end user is authenticated into the app, their profile is complete and they are provisioned to the appropriate groups.

**Further information:** [Manage Profile Enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment)

***

#### Sessions APIs

**What Changed:** Some Sessions APIs aren't supported in the Identity Engine. However, your existing application could continue to work as long as session management and application interactions are fully contained within the `v1/sessions` APIs.

**Further Information:** APIs not supported on the Identity Engine sessions:

* `GET /api/v1/sessions/${sessionId}`
* `POST /api/v1/sessions/${sessionId}/lifecycle/refresh`
* `DELETE /api/v1/sessions/${sessionId}`
* `POST /api/v1/users/me/lifecycle/delete_sessions`

***

#### Sign-In Widget customization - feature flags

**What Changed:** The following feature flags aren't supported:

* `features.idpDiscovery`
* `features.autoPush`
* `features.smsRecovery`
* `features.emailRecovery`
* `features.callRecovery`
* `features.multiOptionalFactorEnroll`
* `features.webauthn`
* `features.selfServiceUnlock`
* `features.registration`

**Further Information:** [Okta Sign-In Widget feature flags](https://github.com/okta/okta-signin-widget#feature-flags)

***

#### Sign-In Widget customization - Help title link and Need help signing in string

**What Changed:** The following customizations aren't supported:

* **Okta-hosted Sign-In Widget:** The **Help title** link in the **Customized Help Links** section of the Customization page has been removed and isn't supported.
* **Self-hosted Sign-In Widget:** The **Need help signing in** string has been removed and isn't supported.

**Further Information:** [Okta Sign-in Widget Help](https://github.com/okta/okta-signin-widget/#help-links)

***

#### Sign-In Widget customization - processCreds hook

**What Changed:** Developers can't subscribe to the `processCreds` hook in the Sign-In Widget.

***

#### Sign-In Widget customization - Registration Inline Hooks

**What Changed:** Existing Registration Inline Hooks may experience compatibility issues after migrating to the Identity Engine due to changes in the Okta Registration Inline Hook request. Your application may require code updates to consume the new request format properly.

In the Admin Console, the enablement of a Registration Inline Hook has changed from the former Self-Service Registration page (**Self-service Directory** > **Self-Service Registration**) to the Profile Enrollment Rules page (**Security** > **Profile Enrollment**). The creation of the Registration Inline Hook remains the same and can be completed in the Admin Console or by Inline Hook Management APIs.

**Further Information:** [Registration hooks API reference](/docs/reference/registration-hook/) and [Manage Profile Enrollment Policies](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/create-profile-enrollment-policy-sr.htm?Highlight=registration%20hook)

***

#### Sign-In Widget customization - Security image

**What Changed:** The ability for end users to specify a security image when they first register for an account isn't supported with the Identity Engine. Additionally, existing users who may have already registered a security image, won't see that image when they sign in.

***

#### SMS Factors Administration lifecycle operations

**What Changed:** The SMS Factor can no longer be activated or deactivated using the Factors Administrator API (`/api/v1/org/factors`).

**Further Information:** [Factors Administration API](/docs/reference/api/factor-admin)

***

#### The ‘audience’ parameter in the Authentication API

**What Changed:** Passing the `audience` parameter to the `/api/v1/authn` API isn't supported in the Identity Engine because of the new flexible App Sign-On Policy that comes with Identity Engine. The Classic Engine pipeline doesn't support the flexible App Sign-On Policy.

**Further information:** [IDP-initiated step-up authentication](/docs/reference/api/authn/#idp-initiated-step-up-authentication)

***

### Identity Engine features not supported with Okta Classic APIs

#### Factor API enrollment limitations

The following Identity Engine features aren't supported using the Factor APIs.

* Enroll in multiple Okta Verify factors using the [Factors API](/docs/reference/api/factors/#enroll-okta-verify-totp-factor). You can only use the Factors API to enroll the first Okta Verify factor.
* Okta Verify authenticator settings aren't enforced when enrolling using the Factors API:

  * The FIPS compliance requirement for enrollments
  * The User Verification requirement for enrollments
  * New Okta Verify enrollments that are created with the Factors API aren't mapped to a device.
  * WebAuthN authenticator User Verification settings aren't enforced when enrolling using the Factors API.

See the [SDK uses cases](/docs/guides/oie-embedded-common-org-setup/main/) in our Embedded SDK guides for more information on profile enrollment.

***

#### Password recovery limitations with the /authn API

Developers who use the `/api/v1/authn` APIs to build custom password reset and account unlock experiences can't use the new recovery options in the Identity Engine. Specifically, if developers set a password policy rule to require Okta Verify Push for recovery or configure **Any enrolled authenticator used for MFA/SSO** for additional verification, end users who use the Classic Engine Authentication APIs are denied recovery.

**Further information:** [Recovery operations](/docs/reference/api/authn/#recovery-operations) section of the Authentication API.
