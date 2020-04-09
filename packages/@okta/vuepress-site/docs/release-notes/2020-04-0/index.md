---
title: Okta API Products Release Notes
---

## 2020.04.0

| Change                                                                    | Expected in Preview Orgs |
| ------------------------------------------------------------------------- | ------------------------ |
| [OAuth for Okta GA in Production](#oauth-for-okta-ga-in-production)       | April 8, 2020            |
| [User Types API GA in Production](#user-types-api-ga-in-production)       | April 8, 2020            |
| [CORS headers in more API responses](#cors-headers-in-more-api-responses) | April 8, 2020            |
| [Bugs fixed in 2020.04.0](#bugs-fixed-in-2020-04-0)                       | April 8, 2020            |

### OAuth for Okta GA in Production

[OAuth for Okta](/docs/guides/implement-oauth-for-okta/overview/) is now Generally Available in Production. <!-- OKTA-276784 -->

### User Types API GA in Production

The [User Types API](/docs/reference/api/user-types/) is Generally Available in Production. <!-- OKTA-286349 -->

### CORS headers in more API responses

Okta will now return CORS headers for [requests made with OAuth 2.0 Bearer tokens](/docs/guides/implement-oauth-for-okta/overview/), even if an endpoint isn't CORS-enabled and even if the originating URL isn't configured as a Trusted Origin. <!-- OKTA-266028 -->

### Bugs fixed in 2020.04.0

* New SAML apps would have an active SAML assertion Inline Hook assigned to them automatically. (OKTA-262777)
* Attempts to update the user schema with invalid properties could return HTTP 500 errors. (OKTA-281498)
* The `errorSummary` for error E0000074 was malformed. (OKTA-273711)
