---
title: Okta API Products Change Log
---

## 2018.39

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.39](#bugs-fixed-in-201839)                                                                       | September 26, 2018       | October 1, 2018                           |
| [Previously Released Early Access Features 2018.39 Update](#previously-released-early-access-features-201839-update) | Available Now            | Available Now                                |

### Bugs Fixed in 2018.39

* Requests to the `/authorize` endpoint would incorrectly prioritize values from the URI query parameter, rather than the request JWT. For more information, see the [documentation for that endpoint](/docs/api/resources/oidc#authorize). (OKTA-187642)
* When multiple attempts were simultaneously made to update a user's phone number for the [SMS](/docs/api/resources/factors#enroll-okta-sms-factor) or [Call](/docs/api/resources/factors#enroll-okta-call-factor) Factor, an HTTP 500 error was sometimes returned. (OKTA-188112)
* In some situations SHA-256 [password imports](/docs/api/resources/users#hashed-password-object) would not work. SHA-256 password import now requires the salt to be base64-encoded.

### Previously Released Early Access Features 2018.39 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
