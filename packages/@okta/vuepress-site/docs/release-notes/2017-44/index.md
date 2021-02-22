---
title: Okta API Products Release Notes
excerpt: New parameter for creating users and bug fixes
---

## 2017.44

### API Feature Enhancements: New Query Parameter for Create User

Use [the new query parameter `nextLogin`](/docs/reference/api/users/#request-parameters) with a create user API request to create and activate a user with an expired password.
The user has to change his or her password the next time they log in. This new query parameter eliminates the need to use two API calls to achieve the same result. <!-- OKTA-142029 -->

This feature enhancement is expected in preview orgs starting November 1, 2017, and in production orgs starting November 6, 2017.

### API Bug Fixes

Three bug fixes are available now on preview orgs, and will be available on production orgs starting November 6, 2017:

* The default ports in the App Wizard in the Admin Console have been changed from `3000` to `8080`. (OKTA-144916)
* An error string was unclear. The string is returned when a session times out while waiting for a user to enter MFA credentials during an OpenID Connect `/oauth2/v1/authorize` or OAuth 2.0 `/oauth2/${authServerId}/v1/authorize` request. (OKTA-143916)
* An error, `User not assigned to app` was incorrectly returned from a `GET /oauth2/v1/authorize` request for Oauth 2.0 clients with a custom client ID. (OKTA-146566)

Two bug fixes are expected on preview orgs starting Nov 1, 2017, and will be available on production orgs starting November 6, 2017:

* System log entries for API Access Management and OpenID Connect now correctly report client IDs and the number of tokens which were revoked in a refresh token. (OKTA-145486)
* The OpenID Connect claim `phone_number_verified` was returned from some authorization servers. The claim has been removed because Okta doesn't support this claim yet. (OKTA-146470)
