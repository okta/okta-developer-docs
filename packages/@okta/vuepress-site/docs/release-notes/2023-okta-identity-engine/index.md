---
title: Okta Identity Engine API Products release notes 2023
---

<ApiLifecycle access="ie" />

## January

### Monthly release 2023.01.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Revoke user sessions is GA in Production](#revoke-user-sessions-is-ga-in-production) | December 9, 2023 |
| [Improvements to the self-service registration experience](#improvements-to-the-self-service-registration-experience) | December 9, 2023 |
| [Improvements to self-service account activities for AD and LDAP users](#improvements-to-the-self-service-account-activities-for-ad-and-ldap-users) | January 11, 2023 |
| [Optional consent for OAuth 2.0 scopes is EA in Preview](#optional-consent-for-oauth-2.0-scopes-is-ea-in-preview) | January 11, 2023 |
| [Bugs fixed in 2023.01.0](#bugs-fixed-in-2023-01-0) | January 11, 2023         |

#### Revoke user sessions is GA in Production

You can end all Okta sessions for a user when resetting their password. All sessions of the specified user are revoked except for the current session. This option protects the user account from unauthorized access. See the `revokeSession` parameter in the [Users API](/docs/reference/api/users/#change-password). <!-- OKTA-542646-->

#### Improvements to the self-service registration experience

Earlier versions of the self-service registration (SSR) flow used a complicated array of templates to send activation emails to users. The simplified SSR flow reduces this to only two email templates with customized welcome messages. If your application requires immediate verification of the user’s email address, use the **Registration - Activation** template. This template includes a magic link for a smoother sign-in experience. If email verification is not immediately required to sign in to the application, use the **Registration - Email Verification** template. This template includes a link for users to complete email verification at any time after they successfully sign in to the application. See [Customize email notifications](/docs/guides/custom-email/main/) and the [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/aspnet/main/). <!-- OKTA-497136 & 499523-->

#### Improvements to self-service account activities for AD and LDAP users

Previously, the self-service unlock (SSU) and self-service password reset (SSPR) flows created unnecessary friction for AD and LDAP users. This feature enhancement introduces a seamless magic link experience in emails sent to unlock accounts and reset passwords. Users no longer need to provide consent when using the same browser. In addition, after successfully unlocking their account, clicking the email magic link counts towards the application's assurance policy. After the assurance requirements are met, the user is signed directly in to the application. See [Configure the Email authenticator](). <!-- OKTA-561486-->

#### Optional consent for OAuth 2.0 scopes is EA in Preview

OAuth 2.0 Optional Consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See Request user consent. <!-- OKTA-563884-->

#### Bugs fixed in 2023.01.0

* A list security questions request (`/users/&{userId}/factors/questions`) resulted in an unexpected question and error in the response. (OKTA-525478)

* When an org had the Custom OTP, RSA SecurID, and YubiKey authenticators enabled and the `enroll_amr_values` parameter value was `otp`, users were prompted to enroll in all three authenticators rather than just Custom OTP. (OKTA-545674)

* The Log Streaming API returned the Splunk Cloud `token` property in the response body. (OKTA-437264)
