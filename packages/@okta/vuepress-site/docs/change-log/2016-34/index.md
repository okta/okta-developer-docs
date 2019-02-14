---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.34
---

## 2016.34

### Feature Enhancement: HAL Links For Sessions API Are CORS-Enabled

Two Session API endpoints, `GET /api/v1/sessions/me` and `POST /sessions/me/lifecycle/refresh`, return `/me` instead of `/${userId}` in response links.
These links are CORS-enabled, consistent with the original API calls which are also CORS-enabled.

For more information, see [Get Session](/docs/api/resources/sessions#get-session) or [Refresh Session](/docs/api/resources/sessions#refresh-session).<!-- OKTA-98961 -->

### Bugs Fixed

* IdP keys could be deleted even when referenced by an active or inactive app instance. (OKTA-96139)
* Properties could be deleted from the [User Profile schema](/docs/api/resources/schemas#remove-property-from-user-profile-schema)
while still referenced as a `matchAttribute` in inbound SAML IdPs. (OKTA-96281)
* Identity Providers for social authentication configured to look up usernames by Okta username or email failed to return a valid match.
This failure occurred if the username was in both the username and email and a second user existed with the same email but different username. (OKTA-96335)
