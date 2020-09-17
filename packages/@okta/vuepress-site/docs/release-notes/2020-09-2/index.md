---
title: Okta API Products Release Notes
---

## 2020.09.2

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.09.2](#bug-fixed-in-2020-09-2)       | September 16, 2020           |

### Bug fixed in 2020.09.2

* Requests to the `/token`, `/revoke`, and `/introspect` endpoints that had invalid client credentials would return an HTTP 400 error instead of the HTTP 401 error required by the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749). (OKTA-306444)
