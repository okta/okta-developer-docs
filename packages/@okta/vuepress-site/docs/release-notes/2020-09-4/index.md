---
title: Okta API Products Release Notes
---

## 2020.09.4

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.09.4](#bug-fixed-in-2020-09-4)       | September 30, 2020           |

### Bugs fixed in 2020.09.4

* When an OAuth service client called the [`/v1/authorize` endpoint](/docs/reference/api/oidc/#authorize), the returned error description was inaccurate. (OKTA-252750)

* If a user was assigned to two groups having identical roles, then a call to the `/users/${userId}/roles` endpoint to [list the administrator roles assigned](/docs/reference/api/roles/#list-roles) to the user failed with an HTTP 400 error. (OKTA-325187)

* The `okta.apps.*` scope wasn't applied to the [`/apps/${applicationId}/credentials/keys`](/docs/reference/api/apps/#list-key-credentials-for-application) endpoint. (OKTA-331828)
