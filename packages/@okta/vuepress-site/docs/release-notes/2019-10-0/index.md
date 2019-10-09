---
title: Okta API Products Release Notes
---

## 2019.10.0

| Change                                                                                                        | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------|--------------------------|
| [Event Hooks API is Generally Available](#event-hooks-api-is-generally-available)                              | October 9, 2019        |
| [User Types API in Early Access](#user-types-api-in-early-access)                              | October 9, 2019        |
| [Tokens transform events no longer available](#tokens-transform-events-no-longer-available)                              | October 9, 2019        |
| [Cookies updated to preserve cross-functionality](#cookies-updated-to-preserve-cross-functionality)                              | October 9, 2019        |
| [App Condition available for Enroll Policy](#app-condition-available-for-enroll-policy)                              | October 9, 2019        |
| [Bugs Fixed in 2019.10.0](#bugs-fixed-in-2019-10-0)                                                           | October 9, 2019        |

### Event Hooks API is Generally Available

The [Event Hooks API](/docs/reference/api/event-hooks/) is Generally Available (GA) in Production.

### User Types API in Early Access

The [User Types API](/docs/reference/api/user-types/) is in Early Access (EA) in both Preview and Production. <!-- OKTA-251182 -->

### Tokens transform events no longer available

Tokens transform System Log [events](/docs/reference/api/event-types/) will no longer fire for SAML and Token Inline Hooks. They have been replaced by Inline Hook events.  <!-- OKTA-249601 -->

### Cookies updated to preserve cross-functionality

To preserve cross-site functionality, Okta now adds the `SameSite=None` attribute to all relevant cookies when the client browser is Firefox 69 or above. Previously this was enabled only for Chrome 76 and above. <!-- OKTA-248255 -->

### App Condition available for Enroll Policy

App Condition is now available for the [Enroll Policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy).

### Bugs Fixed in 2019.10.0

* WebAuthn Factors could not be verified using the [Factors API](/docs/reference/api/factors/). (OKTA-228239)
* During OAuth 2 and OIDC sign-in flows, the Okta Sign-In Widget incorrectly rendered pre-populated usernames, substituting `+` with a space. (OKTA-235187)
