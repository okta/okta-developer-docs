---
title: Okta API Products Change Log
---

## 2019.03.2

| Change                                                                                                                                 | Expected in Preview Orgs |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [PKCE for Browser Clients, CORS Headers for OAuth 2 Token Endpoint](#pkce-for-browser-clients-cors-headers-for-oauth-2-token-endpoint) | March 20, 2019           |
| [Bugs Fixed in 2019.03.2](#bugs-fixed-in-2019-03-2)                                                                                      | March 20, 2019           |

### PKCE for Browser Clients, CORS Headers for OAuth 2 Token Endpoint

Okta now supports Proof Key for Code Exchange (PKCE) for browser clients and returns CORS headers on the OAuth 2.0 Token endpoints.

### Bugs Fixed in 2019.03.2

* Under some circumstances, users in a locked out state would receive success responses from the SMS recovery API. (OKTA-207288)
* In some instances, users who were not Okta-mastered would have inaccurate `passwordChanged` values in API responses. (OKTA-210233)
* SAML applications created through the API would not save the value for the `HonorForceAuthn` property. (OKTA-209083)
* For SAML applications, the `attributeStatements` object would not update if a `null` value was passed as part of a PUT operation. (OKTA-209767)
