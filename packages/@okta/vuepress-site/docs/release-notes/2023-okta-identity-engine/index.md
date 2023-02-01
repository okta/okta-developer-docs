---
title: Okta Identity Engine API Products release notes 2023
---

<ApiLifecycle access="ie" />

## January

### Weekly release 2023.01.2

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|-----------------|
| [Clock skew for access and ID tokens](#clock-skew-for-access-and-id-tokens)                                      |February 1, 2023 |
| [Content Security Policy update](#content-security-policy-update)                                                |February 1, 2023 |
| [Interaction Code flow supports Native SSO](#interaction-code-flow-supports-native-sso)                          |February 1, 2023 |
| [Bugs fixed in 2023.01.2](#bugs-fixed-in-2023-01-2)                                                              |February 1, 2023 |

#### Clock skew for access and ID tokens

A 30 second clock skew is now allowed for access and ID tokens to validate that a token was created before the current time. <!--OKTA-538956 -->

#### Content Security Policy update

To improve our security and protect against Cross-Site Scripting (XSS) attacks, we are expanding the use of [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) to include when requests come from custom domains on non-customizable pages. <!--OKTA-567669 -->

#### Interaction Code flow supports Native SSO

The Interaction Code flow now supports the `device_sso` scope that you can use to perform Native SSO. This scope allows you to obtain an interaction code and exchange it for tokens and a device secret. See [Implement authorization by grant type](https://developer.okta.com/docs/guides/implement-grant-type/interactioncode/main/). <!--OKTA-551724 -->

#### Bugs fixed in 2023.01.2

* Requests made with an empty Origin header returned an HTTP 500 error response. (OKTA-449621)

* Requests to assign a custom role to a user or group returned a generic Bad Request error when the required role or resource-set property was missing. (OKTA-538237)

* Some custom admins didn't see groups and users that they had access to when they made a `GET` request to the Users (`/users/{id}/groups`) and Groups (`/groups/{id}/users`) APIs. (OKTA-568838)

* Users created using Just-In-Time provisioning weren't assigned to a group when a group rule existed. (OKTA-532840)

* An unclear error message was returned when a group rules API call (`create`, `update`, or `activate`) was made to assign users to read-only groups (for example, `Everyone`). (OKTA-567972)

### Weekly release 2023.01.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2023.01.1](#bugs-fixed-in-2023-01-1)                      |January 19, 2023          |

#### Bugs fixed in 2023.01.1

* Requests failed when an admin used a group limit in an expression that was more than 100 (for example, `getFilteredGroups(groupallowlist, group_expression, 101)`). (OKTA-565041)

* Requests failed when an admin used a group limit in an expression that was less than the number of groups that satisfied the request (for example, `Groups.startsWith("active_directory","eai_",10)`). (OKTA-556056)

* The `idp` property was missing in token inline hook requests. (OKTA-553322)

* A list security questions request (`/users/${userId}/factors/questions`) resulted in an unexpected security question and answer included in the response. (OKTA-567970)

### Monthly release 2023.01.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Custom app login](#custom-app-login) | January 11, 2023 |
| [Full regional support for AWS EventBridge Log Stream integrations is EA in Preview](#full-regional-support-for-aws-eventbridge-log-stream-integrations-is-ea-in-preview) | January 11, 2023 |
| [Improvements to self-service account activities for AD and LDAP users](#improvements-to-self-service-account-activities-for-ad-and-ldap-users) | November 30, 2022 |
| [Improvements to the self-service registration experience](#improvements-to-the-self-service-registration-experience) | December 9, 2022 |
| [Optional consent for OAuth 2.0 scopes is EA in Preview](#optional-consent-for-oauth-2-0-scopes-is-ea-in-preview) | January 11, 2023 |
| [Revoke user sessions is GA in Production](#revoke-user-sessions-is-ga-in-production) | December 9, 2022 |
| [Unusual telephony requests blocked by machine-learning measures](#unusual-telephony-requests-blocked-by-machine-learning-measures) | January 11, 2023 |
| [Bugs fixed in 2023.01.0](#bugs-fixed-in-2023-01-0) | January 11, 2023 |

#### Custom app login

Custom app login is now available to limited customers in Identity Engine. Only orgs that actively used this feature in Classic Engine before they upgraded may continue to do so. Orgs that don't use custom app login should continue to use the [Okta-hosted sign-in experience](/docs/guides/redirect-authentication/) or [configure IdP routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-cfg-routing-rules) that redirect users to the appropriate app to sign in. <!-- OKTA-564039-->

#### Full regional support for AWS EventBridge Log Stream integrations is EA in Preview

The Log Streaming API has expanded support for all commercial regions in the AWS EventBridge Log Stream integration. See [AWS EventBridge Setting property details](/docs/reference/api/log-streaming/#property-details-2). <!-- OKTA-540378-->

#### Improvements to self-service account activities for AD and LDAP users

Previously, the self-service unlock (SSU) and self-service password reset (SSPR) flows created unnecessary friction for AD and LDAP users. This feature enhancement introduces a seamless magic link experience in emails sent to unlock accounts and reset passwords. Users no longer need to provide consent when using the same browser. In addition, after successfully unlocking their account, clicking the email magic link counts towards the application's assurance policy. After the assurance requirements are met, the user is signed directly in to the application. These improvements are now GA in Preview. See [Customize email notifications](/docs/guides/custom-email/main/#use-vtl-variables). <!-- OKTA-561486-->

#### Improvements to the self-service registration experience

Earlier versions of the self-service registration (SSR) flow used a complicated array of templates to send activation emails to users. The simplified SSR flow reduces this to only two email templates with customized welcome messages. If your application requires immediate verification of the user’s email address, use the **Registration - Activation** template. This template includes a magic link for a smoother sign-in experience. If email verification is not immediately required to sign in to the application, use the **Registration - Email Verification** template. This template includes a link for users to complete email verification at any time after they successfully sign in to the application. See [Customize email notifications](/docs/guides/custom-email/main/) and the [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/aspnet/main/). <!-- OKTA-497136 & 499523-->

#### Optional consent for OAuth 2.0 scopes is EA in Preview

OAuth 2.0 Optional Consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See [Request user consent](/docs/guides/request-user-consent/). <!-- OKTA-563884-->

#### Revoke user sessions is GA in Production

You can end all Okta sessions for a user when resetting their password. All sessions of the specified user are revoked except for the current session. This option protects the user account from unauthorized access. See the `revokeSession` parameter in the [Users API](/docs/reference/api/users/#change-password). <!-- OKTA-542646-->

#### Unusual telephony requests blocked by machine-learning measures

SMS and voice requests are now blocked if an internal machine-learning-based toll fraud and abuse-detection model considers the requests unusual. Telephony requests that are blocked by the machine-learning model have a `DENY` status in the System Log. <!-- OKTA-562110-->

#### Bugs fixed in 2023.01.0

* The Log Streaming API returned the Splunk Cloud `token` property in the response body. (OKTA-437264)

* When an org had the Custom OTP, RSA SecurID, and YubiKey authenticators enabled and the `enroll_amr_values` parameter value was `otp`, users were prompted to enroll in all three authenticators rather than just Custom OTP. (OKTA-545674)
