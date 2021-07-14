---
title: Okta Identity Engine Limitations
excerpt: The Okta Identity Engine introduces a lot of changes to the Okta platform. Some of these changes result in a lack of support for previously available features.
---

## Okta Identity Engine Limitations

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" />

The Okta Identity Engine introduces a lot of changes to the Okta platform. Some of these changes result in a lack of support for previously available features. Additionally, some of these changes result in Okta Identity Engine features not supported for use with Okta Classic APIs.

> **Note:** This doc is designed for people who are familiar with Okta Classic. If you are new to Okta and Okta Identity Engine, see [Get started](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-get-started-oie) with Okta Identity Engine.

Are you an admin? See the Okta Identity Engine [Limitations](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-oie-limitations) doc for admins.

### Okta Classic features not supported in Okta Identity Engine

#### Event Type availability for Event Hooks

**What Changed:** The following Event Types aren't available in the Okta Identity Engine because Device Trust isn't currently supported:

* `user.authentication.authenticate`
* `user.credential.enroll`

The following Event Types are available only in the Okta Identity Engine and can't be used by Okta Classic customers:

* `device.enrollment.create`
* `user.mfa.factor.suspend`
* `user.mfa.factor.unsuspend`
* `security.authenticator.lifecycle.activated`
* `security.authenticator.lifecycle.deactivate`

**Further Information:** [Event Types](/docs/reference/api/event-types/)

***

#### Help Support number

**What Changed:** In Okta Identity Engine, if the user is unable to use an authenticator, rather than providing a Help Support number, the Authenticator list page appears that enables the user to select another way to authenticate.

***

#### Personal identity verification

**What Changed:** Not supported

**Further Information:** [Add a Smart Card IdP](https://help.okta.com/en/prod/Content/Topics/Security/idp-smart-card-workflow.htm)

***

#### Sessions APIs

**What Changed:** Some Sessions APIs aren't supported in Okta Identity Engine.

**Further Information:** APIs not supported on Okta Identity Engine sessions:

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

#### Sign-In Widget Customization - Help Title & Need Help string

**What Changed:** The following customizations aren't supported:

* **Okta-hosted Sign-In Widget:** The **Help title** link in the **Customized Help Links** section of the Customization page has been removed and isn't supported.
* **Self-hosted Sign-In Widget:** The **Need help signing in** string has been removed and isn't supported.

**Further Information:** [Help title](https://github.com/okta/okta-signin-widget/#help-links)

***

#### Sign-In Widget Customization - processCreds hook

**What Changed:** Developers can't subscribe to the `processCreds` hook in the Sign-In Widget.

***

#### Sign-In Widget Customization - Registration Hooks

**What Changed:** Existing Registration Inline Hooks may experience compatibility issues after migrating to Identity Engine due to changes in the Okta Registration Inline Hook request. Your application may require code updates to properly consume the new request format.

In the Admin Console, the enablement of a Registration Inline Hook has changed from the former Self-Service Registration page (**Self-service Directory** > **Self-Service Registration**) to the Profile Enrollment Rules page (**Security** > **Profile Enrollment**). The creation of the Registration Inline Hook remains the same and can be completed in the Admin Console or by Inline Hook Management APIs.

**Further Information:** [Registration hooks API reference](/docs/reference/registration-hook/) and [Manage Profile Enrollment Policies](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/create-profile-enrollment-policy-sr.htm?Highlight=registration%20hook)

***

#### Sign-In Widget Customization - Security image

**What Changed:** The ability for end users to specify a security image when they first register for an account isn't supported with Okta Identity Engine. Additionally, existing users who may have already registered a security image, won't see that image when they sign in.

***

#### SMS Factors Administration lifecycle operations

**What Changed:** The SMS Factor can no longer be activated or deactivated using the Factors Administrator API (`/api/v1/org/factors`).

**Further Information:** [Factors Administration API](https://developer.okta.com/docs/reference/api/factor-admin)

***

### Okta Identity Engine features not supported with Okta Classic APIs

#### Factor API enrollment limitations

The following Okta Identity Engine features aren't supported using the Factor APIs.

* Enroll in multiple Okta Verify factors using the [Factors API](https://developer.okta.com/docs/reference/api/factors/#enroll-okta-verify-totp-factor). You can only use the Factors API to enroll the first Okta Verify factor.
* Okta Verify authenticator settings aren't enforced when enrolling using the Factors API:

  * The FIPS compliance requirement for enrollments
  * The User Verification requirement for enrollments
  * New Okta Verify enrollments that are created with the Factors API aren't mapped to a device
  * WebAuthN authenticator User Verification settings aren't enforced when enrolling using the Factors API.

***

#### Password recovery limitations with the /authn API

Developers who use the `/api/v1/authn` APIs to build custom password reset and account unlock experiences can't use the new recovery options in Identity Engine. Specifically, if developers set a password policy rule to require Okta Verify Push for recovery or configure **Any enrolled authenticator used for MFA/SSO** for additional verification, end users that use the Okta Classic Authentication APIs are denied recovery.

**Further information:** [Recovery operations](https://developer.okta.com/docs/reference/api/authn/#recovery-operations) section of the Authentication API.
