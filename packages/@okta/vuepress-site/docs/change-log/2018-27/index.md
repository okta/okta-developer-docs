---
title: Okta API Products Change Log
---

## 2018.27

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [System Log API is Generally Available (GA)](#system-log-api-is-generally-available-ga)                              | July 5, 2018            | July 9, 2018                                |
| [Bugs Fixed in 2018.27](#bugs-fixed-in-201827)                                                                       | July 5, 2018            | July 9, 2018                                |
| [Previously Released Early Access Features 2018.27 Update](#previously-released-early-access-features-201827-update) | Available now            | Available now                                |

### System Log API is Generally Available (GA)

The [System Log API](/docs/api/resources/system_log) is now Generally Available. Developers of new projects are strongly recommended to use this in lieu of the Events API.

### Bugs Fixed in 2018.27

* Users who clicked an Activation Link for an [Okta Verify factor](/docs/api/resources/factors#activate-push-factor) that had already been activated would get back an HTTP 500 error. (OKTA-146511)
* Attempting to add more than the maximum number of zones via the [Zones API](/docs/api/resources/zones) would result in an HTTP 500 error. (OKTA-175991)

### Previously Released Early Access Features 2018.27 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
