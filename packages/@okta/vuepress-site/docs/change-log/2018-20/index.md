---
title: Okta API Products Change Log
---

## 2018.20

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [System Log Entry Delay Change](#system-log-entry-delay-change)| May 15, 2018 | May 29, 2018 |
| [Previously Released Early Access Features 2018.20 Update](#previously-released-early-access-features-201820-update) | Available now | Available now |

### System Log Entry Delay Change

Events returned from the `/logs` endpoint when using the `until` parameter were previously delayed by up to 1 second. To improve the performance of our System Log, queries to the `/logs` endpoint that include an `until` parameter may now return results that are delayed up to 10 seconds. When making requests with an `until` value that is near real-time, ensure that you allow enough of a buffer as to not miss events (e.g. 20s).

### Bug Fixed in 2018.20

* Group search queries with underscores returned incorrect results. (OKTA-164390)

### Previously Released Early Access Features 2018.20 Update

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
