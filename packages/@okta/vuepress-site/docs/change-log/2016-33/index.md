---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.31
---

## 2016.33

### Bugs Fixed

* Custom SAML apps couldn't update their signing key credentials via API. (OKTA-93959)
* When configuring OpenID Connect client apps, the App Embed Links dialog displayed custom login and error page sections that weren't applicable. (OKTA-95526)
* Using an API token created by a Read-Only Administrator caused a permission error when GET requests were sent to `/api/v1/users/${userId}/factors` or `/api/v1/users/${userId}/factors/catalog`. (OKTA-95569)
* GET requests to `oauth2/v1/authorize` that specified the Form Post Response Mode sometimes failed to receive `expires_in` and `scope` in the response. (OKTA-98245)
