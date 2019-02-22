---
title: Okta API Products Change Log
---

## 2018.44

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.44](#bugs-fixed-in-201844)                                                                       | October 31, 2018         | November 5, 2018                             |
| [Previously Released Early Access Features 2018.44 Update](#previously-released-early-access-features-201844-update) | Available Now            | Available Now                                |

### Bugs Fixed in 2018.44

* Temporary passwords returned by the `/users/${userId}/lifecycle/expire_password` [endpoint](/docs/api/resources/users#expire-password) sometimes included hard-to-distinguish characters.
* Queries to the `/logs` [endpoint](/docs/api/resources/system_log#list-events) with `since` and `until` values that were both earlier than the customer's data retention period would return an HTTP 500 error.

### Previously Released Early Access Features 2018.44 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
