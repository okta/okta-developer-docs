---
title: Okta API Products Release Notes
---

## 2020.09.3

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.09.3](#bugs-fixed-in-2020-09-3)       | September 23, 2020           |

### Bugs fixed in 2020.09.3

* If a user was previously converted to use an [external Federated IdP instead of Okta](/docs/reference/api/users/#request-example-convert-a-user-to-a-federated-user), any additional attempt to convert the user with a call to the `lifecycle/reset_password` endpoint returned an HTTP 501 error code instead of an HTTP 400 error code. (OKTA-323343)
