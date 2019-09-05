---
title: Okta API Products Release Notes
---

## 2019.09.0

| Change                                                                                                        | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------|--------------------------|
| [Features API is Early Access EA in Preview and Production](#features-api-is-ea)                              | September 4, 2019        |
| [Mappings API is now Generally Available (GA) in Production](#mappings-api-is-now-ga-in-production)           | September 4, 2019        |
| [Error Object in SAML Assertion Inline Hook](#error-object-in-saml-assertion-inline-hook)                     | September 4, 2019        |
| [Rate Limits for /oauth2 Endpoints](#rate-limits-for-oauth2-endpoints)                                        | September 4, 2019        |
| [Rate Limits for Authorization Server Public Metadata](#rate-limits-for-authorization-server-public-metadata) | September 4, 2019        |
| [Bugs Fixed in 2019.09.0](#bugs-fixed-in-2019-09-0)                                                             | September 4, 2019        |

### Features API is Early Access (EA) in Preview and Production

The [Features API](/docs/reference/api/features/) provides operations to manage self-service features in your Production and Preview orgs and Beta features in your Preview org. <!-- OKTA-241445 -->

### Mappings API is now Generally Available (GA) in Production

The Okta Mappings API provides operations to manage the mapping of properties between an Okta User's and an App User's
[Profile Properties](/docs/reference/api/users/#profile-object) using [Expression Language](/docs/reference/okta-expression-language). This feature is now GA in Production. <!-- OKTA-241945 -->

### Error Object in SAML Assertion Inline Hook

For the [SAML Assertion Inline Hook](/docs/reference/saml-hook/), if an external service returns an `error` object, Okta now denies the SAML request and redirects the end user to an error page that displays the text string sent in `error.errorSummary`. <!-- OKTA-195167 -->

### Rate Limits for /oauth2 Endpoints

Rate limiting has been modified for `/oauth2` endpoints so that requests that use an invalid client ID do not consume rate limit. Additionally, a System Log warning has been introduced to provide notification of high rate limit consumption by requests that use a valid client ID. <!-- OKTA-241945 -->

### Rate Limits for Authorization Server Public Metadata

The public metadata endpoints for Authorization Servers are now each assigned separate rate limits, which are not shared with other endpoints. <!-- OKTA-226100 -->

### Bugs Fixed in 2019.09.0

* Responses from the [`GET /groups/rules`](/docs/reference/api/groups/#get-group-rule) API included deleted groups in the `assignUserToGroups.groupIds` property. (OKTA-242994)

* Calls to the [`/users/${userid}/lifecycle/deactivate`](/docs/reference/api/users/#deactivate-user) endpoint could time out when deactivating a user with an extraordinarily high number of app assignments.
