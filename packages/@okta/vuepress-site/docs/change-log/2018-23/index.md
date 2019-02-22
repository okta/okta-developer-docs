---
title: Okta API Products Change Log
---

## 2018.23

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Factors API Now Supports U2F](#factors-api-now-supports-u2f)                      | June 6, 2018             | June 11, 2018                                 |
| [Network Selection Modes Deprecated](#network-selection-modes-deprecated)        | June 6, 2018             | June 11, 2018                                 |
| [Better Signing Key Errors](#better-signing-key-errors)        | June 6, 2018             | June 11, 2018                                 |
| [Previously Released Early Access Features 2018.23 Update](#previously-released-early-access-features-201823-update) | Available now            | Available now                                |

### Factors API Now Supports U2F

Enrollment, activation, and verification of U2F factors are now supported in the [Factors API](/docs/api/resources/factors). <!-- OKTA-112705 -->

### Network Selection Modes Deprecated

Two deprecated network selection modes (`ON_NETWORK `and `OFF_NETWORK`) have been removed from the [Network Condition Object](/docs/api/resources/policy#NetworkConditionObject). They have been replaced by the `ZONE` type. <!-- OKTA-172947 -->

### Better Signing Key Errors

If signing keys cannot be generated for a new Authorization Server, a more descriptive error will be returned. <!-- OKTA-170357 -->

### Previously Released Early Access Features 2018.23 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [System Log API](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
