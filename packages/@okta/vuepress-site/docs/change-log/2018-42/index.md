---
title: Okta API Products Change Log
---

## 2018.42

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.42](#bugs-fixed-in-201842)                                                                       | October 17, 2018         | October 22, 2018                             |
| [Previously Released Early Access Features 2018.42 Update](#previously-released-early-access-features-201842-update) | Available Now            | Available Now                                |

### Bugs Fixed in 2018.42

* The `/clients` [endpoint](/docs/api/resources/oauth-clients#list-client-applications) dropped the `filter` parameter for any paginated results returned after the first page.
* Messages that were sent to devices using the [Factors API](/docs/api/resources/factors) would sometimes return a `500` error if the message could not be sent.

### Previously Released Early Access Features 2018.42 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
