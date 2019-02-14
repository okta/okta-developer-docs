---
title: Okta API Products Change Log
---

## 2018.45

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Linked Objects API is Generally Available (GA)](#linked-objects-api-is-generally-available-ga)                            | November 6, 2018       | December 10, 2018                             |
| [Bugs Fixed in 2018.45](#bugs-fixed-in-201845)                                                                       | November 6, 2018         | November 12, 2018                             |
| [Previously Released Early Access Features 2018.45 Update](#previously-released-early-access-features-201845-update) | Available Now            | Available Now                                |

### Linked Objects API is Generally Available (GA)

The [Linked Objects API](/docs/api/resources/linked-objects) is now available to all orgs. <!--OKTA-195560-->

### Bugs Fixed in 2018.45

* The set of roles allowed access to system log information by the [Events API](/docs/api/resources/events) did not match the set of roles allowed access by the [System Log API](/docs/api/resources/system_log). (OKTA-194899)
* When a user tried to sign in using the Okta Sign-in Widget, they would not be prompted to enroll an optional factor, despite `multiOptionalFactorEnroll` being set to `true`. (OKTA-195195)

### Previously Released Early Access Features 2018.45 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
