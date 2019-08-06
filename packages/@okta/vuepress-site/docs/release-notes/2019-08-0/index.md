---
title: Okta API Products Release Notes
---

## 2019.08.0

| Change                                                                                                   | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------------|--------------------------|
| [Inline Hooks is now GA in Preview](#inline-hooks-is-now-ga-in-preview)                                  | August 7, 2019           |
| [LinkedIn API V2 is now supported](#linkedin-api-v2-is-now-supported)                                    | August 7, 2019           |
| [Mappings API is now GA in Preview](#mappings-api-is-now-ga-in-preview)                                  | August 7, 2019           |
| [Missing type property now returns a 400 error code](#missing-type-property-now-returns-a-400-error-code)| August 7, 2019           |
| [Bug Fixed in 2019.08.0](#bug-fixed-in-2019-08-0)                                                        | August 7, 2019           |

### Inline Hooks is now GA in Preview

[Inline Hooks](/docs/concepts/inline-hooks/) enable you to integrate your own custom functionality into Okta process flows. The framework to support them is now GA in Preview. <!-- OKTA-241104 -->

### LinkedIn API V2 is now supported 

Okta now supports LinkedIn API V2. Creation of [LinkedIn Identity Providers](https://developer.okta.com/docs/guides/sign-in-with-linkedin/setup-app/) has been re-enabled in all Production orgs. <!-- OKTA-237649 -->

### Mappings API is now GA in Preview

The Okta Mappings API provides operations to manage the mapping of properties between an Okta User's and an App User's
[Profile Properties](/docs/reference/api/users/#profile-object) using [Expression Language](/docs/reference/okta-expression-language). This feature is now GA in Preview. <!-- OKTA-241748 -->

### Missing type property now returns a 400 error code

If you create an [IP network zone](/docs/reference/api/zones/#ip-zone-properties) without a `type` property for an IP field, PUT or POST requests made to the `Zone` API now return a 400 error code. <!-- OKTA-239170 -->

### Bug Fixed in 2019.08.0

In the `Update User` API, when the `secondEmail` attribute in a user's profile was updated with an empty value (instead of `null`), the `noSecondEmail` flag was incorrectly updated to `false` for the user. This led to affected users being incorrectly prompted for `secondEmail`. (OKTA-240382)
