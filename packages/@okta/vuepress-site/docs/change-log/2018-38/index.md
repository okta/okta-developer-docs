---
title: Okta API Products Change Log
---

## 2018.38

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [User Sessions Deleted after Password Reset](#user-sessions-deleted-after-password-reset)                            | September 19, 2018       | October 15, 2018                             |
| [Bugs Fixed in 2018.38](#bugs-fixed-in-201838)                                                                       | September 19, 2018       | September 24, 2018                           |
| [Previously Released Early Access Features 2018.38 Update](#previously-released-early-access-features-201838-update) | Available Now            | Available Now                                |

### User Sessions Deleted after Password Reset

We now delete all sessions for a user after a successful password reset as part of the [forgot password](/docs/api/resources/authn#forgot-password) flow. <!--OKTA-187076-->

### Bugs Fixed in 2018.38

* An HTTP 500 error would occur if the JSON body sent to create a user contained a non-string value for the following [user profile](/docs/api/resources/users#profile-object) properties: `firstName`, `lastName`, `email`, `login`, `mobilePhone`, and `secondEmail`. Any non-string values for these properties will now be converted into strings after they are sent. (OKTA-170711)

### Previously Released Early Access Features 2018.38 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
