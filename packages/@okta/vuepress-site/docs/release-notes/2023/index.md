---
title: Okta API Products release notes 2023
---

## January

### Weekly release 2023.01.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2023.01.1](#bugs-fixed-in-2023-01-1)                       |January 19, 2023           |

#### Bugs fixed in 2023.01.1

* Requests failed when an admin used a group limit in an expression that was more than 100 (for example, `getFilteredGroups(groupallowlist, group_expression, 101)`). (OKTA-565041)

* Requests failed when an admin used a group limit in an expression that was less than the number of groups that satisfied the request (for example, `Groups.startsWith("active_directory","eai_",10)`). (OKTA-556056)

### Monthly release 2023.01.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Custom app login deprecated](#custom-app-login-deprecated) | January 11, 2023 |
| [Full regional support for AWS EventBridge Log Stream integrations is EA in Preview](#full-regional-support-for-aws-eventbridge-log-stream-integrations-is-ea-in-preview) | January 11, 2023 |
| [Optional consent for OAuth 2.0 scopes is EA in Preview](#optional-consent-for-oauth-2-0-scopes-is-ea-in-preview) | January 11, 2023 |
| [Password history policy enforced in strict mode is GA in Production](#password-history-policy-enforced-in-strict-mode-is-ga-in-production) | December 9, 2022 |
| [PBKDF2 Hashing Algorithm support is GA in Production](#pbkdf2-hashing-algorithm-support-is-ga-in-production) | December 9, 2022 |
| [Revoke user sessions is GA in Production](#revoke-user-sessions-is-ga-in-production) | December 9, 2022 |
| [Unusual telephony requests blocked by machine-learning measures](#unusual-telephony-requests-blocked-by-machine-learning-measures) | January 11, 2023 |
| [Bugs fixed in 2023.01.0](#bugs-fixed-in-2023-01-0) | January 11, 2023 |

#### Custom app login deprecated

The custom app login feature is deprecated. This functionality is unchanged for orgs that actively use custom app login. Orgs that don't use custom app login should continue to use the [Okta-hosted sign-in experience](/docs/guides/redirect-authentication/) or [configure IdP routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-cfg-routing-rules) that redirect users to the appropriate app to sign in. <!-- OKTA-564039-->

#### Full regional support for AWS EventBridge Log Stream integrations is EA in Preview

The Log Streaming API has expanded support for all commercial regions in the AWS EventBridge Log Stream integration. See [AWS EventBridge Setting property details](/docs/reference/api/log-streaming/#property-details-2). <!-- OKTA-540378-->

#### Optional consent for OAuth 2.0 scopes is EA in Preview

OAuth 2.0 Optional Consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See [Request user consent](/docs/guides/request-user-consent/). <!-- OKTA-563884-->

#### Password history policy enforced in strict mode is GA in Production

When an admin [updates passwords](/docs/reference/api/users/#update-user) and sets the `strict` parameter to `true`, the [password history policy](/docs/reference/api/policy/#age-object) is now enforced.<!-- OKTA-563910-->

#### PBKDF2 Hashing Algorithm support is GA in Production

Okta now supports Password-Based Key Derivation Function 2 (PBKDF2) for hashing imported user passwords. This hashing algorithm is used to reduce vulnerabilities to brute-force attacks. <!-- OKTA-563886-->

#### Revoke user sessions is GA in Production

You can end all Okta sessions for a user when resetting their password. All sessions of the specified user are revoked except for the current session. This option protects the user account from unauthorized access. See the `revokeSessions` parameter in the [Users API](/docs/reference/api/users/#change-password). <!-- OKTA-542646-->

#### Unusual telephony requests blocked by machine-learning measures

Okta uses an internal machine-learning-based toll fraud and abuse-detection model to block unusual SMS or voice requests. Telephony requests that are blocked by the model have a `DENY` status in the System Log. <!-- OKTA-562110-->

#### Bugs fixed in 2023.01.0

* During the authenticator enrollment flow using the `/authorize` endpoint, users couldn't enroll in the Custom APP authenticator. (OKTA-558352)

* The Log Streaming API returned the Splunk Cloud `token` property in the response body. (OKTA-437264)
