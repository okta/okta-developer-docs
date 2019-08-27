---
title: Okta API Products Release Notes
---

## 2019.08.2

| Change                                                                                                   | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.08.2](#bug-fixed-in-2019-08-2)                                                        | August 21, 2019          |

### Bug Fixed in 2019.08.2

Paginated responses from the [List Users with Search](/docs/reference/api/users/#list-users-with-search) API were limited to a total of 50,000 results, and following the `next` link after that limit yielded an error. (OKTA-220619)
