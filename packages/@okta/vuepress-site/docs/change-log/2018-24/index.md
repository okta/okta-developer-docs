---
title: Okta API Products Change Log
---

## 2018.24

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [User Login Pattern Validation](#user-login-pattern-validation)                                                      | June 13, 2018            | June 18, 2018                                |
| [Bugs Fixed in 2018.24](#bugs-fixed-in-201824)                                                                       | June 13, 2018            | June 18, 2018                                |
| [Previously Released Early Access Features 2018.24 Update](#previously-released-early-access-features-201824-update) | Available now            | Available now                                |

### User Login Pattern Validation

A user's `login` no longer needs to be in the form of an email address.  Instead the login is validated against a `pattern` property stored in the User Schema, which can be set to certain Regular Expressions.  If no pattern is set, the default validation requires email addresses. More information can be found in the [User](/docs/api/resources/users) and [Schema](/docs/api/resources/schemas) API references. <!-- OKTA-166157 -->

### Bugs Fixed in 2018.24

* Queries to the `/logs` endpoint with a `since` parameter value of less than 1 minute ago would return a `500` error. (OKTA-174239)
* It was possible to set an access policy rule with a `refreshTokenWindowMinutes` value of `0` (infinite). (OKTA-171891)
* The System Log would not display OpenID Connect App assignment and un-assignment events. (OKTA-168223)

### Previously Released Early Access Features 2018.24 Update

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
