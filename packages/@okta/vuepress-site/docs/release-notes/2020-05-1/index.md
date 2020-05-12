---
title: Okta API Products Release Notes
---

## 2020.05.1

| Change                                              | Expected in Preview Orgs |
| --------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.05.1](#bugs-fixed-in-2020-05-1) | May 13, 2020             |

### Bugs fixed in 2020.05.1

* Exceeding the rate limit on the `/token` endpoint resulted in an HTTP 400 error instead of an HTTP 429 error. (OKTA-289508)
* The IdP `/metadata.xml` endpoint was not OAuth enabled. (OKTA-294739)
* Simultaneous `DELETE` calls to the `/users/${id}` endpoint could result in HTTP 500 errors. (OKTA-223918)
