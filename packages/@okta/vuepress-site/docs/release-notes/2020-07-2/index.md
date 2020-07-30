---
title: Okta API Products Release Notes
---

## 2020.07.2

| Change                                                      | Expected in Preview Orgs |
| ----------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.07.2](#bugs-fixed-in-2020-07-2)         | July 29, 2020            |

### Bugs fixed in 2020.07.2

* When using the [Apps API](/docs/reference/api/apps/), exceeding the character limit for OIDC application redirect URIs resulted in an HTTP 500 error instead of an HTTP 400 error. (OKTA-297164)
