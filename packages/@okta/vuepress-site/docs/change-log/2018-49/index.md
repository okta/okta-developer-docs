---
title: Okta API Products Change Log
---

## 2018.12.0

> NOTE: Okta has changed our release model and version numbering. Under the old system, this would have been release 2019.49. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bug Fixed in 2018.12.0](#bug-fixed-in-2018120)                                                                       | December 5, 2018         | December 10, 2018                             |
| [Previously Released Early Access Features 2018.12.0 Update](#previously-released-early-access-features-2018120-update) | Available Now            | Available Now                                |

### Bug Fixed in 2018.12.0

* Queries to the `/logs` endpoint would return an HTTP 500 error if they contained encoded curly braces (`%7B`or `%7D`).

### Previously Released Early Access Features 2018.12.0 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
