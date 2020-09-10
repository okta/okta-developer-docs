---
title: Okta API Products Release Notes
---

## 2020.09.1

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.09.1](#bugs-fixed-in-2020-09-1)       | September 10, 2020           |

### Bugs fixed in 2020.09.1

* When attempting to reset a user's password using the [`lifecycle/reset_password` endpoint](/docs/reference/api/users/#reset-password), admins received a 500 `Internal Server` error code rather than a valid error message if the user's email address was invalid. (OKTA-307089)
* If a [`Groups` claim](/docs/guides/customize-tokens-groups-claim/overview/) returned more than 100 groups, then tokens couldn't be minted, which generated a `500 Internal Server` error code instead of a `400 Bad Request` error code. (OKTA-321988)
* If an Identity Provider returned an error response during authentication, the [`/introspect` endpoint](/docs/reference/api/oidc/#introspect) returned a `500 Internal Server` error code. (OKTA-324419)
* When a geographical [network zone](/docs/reference/api/zones/) that included Okta routers was blocked, all requests to the org were blocked. (OKTA-326955)
