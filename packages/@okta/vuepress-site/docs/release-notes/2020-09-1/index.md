---
title: Okta API Products Release Notes
---

## 2020.09.1

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.09.1](#bugs-fixed-in-2020-09-1)       | September 10, 2020           |

### Bugs fixed in 2020.09.1

* When attempting to reset a user's password using the `lifecycle/reset_password` endpoint, admins received an HTTP 500 error code rather than a valid error message if the user's email address was invalid. (OKTA-307089)
* If a `Groups` claim returned more than 100 groups, then tokens couldn't be minted, which generated an HTTP 500 error code instead of an HTTP 400 error code. (OKTA-321988)
* If an Identity Provider returned an error response during authentication, the `/introspect` endpoint returned an HTTP 500 error code. (OKTA-324419)
* When a geographical network zone that included Okta routers was added to an IP blacklist zone, all requests to the org were blocked. (OKTA-326955)
