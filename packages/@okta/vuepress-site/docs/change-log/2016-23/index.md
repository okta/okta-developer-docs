---
title: Okta API Products Change Log
---

## 2016.23

### Bugs Fixed

* OKTA-73691 – HTML tags were incorrectly allowed in POST and PUT requests to `/api/v1/idps/`.
* OKTA-90218 – Requests to `/oauth2/v1/authorize` failed if they included a state value with special characters.
* OKTA-91074 – Requests to `/oauth2/v1/introspect` incorrectly included scopesList.
* OKTA-91441 – The Users API incorrectly returned an error when updating login. 
