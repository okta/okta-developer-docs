---
title: Okta API Products Release Notes
---

## 2018.36

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [New Device Notification Emails are Generally Available](#new-device-notification-emails-are-generally-available-ga)       | September 5, 2018           | September 10, 2018                               |
| [Email Rate Limiting](#email-rate-limiting)                          | September 5, 2018           | September 10, 2018                              |
| [New sendEmail Parameter for User Deletion and Deactivation](#new-sendemail-parameter-for-user-deletion-and-deactivation)                          | September 5, 2018           | October 15, 2018                              |
| [Support for JWTs Signed with Private Keys](#support-for-jwts-signed-with-private-keys)                          | September 5, 2018           | September 10, 2018                              |
| [System Log Event for Rate Limit Override Expiration](#system-log-event-for-rate-limit-override-expiration)                          | September 5, 2018           | September 10, 2018                              |
| [Required Properties in App User Schema](#required-properties-in-app-user-schema)                          | September 5, 2018           | September 10, 2018                              |
| [Previously Released Early Access Features 2018.36 Update](#previously-released-early-access-features-2018-36-update) | Available now            | Available now                                |

### New Device Notification Emails are Generally Available (GA)

When enabled, end users will receive a new device notification email when signing in to Okta from a new or unrecognized device. This feature is now generally available to all orgs. For more information about email notifications, refer to the New or Unknown Device Notification Emails section on [this page](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_General). <!--OKTA-186366-->

### Email Rate Limiting

Okta is introducing new rate limits for emails that are sent to users. This will help with service protection. <!--OKTA-186424-->

### New sendEmail Parameter for User Deletion and Deactivation

User deletion and deactivation requests now have an optional `sendEmail` parameter. For more information see the documentation for those endpoints:

* [DELETE /api/v1/apps/${applicationId}/users/${userId}](/docs/reference/api/apps/#remove-user-from-application)
* [DELETE /api/v1/users/${userId}](/docs/reference/api/users/#delete-user)
* [POST /api/v1/users/${userId}/lifecycle/deactivate](/docs/reference/api/users/#deactivate-user)

<!--OKTA-185729-->

### Support for JWTs Signed with Private Keys

Requests to the `/token` and `/authorize` endpoints will now accept JWTs signed with a private key. For more information see the OIDC documentation for the [token endpoint](/docs/reference/api/oidc/#token) and the [authorize endpoint](/docs/reference/api/oidc/#authorize). <!--OKTA-181514 + OKTA-186410-->

### System Log Event for Rate Limit Override Expiration

A System Log event will be generated exactly two days before a temporary API rate limit override is set to expire. The limit's expiration is set by customer support based on a window agreed upon when the override was requested. Once a limit has expired, it will no longer take effect and the customer will be subject to the [default limit for that API endpoint](/docs/reference/rate-limits/). <!--OKTA-173997-->

### Required Properties in App User Schema

API calls to [modify an app user schema](/docs/reference/api/schemas/#update-app-user-profile-schema-property) can no longer change the nullability (`required` field) of a property if that property is shown as required in the default predefined schema for that app. <!--OKTA-177449-->

### Previously Released Early Access Features 2018.36 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
