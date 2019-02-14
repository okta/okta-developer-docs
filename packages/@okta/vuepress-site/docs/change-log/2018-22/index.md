---
title: Okta API Products Change Log
---

## 2018.22

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [New Session Token Behavior is in Early Access](#new-session-token-behavior-is-in-early-access)                      | May 30, 2018             | June 4, 2018                                 |
| [System Log Events for New Device Notification Emails](#system-log-events-for-new-device-notification-emails)        | May 30, 2018             | June 4, 2018                                 |
| [Bugs Fixed in 2018.22](#bugs-fixed-in-201822)                                                                       | May 30, 2018             | June 4, 2018                                 |
| [Previously Released Early Access Features 2018.22 Update](#previously-released-early-access-features-201822-update) | Available now            | Available now                                |

### New Session Token Behavior is in Early Access

If a user has a valid session and passes a `sessionToken`, this `sessionToken` will override any existing session cookie. If the user has a valid session but passes an invalid `sessionToken`, then their existing session will be invalidated. Currently, if a user has a valid session and passes a `sessionToken`, the `sessionToken` will be ignored. If this feature is not enabled, the current behavior will continue. <!-- OKTA-152261 -->

### System Log Events for New Device Notification Emails

New device notification email events will now appear in the System Log. <!-- OKTA-170405 -->

### Bugs Fixed in 2018.22

* Default password policy settings were sometimes incorrectly applied when creating a user with a password. (OKTA-127830)
* The `/userinfo` [endpoint](/docs/api/resources/oidc#userinfo) would return an empty JSON object in the response body when using an invalid access token. (OKTA-169553)
* Some OAuth 2.0/OIDC refresh tokens would expire early. (OKTA-171056)

### Previously Released Early Access Features 2018.22 Update

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
