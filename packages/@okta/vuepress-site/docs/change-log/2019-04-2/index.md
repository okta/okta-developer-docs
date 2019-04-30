---
title: Okta API Products Change Log
---

## 2019.04.2

| Change                                                                                                            | Expected in Preview Orgs |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [Hashed Password Imports with SHA-512 Algorithm](#hashed-password-imports-with-sha-512-algorithm)                 | May 1, 2019              |
| [Bugs Fixed in 2019.04.2](#bugs-fixed-in-2019-04-2)                                                                 | May 1, 2019              |

### Hashed Password Imports with SHA-512 Algorithm

You can use the SHA-512 hash type when [importing passwords](/docs/api/resources/users/#create-user-with-imported-hashed-password). <!-- (OKTA-220300) -->

### Bugs Fixed in 2019.04.2

* Concurrent requests to modify the same app instance would result in an HTTP 500 error. (OKTA-205283)
* Responses from the `/oauth2/${authServerId}/.well-known/oauth-authorization-server` and `/oauth2/${authServerId}/.well-known/openid-configuration` endpoints for Custom Authorization Servers would append a query parameter (`client_id`) to the value returned for the `jwks_uri` property. Inclusion of the query parameter was misleading because you cannot use the query parameter when calling the JWKS URI. (OKTA-217289)

