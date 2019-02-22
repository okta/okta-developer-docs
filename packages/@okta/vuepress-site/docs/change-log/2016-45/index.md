---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.43
---

## 2016.45

### Feature Enhancements

#### New Version of Okta Sign-In Widget

The new version of Okta Sign-In Widget, 1.8.0, is available:

* Localized security questions
* Added Microsoft as a Social Provider
* Added an option to provide your own dependencies

Learn about these and other improvements in [the GitHub repository](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-1.8.0).

#### Improved Error Message for OpenID Connect

OpenID Connect error messages related to invalid scopes now return more information.
<!-- OKTA-94798 -->

#### User API Response Always Contains HAL Links

Previously, HAL links for self-service operations (reset password, change password and self-service unlock) were only returned if a policy evaluation indicated they should be present. As of this release we always return these links, except we don't return the self-service unlock link if the user is not locked.

This enhancement applies to all new preview and productions orgs. Existing orgs receive the enhancement at a later date.
<!-- OKTA-104084 -->

### Platform Bugs Fixed

* Blank or empty passwords were allowed when users reset their passwords via the API following a reset password action.
Following the login with a temporary password the user would be prompted to enter their new password.
At that time, the user could enter an empty password without generating an error. (OKTA-100802)
* Validation of the security answer length in accordance with password policy wasn't performed
when creating a user via the API with the group password policy feature enabled.
Before the fix, the minimum security answer length was assumed to always be 4, regardless of the policy settings. (OKTA-103407)
* Improved the error message returned by an HTTP 429 error to remind the user to wait 30 seconds before re-issuing the request for an SMS message. (OKTA-104738)
* Removed some app metadata that was incorrectly returned from a `GET /api/v1/apps/{app-ID}` request for an OpenID Connect app. (OKTA-104767)
* After resetting an SMS factor for a user, that factor was incorrectly included in a subsequent API call for that user. (OKTA-105672)
* Changed validation of OpenID Connect client apps to disallow fragment components in configured redirect URIs. (OKTA-106049)
