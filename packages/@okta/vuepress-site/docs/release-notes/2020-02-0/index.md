---
title: Okta API Products Release Notes
---

## 2020.02.0

| Change                                                                                                                                                | Expected in Preview Orgs |
|-------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Password Import Inline Hooks is General Access in Preview and Production](#password-import-inline-hooks-is-general-access-in-preview-and-production) | February 5, 2020         |
| [OAuth for Okta Enabled for User Consent Grant Operations](#oauth-for-okta-enabled-for-user-consent-grant-operations)                                 | February 5, 2020         |
| [OAuth for Okta Enabled for Policy API](#oauth-for-okta-enabled-for-policy-api)                                                                       | February 5, 2020         |
| [User Types API in General Access in Preview](#user-types-api-in-general-access-in-preview)                                                           | February 5, 2020         |
| [SAML Assertion Inline Hook Now Supports URI Formatting in Claims](#saml-assertion-inline-hook-now-supports-uri-formatting-in-claims)                 | February 5, 2020         |
| [Support Added in Get User API for Sort Parameters](#support-added-in-get-user-api-for-sort-parameters)                                               | February 5, 2020         |
| [Apps API Support for Custom SAML Attribute Statements](#apps-api-support-for-custom-saml-attribute-statements)                                       | February 5, 2020         |
| [Rate Limits for /oauth2 endpoints](#rate-limits-for-oauth2-endpoints)                                                                                | n/a                      |
| [Bugs Fixed in 2020.02.0](#bugs-fixed-in-2020-02-0)                                                                                                   | February 5, 2020         |

### Password Import Inline Hooks is General Access in Preview and Production

The [Password Import Inline Hook](/docs/reference/password-hook/) lets you interface with an external service to verify a user-supplied password when the user signs in to Okta for the first time. This supports scenarios in which users are migrated from an existing user store while allowing them to retain their passwords. <!-- OKTA-275019 -->

### OAuth for Okta Enabled for User Consent Grant Operations

[User Consent Grant Operations](/docs/reference/api/users/#user-consent-grant-operations) now have OAuth for Okta enabled. <!--OKTA-254864-->

### OAuth for Okta Enabled for Policy API

The [Policy API](/docs/reference/api/policy/) now has OAuth for Okta enabled. <!--OKTA-272595-->

### User Types API in General Access in Preview

The [User Types API](/docs/reference/api/user-types/) is in General Access (GA) in Preview. <!--OKTA-275379-->

### SAML Assertion Inline Hook Now Supports URI Formatting in Claims

Okta now supports URI claims with the [SAML Assertion Inline Hook](/docs/reference/saml-hook/). When you need to replace or add a URI claim, you must encode the claim name within the command based on the [JavaScript Object Notation (JSON) Pointer](https://tools.ietf.org/html/rfc6901) specification. This replaces `~` with `~0` and `/` with `~1`. <!--OKTA-266619-->

### Support Added in Get User API for Sort Parameters

The [Get User API](/docs/reference/api/users/#get-user) now supports `sortBy` and `sortOrder` parameters on `search` queries. <!--OKTA-270214-->

### Apps API Support for Custom SAML Attribute Statements

The [Apps API](/docs/reference/api/apps/) now supports specifying SAML attribute statements for SAML 2.0 apps. <!--OKTA-275379-->

### Rate Limits for /oauth2 endpoints

[Rate limiting](/docs/reference/rate-limits/) has been modified for `/oauth2` endpoints in Production orgs so that requests that use an invalid client ID don't consume the rate limit. A System Log warning has also been introduced for high rate limit consumption by requests that use a valid client ID. <!--OKTA-27534-->

### Bugs Fixed in 2020.02.0

* When using the [SAML Assertion Inline Hook](/docs/reference/saml-hook/), if there was an optional attribute statement configured for the app and the attribute statement had no value specified, commands returned from SAML Inline Hook responses were not applied. (OKTA-263494)

* The [Update User Types API](/docs/reference/api/user-types/#update-user-type) previously allowed the existing name of a User Type to be changed. (OKTA-241788)

