---
title: Okta API Products Release Notes 2018
---

## December

### Weekly Release 2018.12.2

> **Note:** Okta has changed our release model and version numbering. Under the old system, this would have been release 2018.52. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.12.2](#bugs-fixed-in-2018-12-2)                                                                       | December 27, 2018         | January 7, 2019                             |
| [Previously Released Early Access Features 2018.12.2 Update](#previously-released-early-access-features-2018-12-2-update) | Available Now            | Available Now                                |

#### Bugs Fixed in 2018.12.2

* An error would be returned if the `/apps/${applicationId}` [endpoint](/docs/reference/api/apps/#update-application) was called to update an app that did not not have a configurable `signOnMode` property. <!--OKTA-201187-->

* The [Identity Providers API](/docs/reference/api/idps/) endpoints `GET /idps/${idpId}/users`, `GET /idps/${idpId}/users/{userId}`, and `DELETE /idps/${idpId}/users/${userId}` previously required the social authentication feature, even for users related to a non-social IdP. Additionally, non-Social IdPs were not included in the results returned by `GET /users/${userId}/idps`. <!--OKTA-199631-->

* Instead of providing specific reasons for failure, [Identity Providers](/docs/reference/api/idps/) operations failed with generic `error_description` values when the Social Auth provider required user attributes in the user's profile but the attributes were missing or invalid. <!--OKTA-120115-->

* The `/users/${userId}/factors/catalog` [endpoint](/docs/reference/api/factors/#list-factors-to-enroll) returned `email` as a supported factor type even when Email Authentication was not enabled for the org in MFA settings. <!--OKTA-201633-->

#### Previously Released Early Access Features 2018.12.2 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.12.1

> **Note:** Okta has changed our release model and version numbering. Under the old system, this would have been release 2019.50. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bug Fixed in 2018.12.1](#bug-fixed-in-2018-12-1)                                                                       | December 12, 2018         | December 17, 2018                             |
| [Previously Released Early Access Features 2018.12.1 Update](#previously-released-early-access-features-2018-12-1-update) | Available Now            | Available Now                                |

#### Bug Fixed in 2018.12.1

* Requests to the same Okta Org Authorization Server's `/keys` endpoint failed if the requests originated from different domains in the same browser. (OKTA-156155)

#### Previously Released Early Access Features 2018.12.1 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.12.0

> **Note:** Okta has changed our release model and version numbering. Under the old system, this would have been release 2019.49. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bug Fixed in 2018.12.0](#bug-fixed-in-2018-12-0)                                                                       | December 5, 2018         | December 10, 2018                             |
| [Previously Released Early Access Features 2018.12.0 Update](#previously-released-early-access-features-2018-12-0-update) | Available Now            | Available Now                                |

#### Bug Fixed in 2018.12.0

* Queries to the `/logs` endpoint would return an HTTP 500 error if they contained encoded curly braces (`%7B`or `%7D`).

#### Previously Released Early Access Features 2018.12.0 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## November

### Weekly Release 2018.48

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [System Log API Returns Threat Insight Attribute](#system-log-api-returns-threat-insight-attribute)                            | November 28, 2018       | December 3, 2018                             |
| [Bugs Fixed in 2018.48](#bugs-fixed-in-2018-48)                                                                       | November 28, 2018         | December 3, 2018                             |
| [Previously Released Early Access Features 2018.48 Update](#previously-released-early-access-features-2018-48-update) | Available Now            | Available Now                                |

#### System Log API Returns Threat Insight Attribute

The `debugContext` object returned by the [System Log API](/docs/reference/api/system-log/) can now include an `okta_threat_insight` attribute to indicate that an event has been identified as a security risk. <!--OKTA-198102-->

#### Bugs Fixed in 2018.48

* Some customers could access log data outside of their allowed retention range through the [System Log API](/docs/reference/api/system-log/). <!--OKTA-196313-->

* Responses from the `/oauth2/${authServerId}/.well-known/oauth-authorization-server` [endpoint](/docs/reference/api/oidc/#well-knownoauth-authorization-server) did not include supported OpenID Connect response types in the content of the `response_types_supported` property. <!--OKTA-114737-->

#### Previously Released Early Access Features 2018.48 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |



### Weekly Release 2018.45

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Linked Objects API is Generally Available (GA)](#linked-objects-api-is-generally-available-ga)                            | November 6, 2018       | December 10, 2018                             |
| [Bugs Fixed in 2018.45](#bugs-fixed-in-2018-45)                                                                       | November 6, 2018         | November 12, 2018                             |
| [Previously Released Early Access Features 2018.45 Update](#previously-released-early-access-features-2018-45-update) | Available Now            | Available Now                                |

#### Linked Objects API is Generally Available (GA)

The [Linked Objects API](/docs/reference/api/linked-objects/) is now available to all orgs. <!--OKTA-195560-->

#### Bugs Fixed in 2018.45

* The set of roles allowed access to system log information by the [Events API](/docs/reference/api/events) did not match the set of roles allowed access by the [System Log API](/docs/reference/api/system-log/). (OKTA-194899)
* When a user tried to sign in using the Okta Sign-in Widget, they would not be prompted to enroll an optional factor, despite `multiOptionalFactorEnroll` being set to `true`. (OKTA-195195)

#### Previously Released Early Access Features 2018.45 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## October

### Weekly Release 2018.44

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.44](#bugs-fixed-in-2018-44)                                                                       | October 31, 2018         | November 5, 2018                             |
| [Previously Released Early Access Features 2018.44 Update](#previously-released-early-access-features-2018-44-update) | Available Now            | Available Now                                |

#### Bugs Fixed in 2018.44

* Temporary passwords returned by the `/users/${userId}/lifecycle/expire_password` [endpoint](/docs/reference/api/users/#expire-password) sometimes included hard-to-distinguish characters.
* Queries to the `/logs` [endpoint](/docs/reference/api/system-log/#list-events) with `since` and `until` values that were both earlier than the customer's data retention period would return an HTTP 500 error.

#### Previously Released Early Access Features 2018.44 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.42

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.42](#bugs-fixed-in-2018-42)                                                                       | October 17, 2018         | October 22, 2018                             |
| [Previously Released Early Access Features 2018.42 Update](#previously-released-early-access-features-2018-42-update) | Available Now            | Available Now                                |

#### Bugs Fixed in 2018.42

* The `/clients` [endpoint](/docs/reference/api/oauth-clients/#list-client-applications) dropped the `filter` parameter for any paginated results returned after the first page.
* Messages that were sent to devices using the [Factors API](/docs/reference/api/factors/) would sometimes return a `500` error if the message could not be sent.

#### Previously Released Early Access Features 2018.42 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.41

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Rate Limit Notifications for One App and Enterprise](#rate-limit-notifications-for-one-app-and-enterprise)                            | October 10, 2018       | October 15, 2018                             |
| [OIDC Clients Can Initiate Logout with Expired Token](#oidc-clients-can-initiate-logout-with-expired-token)                            | October 10, 2018       | October 15, 2018                             |
| [Change to User Link Editing Permissions](#change-to-user-link-editing-permissions)                            | October 10, 2018       | October 15, 2018                             |
| [Bugs Fixed in 2018.41](#bugs-fixed-in-2018-41)                                                                       | October 10, 2018         | October 15, 2018                             |
| [Previously Released Early Access Features 2018.41 Update](#previously-released-early-access-features-2018-41-update) | Available Now            | Available Now                                |

#### Rate Limit Notifications for One App and Enterprise

When an org reaches its [rate limit](/docs/reference/rate-limits/), the admin console will display a banner and the admin(s) will receive an email notification. These notifications will only appear on One App and Enterprise organizations. <!--OKTA-185719-->

#### OIDC Clients Can Initiate Logout with Expired Token

Client-initiated [logout](/docs/reference/api/oidc/#logout) now succeeds even when the ID token is no longer valid. <!--OKTA-131652-->

#### Change to User Link Editing Permissions

Editing the [link](/docs/reference/api/users/#links-object) between users now requires edit permissions for all users involved. <!--OKTA-186702-->

#### Bugs Fixed in 2018.41

* Queries to the `/logs` [endpoint](/docs/reference/api/system-log/#list-events) with values for `since` and `until` that did not specify the time to milliseconds would sometimes return events outside of the specified time range. (OKTA-191533)
* Responses from the `/events` [endpoint](/docs/reference/api/events/#list-events) would sometimes omit milliseconds from the `published` field. (OKTA-192568)

#### Previously Released Early Access Features 2018.41 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.40

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.40](#bugs-fixed-in-2018-40)                                                                       | October 3, 2018       | October 8, 2018                           |
| [Previously Released Early Access Features 2018.40 Update](#previously-released-early-access-features-2018-40-update) | Available Now            | Available Now                                |

#### Bugs Fixed in 2018.40

* Responses from the `/zones` [endpoint](/docs/reference/api/zones/#zones-api) included a duplicate of the `type` field. (OKTA-188605)
* The `/idps/credentials/keys` [endpoint](/docs/reference/api/idps/#add-x509-certificate-public-key) was requiring requests to include extra parameters. (OKTA-189780)

#### Previously Released Early Access Features 2018.40 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## September

### Weekly Release 2018.39

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.39](#bugs-fixed-in-2018-39)                                                                       | September 26, 2018       | October 1, 2018                           |
| [Previously Released Early Access Features 2018.39 Update](#previously-released-early-access-features-2018-39-update) | Available Now            | Available Now                                |

#### Bugs Fixed in 2018.39

* Requests to the `/authorize` endpoint would incorrectly prioritize values from the URI query parameter, rather than the request JWT. For more information, see the [documentation for that endpoint](/docs/reference/api/oidc/#authorize). (OKTA-187642)
* When multiple attempts were simultaneously made to update a user's phone number for the [SMS](/docs/reference/api/factors/#enroll-okta-sms-factor) or [Call](/docs/reference/api/factors/#enroll-okta-call-factor) Factor, an HTTP 500 error was sometimes returned. (OKTA-188112)
* In some situations SHA-256 [password imports](/docs/reference/api/users/#hashed-password-object) would not work. SHA-256 password import now requires the salt to be base64-encoded.

#### Previously Released Early Access Features 2018.39 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |



### Weekly Release 2018.38

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [User Sessions Deleted after Password Reset](#user-sessions-deleted-after-password-reset)                            | September 19, 2018       | October 15, 2018                             |
| [Bugs Fixed in 2018.38](#bugs-fixed-in-2018-38)                                                                       | September 19, 2018       | September 24, 2018                           |
| [Previously Released Early Access Features 2018.38 Update](#previously-released-early-access-features-2018-38-update) | Available Now            | Available Now                                |

#### User Sessions Deleted after Password Reset

We now delete all sessions for a user after a successful password reset as part of the [forgot password](/docs/reference/api/authn/#forgot-password) flow. <!--OKTA-187076-->

#### Bugs Fixed in 2018.38

* An HTTP 500 error would occur if the JSON body sent to create a user contained a non-string value for the following [user profile](/docs/reference/api/users/#profile-object) properties: `firstName`, `lastName`, `email`, `login`, `mobilePhone`, and `secondEmail`. Any non-string values for these properties will now be converted into strings after they are sent. (OKTA-170711)

#### Previously Released Early Access Features 2018.38 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |



### Weekly Release 2018.36

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [New Device Notification Emails are Generally Available](#new-device-notification-emails-are-generally-available-ga)       | September 5, 2018           | September 10, 2018                               |
| [Email Rate Limiting](#email-rate-limiting)                          | September 5, 2018           | September 10, 2018                              |
| [New sendEmail Parameter for User Deletion and Deactivation](#new-sendemail-parameter-for-user-deletion-and-deactivation)                          | September 5, 2018           | October 15, 2018                              |
| [Support for JWTs Signed with Private Keys](#support-for-jwts-signed-with-private-keys)                          | September 5, 2018           | September 10, 2018                              |
| [System Log Event for Rate Limit Override Expiration](#system-log-event-for-rate-limit-override-expiration)                          | September 5, 2018           | September 10, 2018                              |
| [Required Properties in App User Schema](#required-properties-in-app-user-schema)                          | September 5, 2018           | September 10, 2018                              |
| [Previously Released Early Access Features 2018.36 Update](#previously-released-early-access-features-2018-36-update) | Available now            | Available now                                |

#### New Device Notification Emails are Generally Available (GA)

When enabled, end users will receive a new device notification email when signing in to Okta from a new or unrecognized device. This feature is now generally available to all orgs. For more information about email notifications, refer to the New or Unknown Device Notification Emails section on [this page](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_General). <!--OKTA-186366-->

#### Email Rate Limiting

Okta is introducing new rate limits for emails that are sent to users. This will help with service protection. <!--OKTA-186424-->

#### New sendEmail Parameter for User Deletion and Deactivation

User deletion and deactivation requests now have an optional `sendEmail` parameter. For more information see the documentation for those endpoints:

* [DELETE /api/v1/apps/${applicationId}/users/${userId}](/docs/reference/api/apps/#remove-user-from-application)
* [DELETE /api/v1/users/${userId}](/docs/reference/api/users/#delete-user)
* [POST /api/v1/users/${userId}/lifecycle/deactivate](/docs/reference/api/users/#deactivate-user)

<!--OKTA-185729-->

#### Support for JWTs Signed with Private Keys

Requests to the `/token` and `/authorize` endpoints will now accept JWTs signed with a private key. For more information see the OIDC documentation for the [token endpoint](/docs/reference/api/oidc/#token) and the [authorize endpoint](/docs/reference/api/oidc/#authorize). <!--OKTA-181514 + OKTA-186410-->

#### System Log Event for Rate Limit Override Expiration

A System Log event will be generated exactly two days before a temporary API rate limit override is set to expire. The limit's expiration is set by customer support based on a window agreed upon when the override was requested. Once a limit has expired, it will no longer take effect and the customer will be subject to the [default limit for that API endpoint](/docs/reference/rate-limits/). <!--OKTA-173997-->

#### Required Properties in App User Schema

API calls to [modify an app user schema](/docs/reference/api/schemas/#update-app-user-profile-schema-property) can no longer change the nullability (`required` field) of a property if that property is shown as required in the default predefined schema for that app. <!--OKTA-177449-->

#### Previously Released Early Access Features 2018.36 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## August

### Weekly Release 2018.35

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.35](#bugs-fixed-in-2018-35)                                                                       | August 29, 2018          | September 4, 2018                            |
| [Previously Released Early Access Features 2018.35 Update](#previously-released-early-access-features-2018-35-update) | Available now            | Available now                                |

#### Bugs Fixed in 2018.35

* Search queries to the [/user endpoint](/docs/reference/api/users/#list-users-with-search) with an invalid `after` parameter would return an HTTP 500 error. (OKTA-185186)

#### Previously Released Early Access Features 2018.35 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |

### Weekly Release 2018.33

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.33](#bugs-fixed-in-2018-33)                                                                       | August 15, 2018           | August 20, 2018                              |
| [Previously Released Early Access Features 2018.33 Update](#previously-released-early-access-features-2018-33-update) | Available now            | Available now                                |

#### Bugs Fixed in 2018.33

* If an SMS factor was used within 30 seconds of the factor being auto-activated, verification would fail. (OKTA-178568)
* In some instances, Org administrators would not be allowed to create new users, despite having the proper permissions. Additionally, the system log erroneously showed successful user creation. (OKTA-169709)

#### Previously Released Early Access Features 2018.33 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |



### Weekly Release 2018.32

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Interstitial Page Settings are Generally Available (GA)](#interstitial-page-settings-are-generally-available)       | August 8, 2018           | September 2018                               |
| [New System Log Event Type for Denied Events](#new-system-log-event-type-for-denied-events)                          | August 8, 2018           | August 13, 2018                              |
| [Bugs Fixed in 2018.32](#bugs-fixed-in-2018-32)                                                                       | August 8, 2018           | August 13, 2018                              |
| [Previously Released Early Access Features 2018.32 Update](#previously-released-early-access-features-2018-32-update) | Available now            | Available now                                |


#### Interstitial Page Settings are Generally Available

You can now disable the Okta loading animation that appears during a login redirect to your application. For more information, see [Manage the Okta interstitial page](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Settings_Customization).

#### New System Log Event Type for Denied Events

The [System Log](/docs/reference/api/system-log/) now reports when requests are denied due to a blacklist rule (such as a IP network zone or location rule). These events are logged with the event type `security.request.blocked`. (OKTA-178982)

#### Bugs Fixed in 2018.32

* Fixed a bug that affected delegated authentication users: in rare cases, the user appeared to be active when locked out, or vice versa. (OKTA-180932)
* The Apps API now [returns an error](/docs/reference/api/apps/#response-example-self-service-application-assignment-not-available) if changing the Application's self-service assignment settings could result in an insecure state. (OKTA-182497)

#### Previously Released Early Access Features 2018.32 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |



### Weekly Release 2018.31

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.31](#bugs-fixed-in-2018-31)                                                                       | August 1, 2018           | August 6, 2018                               |
| [Previously Released Early Access Features 2018.31 Update](#previously-released-early-access-features-2018-31-update) | Available now            | Available now                                |


#### Bugs Fixed in 2018.31

* Fixed an issue in the OpenID Connect [logout endpoint](/docs/reference/api/oidc/#logout) where performing logout with an expired session resulted in an error instead of following the `post_logout_redirect_uri`. (OKTA-180521)

* Removed System Logs entries for [granting refresh tokens](/docs/guides/refresh-tokens/) in token requests with the `refresh_token` grant type (since this grant type simply returns the original refresh token). This fix applies to both [custom Authorization Servers](/docs/reference/api/oidc/#composing-your-base-url) and the Okta Org Authorization Server. (OKTA-178335)

* Fixed issues with the [User-Consent Grant Management API](/docs/reference/api/users/#user-consent-grant-operations): added missing value to `issuer`, removed `issuerId`, removed HAL links for issuer and revoke, and added hints for self GET and DELETE.  (OKTA-175296)

* Fixed a bug where SAML apps [created using the API](/docs/reference/api/apps/#add-custom-saml-application) could not enable `honorForceAuthn`. (OKTA-166146)

* Fixed an issue where `login_hint` was ignored when using OAuth consent with a custom Authorization Server. (OKTA-164836)


#### Previously Released Early Access Features 2018.31 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## July

### Weekly Release 2018.29

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.29](#bugs-fixed-in-2018-29)                                                                       | July 18, 2018            | July 23, 2018                                |
| [Previously Released Early Access Features 2018.29 Update](#previously-released-early-access-features-2018-29-update) | Available now            | Available now


#### Bugs Fixed in 2018.29

* Using the [Zones API](/docs/reference/api/zones/) to modify an existing zone that is blacklisted removed the blacklisting and coverted it to a normal IP Zone. (OKTA-176610)
* Using the [Applications API](/docs/reference/api/apps/) to create an OAuth client caused an error if the `credentials.oauthClient` property was not provided, even though it is not required. (OKTA-179275)
* The System Log CSV report did not contain a value for `AuthenticationContext.issuer` for the event type `user.authentication.authenticate`. (OKTA-147165)


#### Previously Released Early Access Features 2018.29 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.28

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [MFA Call Factor is Generally Available (GA)](#mfa-call-factor-is-generally-available-ga)   | July 11, 2018            | July 16, 2018                                |
| [Bugs Fixed in 2018.28](#bugs-fixed-in-2018-28)                                                                       | July 11, 2018            | July 16, 2018                                |
| [Previously Released Early Access Features 2018.28 Update](#previously-released-early-access-features-2018-28-update) | Available now            | Available now

#### MFA Call Factor is Generally Available (GA)

The MFA [call factor](/docs/reference/api/factors/#factor-type) is now Generally Available (GA).

#### Bugs Fixed in 2018.28

* Users received an incorrect error message when using the [System Log API](/docs/reference/api/system-log/) and specifying a sort order with an unbounded `until` statement. (OKTA-175411)

 * Under certain circumstances, the [System Log API](/docs/reference/api/system-log/) did not return events on the first query, but did on subsequent queries. (OKTA-174660)

#### Previously Released Early Access Features 2018.28 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.27

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [System Log API is Generally Available (GA)](#system-log-api-is-generally-available-ga)                              | July 5, 2018            | July 9, 2018                                |
| [Bugs Fixed in 2018.27](#bugs-fixed-in-2018-27)                                                                       | July 5, 2018            | July 9, 2018                                |
| [Previously Released Early Access Features 2018.27 Update](#previously-released-early-access-features-2018-27-update) | Available now            | Available now                                |

#### System Log API is Generally Available (GA)

The [System Log API](/docs/reference/api/system-log/) is now Generally Available. Developers of new projects are strongly recommended to use this in lieu of the Events API.

#### Bugs Fixed in 2018.27

* Users who clicked an Activation Link for an [Okta Verify factor](/docs/reference/api/factors/#activate-push-factor) that had already been activated would get back an HTTP 500 error. (OKTA-146511)
* Attempting to add more than the maximum number of zones via the [Zones API](/docs/reference/api/zones/) would result in an HTTP 500 error. (OKTA-175991)

#### Previously Released Early Access Features 2018.27 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## June

### Weekly Release 2018.25

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Better /userinfo Errors](#better-userinfo-errors)                                                                  | June 20, 2018            | June 25, 2018                                |
| [Bugs Fixed in 2018.25](#bugs-fixed-in-2018-25)                                                                       | June 20, 2018            | June 25, 2018                                |
| [Previously Released Early Access Features 2018.25 Update](#previously-released-early-access-features-2018-25-update) | Available now            | Available now                                |

#### Better /userinfo Errors

The following information has been added to the `userinfo` endpoint's error response:

* `authorization_uri`
* `realm`
* `resource`
* a list of required scopes in the `scope` parameter <!-- OKTA-170686 -->

#### Bugs Fixed in 2018.25

* In certain situations, if a call was made to the OAuth 2.0/OIDC [/authorize endpoint](/docs/reference/api/oidc/#authorize) with `response_mode` set to  `okta_post_message`, an `HTTP 500` error would return. (OKTA-175326)
* Removing all permissions on a schema attribute would return a `READ_ONLY` permission. The response now correctly contains a `READ_WRITE` permission. (OKTA-173030)
* If an [Authorization Server's](/docs/reference/api/authorization-servers/) `redirect_uri` was too long, an `HTTP 500` error would return. (OKTA-171950)
* The `phoneExtension` property would not be returned in `GET` requests to the Factors API's `catalog` endpoint. (OKTA-108859)

#### Previously Released Early Access Features 2018.25 Update

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


### Weekly Release 2018.24

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [User Login Pattern Validation](#user-login-pattern-validation)                                                      | June 13, 2018            | June 18, 2018                                |
| [Bugs Fixed in 2018.24](#bugs-fixed-in-2018-24)                                                                       | June 13, 2018            | June 18, 2018                                |
| [Previously Released Early Access Features 2018.24 Update](#previously-released-early-access-features-2018-24-update) | Available now            | Available now                                |

#### User Login Pattern Validation

A user's `login` no longer needs to be in the form of an email address.  Instead the login is validated against a `pattern` property stored in the User Schema, which can be set to certain Regular Expressions.  If no pattern is set, the default validation requires email addresses. More information can be found in the [User](/docs/reference/api/users) and [Schema](/docs/reference/api/schemas/) API references. <!-- OKTA-166157 -->

#### Bugs Fixed in 2018.24

* Queries to the `/logs` endpoint with a `since` parameter value of less than 1 minute ago would return a `500` error. (OKTA-174239)
* It was possible to set an access policy rule with a `refreshTokenWindowMinutes` value of `0` (infinite). (OKTA-171891)
* The System Log would not display OpenID Connect App assignment and un-assignment events. (OKTA-168223)

#### Previously Released Early Access Features 2018.24 Update

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


### Weekly Release 2018.23

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Factors API Now Supports U2F](#factors-api-now-supports-u2f)                      | June 6, 2018             | June 11, 2018                                 |
| [Network Selection Modes Deprecated](#network-selection-modes-deprecated)        | June 6, 2018             | June 11, 2018                                 |
| [Better Signing Key Errors](#better-signing-key-errors)        | June 6, 2018             | June 11, 2018                                 |
| [Previously Released Early Access Features 2018.23 Update](#previously-released-early-access-features-2018-23-update) | Available now            | Available now                                |

#### Factors API Now Supports U2F

Enrollment, activation, and verification of U2F factors are now supported in the [Factors API](/docs/reference/api/factors/). <!-- OKTA-112705 -->

#### Network Selection Modes Deprecated

Two deprecated network selection modes (`ON_NETWORK `and `OFF_NETWORK`) have been removed from the [Network Condition Object](/docs/reference/api/policy/#NetworkConditionObject). They have been replaced by the `ZONE` type. <!-- OKTA-172947 -->

#### Better Signing Key Errors

If signing keys cannot be generated for a new Authorization Server, a more descriptive error will be returned. <!-- OKTA-170357 -->

#### Previously Released Early Access Features 2018.23 Update

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


## May

### Weekly Release 2018.22

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [New Session Token Behavior is in Early Access](#new-session-token-behavior-is-in-early-access)                      | May 30, 2018             | June 4, 2018                                 |
| [System Log Events for New Device Notification Emails](#system-log-events-for-new-device-notification-emails)        | May 30, 2018             | June 4, 2018                                 |
| [Bugs Fixed in 2018.22](#bugs-fixed-in-2018-22)                                                                       | May 30, 2018             | June 4, 2018                                 |
| [Previously Released Early Access Features 2018.22 Update](#previously-released-early-access-features-2018-22-update) | Available now            | Available now                                |

#### New Session Token Behavior is in Early Access

If a user has a valid session and passes a `sessionToken`, this `sessionToken` will override any existing session cookie. If the user has a valid session but passes an invalid `sessionToken`, then their existing session will be invalidated. Currently, if a user has a valid session and passes a `sessionToken`, the `sessionToken` will be ignored. If this feature is not enabled, the current behavior will continue. <!-- OKTA-152261 -->

#### System Log Events for New Device Notification Emails

New device notification email events will now appear in the System Log. <!-- OKTA-170405 -->

#### Bugs Fixed in 2018.22

* Default password policy settings were sometimes incorrectly applied when creating a user with a password. (OKTA-127830)
* The `/userinfo` [endpoint](/docs/reference/api/oidc/#userinfo) would return an empty JSON object in the response body when using an invalid access token. (OKTA-169553)
* Some OAuth 2.0/OIDC refresh tokens would expire early. (OKTA-171056)

#### Previously Released Early Access Features 2018.22 Update

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


### Weekly Release 2018.20

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [System Log Entry Delay Change](#system-log-entry-delay-change)| May 15, 2018 | May 29, 2018 |
| [Previously Released Early Access Features 2018.20 Update](#previously-released-early-access-features-2018-20-update) | Available now | Available now |

#### System Log Entry Delay Change

Events returned from the `/logs` endpoint when using the `until` parameter were previously delayed by up to 1 second. To improve the performance of our System Log, queries to the `/logs` endpoint that include an `until` parameter may now return results that are delayed up to 10 seconds. When making requests with an `until` value that is near real-time, ensure that you allow enough of a buffer as to not miss events (e.g. 20s).

#### Bug Fixed in 2018.20

* Group search queries with underscores returned incorrect results. (OKTA-164390)

#### Previously Released Early Access Features 2018.20 Update

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


### Weekly Release 2018.19

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [ID Tokens Can Be Refreshed](#id-tokens-can-be-refreshed)| May 9, 2018 | May 14, 2018 |
| [Custom URL Domains are in Early Access](#custom-url-domains-are-in-early-access)| May 9, 2018 | May 14, 2018 |
| [Custom Okta-hosted Sign-In Page is in Early Access](#custom-okta-hosted-sign-in-page-is-in-early-access)| May 9, 2018 | May 14, 2018 |
| [Custom Error Page is in Early Access](#custom-error-page-is-in-early-access)| May 9, 2018 | May 14, 2018 |
| [Bugs Fixed in 2018.19](#bugs-fixed-in-2018-19) | May 9, 2018 | May 14, 2018 |
| [Previously Released Early Access Features 2018.19 Update](#previously-released-early-access-features-2018-19-update) | Available now | Available now |

#### ID Tokens Can Be Refreshed

OpenID Connect ID tokens can now be retrieved using a refresh token. For more information, see our [Open ID Connect Reference](/docs/reference/api/oidc/).

#### Custom URL Domains are in Early Access

You can customize your Okta org by replacing the Okta domain name with a custom URL domain name that you specify. For example, if the URL of your Okta org is `https://${yourOktaDomain}`, you can configure a custom URL for the org such as `https://id.example.com`. For details, see the [Configure a custom URL domain](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_custom_url_domain).

#### Custom Okta-hosted Sign-In Page is in Early Access

You can customize the text and the look and feel of the Okta-hosted sign-in page using form controls and an embedded HTML editor. When used together with [custom URL domain](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_custom_url_domain) (required) and [custom Okta-hosted error page](/docs/guides/custom-error-pages/overview/), this feature offers a fully customized end-user sign-in experience hosted by Okta. For details, see [Configure a custom Okta-hosted sign-in page](/docs/guides/style-the-widget/style-okta-hosted/).

#### Custom Error Page is in Early Access

You can customize the text and the look and feel of error pages using an embedded HTML editor. When used together with [custom URL domain](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_custom_url_domain) (required) and [custom Okta-hosted sign-in page](/docs/guides/style-the-widget/style-okta-hosted/), this feature offers a fully customized error page. For details, see [Configure a custom error page](/docs/guides/custom-error-pages/overview/).

#### Bugs Fixed in 2018.19

* Delays were experienced when deleting users. As a result of the fix, one will notice a period of time between when the deletion was initiated and when it completes.  During the period, the user will still be visible, but the deletion cannot be reversed. (OKTA-157884)

* OAuth 2.0 and OIDC requests made with redirect URLs that contained underscores in the domain name would result in an error. (OKTA-167483)

#### Previously Released Early Access Features 2018.19 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows Is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.18

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Authentication Object for Step-up Authentication Is in Early Access](#authentication-object-for-step-up-authentication-is-in-early-access) | May 2, 2018 | May 7, 2018 |
| [New Version of the Okta Sign-In Widget](#new-version-of-the-okta-sign-in-widget) | Available Now | Available Now |
| [Bug Fixed in 2018.18](#bug-fixed-in-2018-18) | May 2, 2018 | May 7, 2018 |
| [Previously Released Early Access Features 2018.18 Update](#previously-released-early-access-features-2018-18-update) | Available now | Available now |

#### Authentication Object for Step-up Authentication Is in Early Access

During [SP-initiated](/docs/reference/api/authn/#sp-initiated-step-up-authentication) or [IdP-initiated](/docs/reference/api/authn/#idp-initiated-step-up-authentication) authentication, use the [Authentication Object](/docs/reference/api/authn/#authentication-object) to represent details that the target resource is using.

The Authentication Object is an [Early Access feature](/docs/reference/releases-at-okta/).

#### New Version of the Okta Sign-In Widget

[Version 2.8.0 of the Okta Sign-In Widget](https://www.npmjs.com/package/@okta/okta-signin-widget) provides new features, notable changes, and bug fixes. For details, visit the [okta-signin-widget repository](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-2.8.0).


#### Bug Fixed in 2018.18

If the configured default IdP was set to inactive, Okta still used the inactive IdP as the primary endpoint for user authentications, causing authentications to fail. (OKTA-137758)

#### Previously Released Early Access Features 2018.18 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows Is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |



## April

### Weekly Release 2018.17

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Bugs Fixed in 2018.17](#bugs-fixed-in-2018-17) | April 24, 2018 | May 1, 2018 |
| [Previously Released Early Access Features 2018.17 Update](#previously-released-early-access-features-2018-17-update) | Available now | Available now |

#### Bugs Fixed in 2018.17

* If an incorrect `appInstanceId` was supplied as the IdP parameter in a request to the `/authorize` [endpoint](/docs/reference/api/oidc/#authorize), an `HTTP 500` error was thrown. (OKTA-166417)

* When Okta parsed login names it failed to support addresses enclosed in double quotes as described in [RFC 3696](https://tools.ietf.org/html/rfc3696). (OKTA-164092)

#### Previously Released Early Access Features 2018.17 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |

### Weekly Release 2018.17

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Bugs Fixed in 2018.17](#bugs-fixed-in-2018-17) | April 24, 2018 | May 1, 2018 |
| [Previously Released Early Access Features 2018.17 Update](#previously-released-early-access-features-2018-17-update) | Available now | Available now |

#### Bugs Fixed in 2018.17

* If an incorrect `appInstanceId` was supplied as the IdP parameter in a request to the `/authorize` [endpoint](/docs/reference/api/oidc/#authorize), an `HTTP 500` error was thrown. (OKTA-166417)

* When Okta parsed login names it failed to support addresses enclosed in double quotes as described in [RFC 3696](https://tools.ietf.org/html/rfc3696). (OKTA-164092)

#### Previously Released Early Access Features 2018.17 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


### Weekly Release 2018.15

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Enhanced Feature: API Support for Assigning App Instance to App Admins](#enhanced-feature-api-support-for-assigning-app-instance-to-app-admins) | April 11, 2018 | April 15, 2018 |
| [Bug Fixed in 2018.15](#bug-fixed-in-2018-15) | April 11, 2018 | April 16, 2018 |
| [Previously Released Early Access Features 2018.15 Update](#previously-released-early-access-features-2018-15-update) | Available now | Available now |

#### Enhanced Feature: API Support for Assigning App Instance to App Admins

You can add an app instance target to an `APP_ADMIN` role assignment via the API. Previously an app instance target could be added to the role assignment using the Okta administrators UI only.

When you assign an app instance target to this role assignment, the scope of the role assignment changes from all app targets to just the specified target. Thus you can use this feature to create different `APP_ADMIN` role assignments for different apps in your org.

For details, visit the [Roles API documentation](/docs/reference/api/roles/#add-app-target-to-app-administrator-role). <!-- OKTA-164900 -->

#### Bug Fixed in 2018.15

This fix applies if the MFA soft lock for delegated authentication feature is enabled. When a user made multiple failed MFA attempts and was locked out, the user `status` was updated to `ACTIVE` instead of the correct value, `LOCKED_OUT`. (OKTA-164900)

#### Previously Released Early Access Features 2018.15 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |

### Weekly Release 2018.14

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Linked Objects API in Early Access (EA)](#linked-objects-api-in-early-access-ea) | April 4, 2018 | April 9, 2018 |
| [Client SDKs Version 1.0](#client-sdks-version-10) | Available Now | Available Now |
| [Bug Fixed for 2018.14](#bug-fixed-for-2018-14) | April 4, 2018 | April 9, 2018 |
| [Previously Released Early Access Features](#previously-released-early-access-features) | Available now | Available now |

#### Linked Objects API in Early Access (EA)

Users have relationships to each other, like manager and subordinate or customer and sales representative. You can create users with relationships by using the [Linked Objects API](/docs/reference/api/linked-objects/).

Okta allows you to create up to 200 linked object definitions. These definitions are one-to-many:

* A manager has many subordinates
* A sales representative has many customers
* A case worker has many clients

Of course, most organizations have more than one manager or sales representative. You can create the linked object definition once, then assign the `primary` relationship to as many users as you have people in that relationship.

You can assign the `associated` relationship for a single `primary` user to as many users as needed. The `associated` user can be related to only one `primary` per linked object definition. But a user can be assigned to more than one linked object definition.

For more details:

* [Linked Objects API documentation](/docs/reference/api/linked-objects/) <!-- OKTA-161674 -->

#### Client SDKs Version 1.0

We published the 1.0 version of the following client SDKs:

* [React SDK](https://github.com/okta/okta-oidc-js/releases/tag/%40okta%2Fokta-react%401.0.0)
* [Angular SDK](https://github.com/okta/okta-oidc-js/releases/tag/%40okta%2Fokta-angular%401.0.0)
* [Vue SDK](https://github.com/okta/okta-oidc-js/releases/tag/%40okta%2Fokta-vue%401.0.0)
* [iOS SDK](https://github.com/okta/okta-oidc-ios/releases/tag/1.0.0)

Visit each SDK for a complete list of new features, enhancements, and bug fixes. <!-- OKTA-164979 -->

#### Bug Fixed for 2018.14

* If someone was able to obtain a user's activation email or password reset email and attempt to log in before the real user completed logging in, that person could access the account at the same time as the real user. (OKTA-85691)

#### Previously Released Early Access Features

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |


## March

### Weekly Release 2018.12

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Change to App Variable Name Incrementing](#change-to-app-variable-name-incrementing) | March 21, 2018 | March 26, 2018 |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) | March 21, 2018 | March 26, 2018 |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) | Available Now | Available Now |
| [Password Imports with Salted SHA-256 Algorithm is in Early Access (EA)](#password-imports-with-salted-sha-256-algorithm-is-in-early-access-ea) | Available Now | Available Now |
| [Bug Fixed for 2018.12](#bug-fixed-for-2018-12) | March 21, 2018 | March 26, 2018 |

#### Change to App Variable Name Incrementing

When creating multiple instances of the same app, each instance of the app has a unique Variable Name. This Variable Name is used as part of the Okta Expression Language. Previously each instance was incrementally numbered (`salesforce_1`, `salesforce_2`, etc), but going forward each instance will instead have a 7-character alphanumeric string appended to its Variable Name. To find your app's Variable Name, go into the Profile Editor for that app. This change only affects newly created apps. <!-- OKTA-158282 -->

#### Token Management API Is in Early Access (EA)

Use the Token Management API to view and revoke OAuth 2.0 and OpenID Connect refresh tokens by [end user](/docs/reference/api/users/#user-oauth-20-token-management-operations), [Custom Authorization Server](/docs/reference/api/authorization-servers/#oauth-20-token-management-operations), or [client app](/docs/reference/api/apps/#application-oauth-20-token-operations). <!-- OKTA-145525 -->

#### Bug Fixed for 2018.12

* `GET` requests to the `/authorize` [endpoint](/docs/reference/api/oidc/#authorize) with `response_mode=form_post` would return an HTML page with a title `<span>`. (OKTA-162709)


### Weekly Release 2018.11

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [API Support for IdP-initiated Authentication](#api-support-for-idp-initiated-authentication) | March 14 | March 19 |
| [New Powershell Module for TLS 1.2 Compatibility](#new-powershell-module-for-tls-12-compatibility) | Available Now | Available Now |
| [Rate Limit for System Log Increased](#rate-limit-for-system-log-increased) | Available Now | Available Now |
| [New Version of Okta Sign-in Widget](#new-version-of-okta-sign-in-widget) | Available Now | Available Now |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) | Available Now | Available Now |
| [Password Imports with Salted SHA-256 Algorithm is in Early Access (EA)](#password-imports-with-salted-sha-256-algorithm-is-in-early-access-ea) | Available Now | Available Now |
| [Bugs Fixed for 2018.11](#bugs-fixed-for-2018-11) | March 14, 2018 | March 19, 2018 |

#### API Support for IdP-initiated Authentication

Use this feature to allow a client to specify the application right away during an authentication request, instead of taking the user through "step-up" authentication in a separate request. [Documentation](/docs/reference/api/authn/#sp-initiated-step-up-authentication) <!-- OKTA-160275 -->

#### New Powershell Module for TLS 1.2 Compatibility

The new version of Okta's Powershell module is compatible with TLS 1.2. [Documentation](https://www.powershellgallery.com/packages/Okta.Core.Automation/1.0.1)<!-- OKTA-161239 -->

#### Rate Limit for System Log Increased

The rate limit for GET requests to `/api/v1/logs` has been increased from 60 per minute to 120. [Documentation](/docs/reference/rate-limits/#okta-api-endpoints-and-per-minute-limits)

#### New Version of Okta Sign-in Widget

Version 2.7.0 of the Okta Sign-in Widget provides new features, notable changes, and bug fixes. For details, visit [the `okta-signin-widget` repository](https://github.com/okta/okta-signin-widget/releases).

#### Bugs Fixed for 2018.11

* An incorrect error message was returned when a blank password was specified in a password reset request. (OKTA-144982)
* If administrators in an org with the Admin Console enabled used the Classic user interface instead, and had no apps assigned, they couldn't access their own user home page. (OKTA-152324)
* For [the System Log API](/docs/reference/api/system-log/), the `displayName` in the Target object was set to `Unknown` if the `eventType` was `user.authentication.sso` and if the value didn't exist in the profile editor.
This behavior matches the behavior in `/events`. (OKTA-156484)


### Weekly Release 2018.10

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [API Access Management is Generally Available (GA) in Production](#api-access-management-is-generally-available-ga-in-production) | Available now   | March 12, 2018  |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) | March 7, 2018 | March 12, 2018 |
| [Password Imports with Salted SHA-256 Algorithm is in Early Access (EA)](#password-imports-with-salted-sha-256-algorithm-is-in-early-access-ea) | March 7, 2018 | March 12, 2018 |
| [New Parameter for Authentication with Okta Verify with Auto-Push](#new-parameter-for-authentication-with-okta-verify-with-auto-push)   | March 7, 2018 | March 12, 2018 |
| [System Log Changes for 2018.10](#system-log-changes-for-2018-10) | March 7, 2018 | March 12, 2018 |
| [Bugs Fixed for 2018.10](#bugs-fixed-for-2018-10) | March 7, 2018 | March 12, 2018 |

#### API Access Management is Generally Available (GA) in Production

Secure your APIs with API Access Management, Okta's implementation of the OAuth 2.0 authorization framework. API Access Management uses the Okta Identity platform to enable powerful control over access to your APIs. API Access Management can be controlled through the administrator UI as well as a rich set of APIs for client, user, and policy management.

Generally Available (GA) in preview orgs since February 7, 2018, API Access Management is scheduled to be GA in production orgs starting March 12, 2018.

For more information, see [OAuth 2.0 and Okta](/docs/reference/api/oidc/). <!--OKTA-153127-->

#### System Log API is in Early Access (EA)

The Okta System Log records system events related to your organization in order to provide an audit trail that can be used to understand platform activity and to diagnose problems.

The Okta System Log API provides near real-time read-only access to your organization's system log and is the programmatic counterpart of the [System Log UI](https://help.okta.com/en/prod/okta_help_CSH.htm#Reports_System_Log).

Often the terms "event" and "log event" are used interchangeably. In the context of this API, an "event" is an occurrence of interest within the system and "log" or "log event" is the recorded fact.

Notes:

* The System Log API contains much more [structured data](/docs/reference/api/system-log/#logevent-object) than [the Events API](/docs/reference/api/events/#event-model).
* The System Log API supports [additional SCIM filters](/docs/reference/api/system-log/#request-parameters) and the `q` query parameter, because of the presence of more structured data than [the Events API](/docs/reference/api/events/#event-model). <!-- OKTA-160902 OKTA-160880 -->

#### Password Imports with Salted SHA-256 Algorithm is in Early Access (EA)

You can use the salted SHA-256 hash type when [importing passwords](/docs/reference/api/users/#create-user-with-imported-hashed-password). <!-- OKTA-160288 -->

#### New Parameter for Authentication with Okta Verify with Auto-Push

We have added [an optional URL parameter, `autoPush` ](/docs/reference/api/authn/#request-parameters-for-verify-push-factor) that allows Okta to store the user's Auto-Push preference when verifying Okta Verify with Auto-Push. This parameter is only necessary when implementing custom login flows that do not use the Okta Sign-In Widget. <!-- OKTA-155563 -->

#### System Log Changes for 2018.10

* If a query to `/logs` timed out, an HTTP 504 error was returned. Now an HTTP 500 error will be returned. This aligns `/logs` error responses with other Okta APIs, and ensures implementation details are not leaked to API consumers. (OKTA-159642)
* The following changes to error codes related to the system log were made to make them consistent with [Okta error codes](/docs/reference/error-codes/):
    * `MEDIA_TYPE_NOT_ACCEPTED_EXCEPTION` replaced by `UNSUPPORTED_MEDIA_TYPE`
    * `OPP_INVALID_PAGINATION_PROPERTIES` replaced by `INVALID_PAGING_EXCEPTION`
    * `OPP_INVALID_SCIM_FILTER` replaced by `INVALID_SEARCH_CRITERIA_EXCEPTION` <!-- OKTA-149847 -->

#### Bugs Fixed for 2018.10

* GET requests to list 200 or more apps were taking a long time to complete. (OKTA-158391)
* Invalid IP addresses in the `X-Forwarded-For` header caused a null pointer exception (HTTP 500 `NullPointerException`) during primary authentication. (OKTA-159414)
* [List User with Search requests](/docs/reference/api/users/#list-users-with-search) in preview orgs failed to return pagination links. (OKTA-160424)


## February

### Weekly Release 2018.09

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [API Access Management is Generally Available in Preview](#api-access-management-is-generally-available-in-preview) | February 7, 2018               | March 12, 2018  |
| [User Consent for OAuth 2.0 and OpenID Connect Flows in Early Availability (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) | February 28, 2018               | March 5, 2018 |
| [Sessions API Supports HTTP Header Prefer](#sessions-api-supports-http-header-prefer)  | February 28, 2018               | March 5, 2018 |
| [User Schema API Allows Nullable `firstName`, `lastName`](#user-schema-api-allows-nullable-firstname-lastname) | February 28, 2018 | March 5, 2018 |
| [Improved Response Mode for OAuth 2.0 and OpenID Connect Requests](#improved-response-mode-for-oauth-20-and-openid-connect-requests)  | February 28, 2018               | March 5, 2018 |
| [Change to `/authorize` Response for `prompt` for OAuth 2.0 and OpenID Connect Requests](#change-to-authorize-response-for-prompt-for-oauth-20-and-openid-connect-requests)  | February 28, 2018               | March 5, 2018 |
| [Improved System Log Behavior for Date Queries](#improved-system-log-behavior-for-date-queries)  | February 28, 2018               | March 5, 2018 |
| [System Log Message Changes Related to Authorization Servers](#system-log-message-changes-related-to-authorization-servers)  | February 28, 2018               | March 5, 2018 |
| [Bugs Fixed for 2018.09](#bugs-fixed-for-2018-09)  | February 28, 2018               | March 5, 2018 |

#### User Consent for OAuth 2.0 and OpenID Connect Flows in Early Availability (EA)

A consent represents a user's explicit permission to allow an application to access resources protected by scopes. As part of an OAuth 2.0 or OpenID Connect authentication flow, you can prompt the user with a page to approve your app's access to specified resources.

Consent grants are different from tokens because a consent can outlast a token, and there can be multiple tokens with varying sets of scopes derived from a single consent. When an application comes back and needs to get a new access token, it may not need to prompt the user for consent if they have already consented to the specified scopes. Consent grants remain valid until the user manually revokes them, or until the user, application, authorization server or scope is deactivated or deleted.

To configure an authorization or authentication flow to include a user consent page:

1. Verify that you have the API Access Management feature enabled, and request that User Consent also be enabled.
2. Create an app via the Apps API with the appropriate values for `tos_uri`, `policy_uri`, and `consent_method`. ([Details](/docs/reference/api/apps/#settings-7))

    Note: You can also configure an existing app in the administrator UI: **Applications > [Application Name] > General > User Consent**.

3. Ensure that your authentication or authorization flow is configured properly. The combination of `prompt` in the `/authorize` request, `consent_method` set on the app in the previous step, and `consent`, a property set on scopes, controls whether a user consent window is displayed during the authentication flow. [Details](/docs/reference/api/apps/#settings-7)

<!-- OKTA-158107 -->

#### Sessions API Supports HTTP Header Prefer

Okta now supports [the HTTP Header `Prefer`](https://tools.ietf.org/html/rfc7240#section-4.2) in [the Sessions API for refreshing sessions](/docs/reference/api/sessions/#refresh-current-session). You can extend the session lifetime, but skip any processing work related to building the response body.

#### Example Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/sessions/me/refresh"
```
Note: `me` can also be an ID.

#### Example Response

```http
HTTP/1.1 204 No Content
Preference-Applied: return=minimal
```
<!-- OKTA-152559 -->


#### User Schema API Allows Nullable `firstName`, `lastName`

You can set `firstName` or `lastName` to be nullable in [the User Profile Base sub-schema](/docs/reference/api/schemas/#user-profile-base-subschema). These properties are defined in a profile sub-schema with the resolution scope `#base`.

#### Improved Response Mode for OAuth 2.0 and OpenID Connect Requests

For [the `form_post` response mode](/docs/reference/api/oidc/#parameter-details), we have reduced the HTML content returned in an OpenID Connect or OAuth 2.0 request. Now the response is only a form containing the requested tokens (access token, ID token, or both) and JavaScript to post the form. <!-- OKTA-96521 -->

#### Change to `/authorize` Response for `prompt` for OAuth 2.0 and OpenID Connect Requests

If you set `prompt=none` for a request on `/authorize` and the maximum age before sign-in is required (`max_age`) is exceeded, an error is returned. This ensures the safest possible result when [these two settings contradict each other](/docs/reference/api/oidc/#parameter-details).

This applies to `/authorize` with either the Okta Org Authorization Server or a Custom Authorization Server (which requires API Access Management).

#### Example: Old Message Format

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: com.saasure.core.services.user.InvalidUserProfileException: Could not create user due to invalid profile: com.saasure.framework.validation.util.SimpleErrors: 1 errors\nError in object 'newUser': codes [password.passwordRequirementsNotMet.newUser,password.passwordRequirementsNotMet]; arguments [Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username.]; default message [Password requirements were not met. Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username.]",
    "errorLink": "E0000001",
    "errorId": "oaecNfS38enQ8KtWDvNfusWRw",
    "errorCauses": [
        {
            "errorSummary": "Password requirements were not met. Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username."
        }
    ]
}
```

#### Example: New Message Format

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: com.saasure.core.services.user.InvalidUserProfileException: Could not create user due to invalid profile: com.saasure.framework.validation.util.SimpleErrors: 3 errors\nField error in object 'newUser' on field 'password': rejected value [aaaa]; codes [password.minlength.newUser.password,password.minlength.password,password.minlength.java.lang.String,password.minlength]; arguments [8]; default message [Password requirements: at least 8 characters.]\nField error in object 'newUser' on field 'password': rejected value [aaaa]; codes [password.uppercase.newUser.password,password.uppercase.password,password.uppercase.java.lang.String,password.uppercase]; arguments [Password requirements: at least 0 characters, an uppercase letter.]; default message [Password requirements: at least 0 characters, an uppercase letter.]\nField error in object 'newUser' on field 'password': rejected value [aaaa]; codes [password.number.newUser.password,password.number.password,password.number.java.lang.String,password.number]; arguments [Password requirements: at least 0 characters, a number.]; default message [Password requirements: at least 0 characters, a number.]",
    "errorLink": "E0000001",
    "errorId": "oaeGZUg95w6SK2GbA44cXgtvA",
    "errorCauses": [
        {
            "errorSummary": "password: Passwords must be at least 8 characters in length",
            "reason": "LENGTH_MINIMUM",
            "location": "credentials.password.value",
            "locationType": "body",
            "domain": "user"
        },
        {
            "errorSummary": "password: Password requirements: at least 0 characters, an uppercase letter.",
            "reason": "UPPER_CASE_REQUIRED",
            "location": "credentials.password.value",
            "locationType": "body",
            "domain": "user"
        },
        {
            "errorSummary": "password: Password requirements: at least 0 characters, a number.",
            "reason": "NUMBER_REQUIRED",
            "location": "credentials.password.value",
            "locationType": "body",
            "domain": "user"
        }
    ]
}
```

If you don't want these changes, contact [Support](https://support.okta.com/help/open_case) to opt out.

#### Improved System Log Behavior for Date Queries

1. For `/logs`, the request parameters [`since` and `until`](/docs/reference/api/system-log/#request-parameters) require [the RFC 3339 Internet Date/Time Format profile of ISO 8601](https://tools.ietf.org/html/rfc3339#page-8). This allows queries to more accurately target date ranges. <!-- OKTA-149837 -->

2. For /`logs`, [the maximum page size](/docs/reference/api/system-log/#request-parameters) is 1,000 messages (`limit=1000`). The default remains at 100. <!-- OKTA-154711, OKTA-157865 -->

#### System Log Message Changes Related to Authorization Servers

The following message changes apply to either the Okta Org Authorization Server or a Custom Authorization Server including `default` (which requires API Access Management), or both, as indicated in each section.

#### Simplified Failure Messages from [`/authorize`](/docs/reference/api/oidc/#authorize) Requests for `/events` System Log

The existing messages `app.oauth2.authorize_failure`, `app.oauth2.as.authorize_failure` and `app.oauth2.as.authorize.scope_denied_failure` replace these messages:

* `app.oauth2.authorize.access_denied`
* `app.oauth2.authorize.invalid_client_id`
* `app.oauth2.authorize.invalid_cache_key`
* `app.oauth2.authorize.no_existing_session`
* `app.oauth2.authorize.login_failed`
* `app.oauth2.authorize.mismatched_user_in_cache_and_session`
* `app.oauth2.authorize.user_not_assigned`
* `app.oauth2.authorize.scope_denied`
* `app.oauth2.as.authorize.warn_failure`
* `app.oauth2.as.authorize.scope_denied`

Details about the nature of the failure are included, so no information has been lost with this simplification.

These system log changes affect responses from requests that involve either the Okta Org Authorization Server or a Custom Authorization Server including `default`.

#### Simplified Failure Messages from [`/token`](/docs/reference/api/oidc/#token) Requests for `/events` System Log

Instead of supplying two different messages for token grant failures on `/token`, the existing message `app.oauth2.as.authorize.token.grant_failure` replaces
these messages:

* `app.oauth2.as.token.grant.warn_failure`
* `app.oauth2.as.token.grant.scope_denied_failure`

This system log change affects responses from requests that involve a Custom Authorization Server including `default`.

#### Simplified Success Messages from  [`/token`](/docs/reference/api/oidc/#token) Requests for `/events` System Log

Instead of supplying a different message for ID token and access token generation, there's just one message for each. The ID token or access token minted is included in the message as it was previously.

1. The existing message `app.oauth2.authorize.implicit_success` replaces:

    * `app.oauth2.authorize.implicit.id_token_success`
    * `app.oauth2.authorize.implicit.access_token_success`

2. The existing message `app.oauth2.as.authorize.implicit_success` replaces:

    * `app.oauth2.as.authorize.implicit.id_token_success`
    * `app.oauth2.as.authorize.implicit.access_token_success`

The `_success` messages weren't being written to the System Log previously, but are now. <!-- OKTA-157235 -->

These system log changes affect responses from requests that involve either the Okta Org Authorization Server or a Custom Authorization Server including `default`.

#### Simplified Messages from  [`/token`](/docs/reference/api/oidc/#token) Requests for `/logs` System Log

Instead of supplying a different message for ID token and access token generation, there's just one message for each. The ID token or access token minted is included in the message as it was previously.

1. The existing message `app.oauth2.authorize.implicit` replaces:

    * `app.oauth2.authorize.implicit.id_token`
    * `app.oauth2.authorize.implicit.access_token`

2. The existing message `app.oauth2.as.authorize.implicit` replaces:

    * `app.oauth2.as.authorize.implicit.id_token`
    * `app.oauth2.as.authorize.implicit.access_token` <!-- OKTA-155402 -->

These system log changes affect responses from requests that involve either the Okta Org Authorization Server or a Custom Authorization Server, including `default`.

#### Bugs Fixed for 2018.09

The following bugs have been fixed and are expected in preview orgs February 28, 2018 and production orgs starting March 5, 2018.

* If a user had a status of `ACTIVE` and had never signed in, and an API call reset the user's password, the user's status was incorrectly changed from `ACTIVE` to `PROVISIONED`, instead of the expected `RECOVERY`. (OKTA-154024)
* If `-admin` was incorrectly included in the domain name during initialization of [an OktaAuth object](https://github.com/okta/okta-auth-js), no error was returned. (OKTA-156927)
* If a user was created with a password, that password wasn't considered as part of their password history. (OKTA-158966)

### Weekly Release 2018.07

#### Feature Enhancement

The following feature enhancement is expected in preview orgs February 14, 2018, and in production orgs on February 27, 2018.

#### Keystore Rollover Events Now Logged

OAuth key store rollover events are now included in both the [Events](/docs/reference/api/events) and [System Log](/docs/reference/api/system-log/) APIs.<!-- OKTA-129535 -->

#### Bug Fixed

The following bug has been fixed and is expected in preview orgs February 14, 2018 and production orgs starting February 27, 2018.

* The error message "Exception while persisting IdpAppUser" wasn't available in the [System Log API](/docs/reference/api/system-log/). (OKTA-153604)


### Weekly Release 2018.06

#### Feature Enhancements

| Feature Enhancement        | Expected in Preview Orgs | Expected in Production Orgs |
|:------------------------------------|:------------------------------------|:---------------------------------------|
| [API Access Management is Generally Available in Preview](#api-access-management-is-generally-available-in-preview) | February 7, 2018               | starting March 12, 2018                  |
| [New Administrator Role for API Access Management](#new-administrator-role-for-api-access-management) | February 7, 2018 | starting February 12, 2018 |
| [New and Changed Messages for the System Log](#new-and-changed-messages-for-the-system-log) | February 7, 2018 | starting February 12, 2018 |

#### API Access Management is Generally Available in Preview

Secure your APIs with API Access Management, Okta's implementation of the OAuth 2.0 authorization framework. API Access Management uses the Okta Identity platform to enable powerful control over access to your APIs. API Access Management can be controlled through the administrator UI as well as a rich set of APIs for client, user, and policy management.

For more information, see [OAuth 2.0 and Okta](/docs/reference/api/oidc/). <!--OKTA-153127-->

#### New Administrator Role for API Access Management

If you have API Access Management enabled, you can use a dedicated administrator's role for API Access Management: the **API Access Management Admin** role. Use this role to manage custom authorization servers and related tasks:

* Create and edit authorization servers, scopes, custom claims, and access policies
* Create and edit  OAuth 2.0 and OpenID Connect client apps
* Assign users and groups to OAuth 2.0 and OpenID Connect client apps

To change the role assigned to a user, use [the Administrator Roles API](/docs/reference/api/roles/) or visit **Security > Administrators** in the administrator UI. <!--OKTA-107617-->

#### New and Changed Messages for the System Log

We've added a new message and improved an existing one in the System Log (`/api/v1/logs`):

* A message is now written to the System Log when password credentials fail. Previously this message was written only to `/api/v1/events`. <!--OKTA-153603-->
* The System Log message `policy.rule.deactivated` specifies in the Debug Context when the cause of a rule being disabled is that all the network zones for that rule have been deleted. <!-- OKTA-156445 -->

#### Bug Fixed

The following bug has been fixed and is expected in preview orgs February 7, 2018 and production orgs starting February 12, 2018.

* A spurious `next` link from the response headers was returned by a policy get operation (`GET {url}
/api/v1/policies`). (OKTA-152522)


## January

### Weekly Release 2018.05

#### Feature Enhancements

| Feature Enhancement                          | Expected in Preview Orgs | Expected in Production Orgs |
|:---------------------------------------------------|:------------------------------------|:---------------------------------------|
| [App User Schema API is Generally Available](#generally-available-app-user-schema-api)   | Available Now          | Available Now  |
| [Special HTML Characters in `state` for `okta_post_message`](#special-html-characters-in-state-for-okta_post_message) | January 31, 2018        | February 7, 2018                |
| [Custom Scopes in Metadata Endpoints](#custom-scopes-in-metadata-endpoints) | January 31, 2018        | February 7, 2018                |
| [Improved Enforcement of Authorization Server Policies](#improved-enforcement-of-authorization-server-policies) | January 31, 2018        | February 7, 2018                |
| [Functions for Including Groups in Tokens](#functions-for-including-groups-in-tokens) | January 31, 2018        | February 7, 2018        |
| [New System Log Messages](#new-system-log-messages) | January 31, 2018        | February 7, 2018                |
| [New Version of the Sign-In Widget](#new-version-of-the-sign-in-widget) | Available Now | Available Now |

#### Generally Available: App User Schema API
Use the [App User Schema API](/docs/reference/api/schemas/#app-user-schema-operations) to work with App User profiles, typically for apps that have features for provisioning users. <!--OKTA-154105-->

#### Special HTML Characters in `state` for `okta_post_message`

You can include HTML special characters in the `state` parameter for `okta_post_message`.
Note that [`state` in the main request body](/docs/reference/api/oidc/#request-parameters-1) already allows these characters. <!-- OKTA-91165 -->

#### Custom Scopes in Metadata Endpoints

You can specify whether or not to include custom scopes in the metadata endpoints for [OAuth 2.0](/docs/reference/api/oidc/#well-knownoauth-authorization-server) and [OpenID Connect](/docs/reference/api/oidc/#well-knownopenid-configuration).
Existing custom scopes are not exposed by default. Set the [`metadataPublish` attribute to `ALL_CLIENTS`](/docs/reference/api/authorization-servers/#scope-properties) to change the behavior. <!-- OKTA-106548 -->

#### Improved Enforcement of Authorization Server Policies

When a client application tries to redeem an authorization token from a refresh token issued by a custom authorization server, policies are evaluated again. This ensures any changes since the time the refresh token was issued are checked. <!-- OKTA-117622 -->

#### Functions for Including Groups in Tokens

Use [the new EL functions `Group.contains`, `Group.startsWith`, and `Group.endsWith`](/docs/reference/okta-expression-language/#group-functions) to define a set of dynamic groups to be included in tokens minted from Okta's authorization servers. <!-- OKTA-142824 -->

These functions complement [the existing EL function `getFilteredGroups`](/docs/guides/customize-tokens-returned-from-okta/) which helps you create a static list of groups for inclusion in a token.

#### New System Log Messages

User account updates have two new events written to the system log ( `/api/v1/events` and `/api/v1/logs`):

* The `user.account.unlock_by_admin` event complements the existing `user.account.unlock` event which is triggered only by self-service unlock or automatic unlock. The `user.account.unlock_by_admin` event is triggered when an administrator unlocks an account.
* The `user.account.update_primary_email` event is triggered only when a primary email is updated. It's not triggered by profile sync or other automated processes. <!-- OKTA-154452 -->

#### New Version of the Sign-In Widget
Version 2.6.0 of [the Okta Sign-In Widget](https://www.npmjs.com/package/@okta/okta-signin-widget) is available. Check out the new features and bug fixes!

#### Bugs Fixed

The following bugs have been fixed and are expected in preview orgs January 31, 2018 and production orgs starting February 7, 2018.

* Client applications could redeem an access token from a refresh token if it contained a deleted scope. (OKTA-154738)
* The exception thrown when creating a zone without the correct features enabled was incorrect `501: unsupported operation`.
    Now the correct exception is thrown: `401: You do not have permission to access the feature you are requesting.` (OKTA-154940)
* Requests to `/api/v1/authn` with `deviceToken` in the body of the request incorrectly prompted the user for MFA, even after successfully verifying the factor the first time, if:
    * The org had MFA enabled ( **Sign On Policy > Prompt for Factor > Per Device** ).
    * The user was assigned to an app that had password sync enabled. (OKTA-156826)


### Weekly Release 2018.03

#### Feature Enhancements

| Feature Enhancement                          | Expected in Preview Orgs | Expected in Production Orgs |
|:---------------------------------------------------|:------------------------------------|:---------------------------------------|
| [App User Schema API is Generally Available](#generally-available-app-user-schema-api)   | Available Now          | February 13, 2017  |

#### Generally Available: App User Schema API
Use the [App User Schema API](/docs/reference/api/schemas/#app-user-schema-operations) to work with App User profiles, typically for apps that have features for provisioning users. <!--OKTA-154105-->


### Weekly Release 2018.02

#### Feature Enhancements

| Feature Enhancement                          | Expected in Preview Orgs | Expected in Production Orgs |
|:---------------------------------------------------|:------------------------------------|:---------------------------------------|
| [App User Schema API is Generally Available](#generally-available-app-user-schema-api)   | January 10, 2018          | February 13, 2017  |
| [SHA-256 Certificates for New SAML 2.0 Apps is Generally Available](#generally-available-sha-256-certificates-for-saml-20-apps) | Available  Now        | January 10, 2018                |

#### Generally Available: App User Schema API
Use the [App User Schema API](/docs/reference/api/schemas/#app-user-schema-operations) to work with App User profiles, typically for apps that have features for provisioning users. <!--OKTA-154105-->

#### Generally Available: SHA-256 Certificates for SAML 2.0 Apps

When you create a SAML 2.0 app in Okta, the app is created with SHA-256 signed public certificates. Certificates for existing SAML 2.0 apps aren't changed. To update an existing app, use [these instructions](/docs/guides/updating-saml-cert/#existing-saml-20-app-integrations).<!--OKTA-132058-->

#### Bug Fixes

The following bugs have been fixed, and are expected in preview orgs starting January 10, 2018, and in production orgs starting January 16, 2018.

* Network zones couldn't be deleted if they were associated with a sign-on policy, even after the policy has been deleted. (OKTA-150747)
* Results returned from the Users API incorrectly reported the status of some users who were mastered by Active Directory. The statuses `PASSWORD_RESET` or `LOCKED_OUT` were reported as `ACTIVE`. (OKTA-153214, OKTA-151861)
