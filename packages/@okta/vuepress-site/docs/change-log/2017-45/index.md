---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta API since Release 2017.44
---

## 2017.45

### API Feature Enhancements

| Feature Enhancement                                                                   | Expected in Preview Orgs | Expected in Production Orgs |
|:--------------------------------------------------------------------------------------|:-------------------------|:----------------------------|
| [App Label Length Increase](#app-label-length-increase)                                     | November 8, 2017          | November 14, 2017             |
| [GET Users by ID Rate Limit Increased](#get-users-by-id-rate-limit-increased)               | November 8, 2017          | November 14, 2017             |
| [User ID Now Included in Token Log Events](#user-id-now-included-in-token-log-events) | November 8, 2017          | November 14, 2017             |
| [IdP Provisioning Policy Conditions in GA](#idp-provisioning-policy-conditions-in-ga)                                                             | November 8, 2017        | November 14, 2017             |

#### App Label Length Increase

App `label` maximum length has been increased from 50 to 100 characters. <!--OKTA 146865-->

#### GET Users by ID Rate Limit Increased

The default rate limit for GET requests to `/api/v1/users/${userId}` has been increased from 600 to 2000. <!--OKTA 144705-->

#### User ID Now Included in Token Log Events

The System Log and Events APIs now report the `userId` in API Access Management and OpenID Connect access token and refresh token events. This `userId` appears as a `Subject` field in the event. For the `client_credentials` grant type, `userId` will not be included since there is no user context. <!--OKTA 143854-->

#### IdP Provisioning Policy Conditions in GA

Identity Provider Provisioning Policy [Conditions](/docs/api/resources/idps#provisioning-policy-object) are now Generally Available. <!--OKTA 123811-->

### API Bug Fixes

The following bug fixes are available now on preview orgs, and will be available on production orgs starting November 14, 2017:

* System log messages for refresh token events failed to include the `displayName`. In this context, the display name reports that the event was for a refresh token. (OKTA-146743)
* Using `nextLogin` to create a user with an expired password was successful but incorrectly reported the status as `ACTIVE` in the response. (OKTA-136663)
* When importing users into an app group, the System Log event would display `unknown` for the target user's  `AlternateId` and `DisplayName` properties. (OKTA-145115)
* In some instances, the `enum` property could not be used in conjunction with JSON Schema validations for `minLength`/`maxLength` (for strings)  or `minimum`/`maximum` (for integers/numbers). (OKTA-142732)
