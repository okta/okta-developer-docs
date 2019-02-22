---
title: Okta API Products Change Log
---

## 2018.28

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [MFA Call Factor is Generally Available (GA)](#mfa-call-factor-is-generally-available-ga)   | July 11, 2018            | July 16, 2018                                |
| [Bugs Fixed in 2018.28](#bugs-fixed-in-201828)                                                                       | July 11, 2018            | July 16, 2018                                |
| [Previously Released Early Access Features 2018.28 Update](#previously-released-early-access-features-201828-update) | Available now            | Available now                                

### MFA Call Factor is Generally Available (GA)

The MFA [call factor](/docs/api/resources/factors#factor-type) is now Generally Available (GA).

### Bugs Fixed in 2018.28

* Users received an incorrect error message when using the [System Log API](/docs/api/resources/system_log) and specifying a sort order with an unbounded `until` statement. (OKTA-175411)

 * Under certain circumstances, the [System Log API](/docs/api/resources/system_log) did not return events on the first query, but did on subsequent queries. (OKTA-174660)

### Previously Released Early Access Features 2018.28 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
