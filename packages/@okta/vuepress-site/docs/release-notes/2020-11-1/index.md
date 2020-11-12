---
title: Okta API Products Release Notes
---

## 2020.11.1

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [Bugs Fixed in 2020.11.1](#bugs-fixed-in-2020-11-1) | November 11, 2020         |

### Bugs fixed in 2020.11.1

* Import of users with a [bcrypt-hashed password](/docs/reference/api/users/#hashed-password-object) succeeded even if the `workFactor` property was missing or misnamed. This prevented imported users from signing in. (OKTA-330587)
* During user import, some POST requests to the `/users` [endpoint](/docs/reference/api/users/#create-user) incorrectly triggered Inline Hooks, resulting in higher latency. (OKTA-335769)
