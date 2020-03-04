---
title: Okta API Products Release Notes
---

## 2020.02.2

| Change                                              | Expected in Preview Orgs |
|-----------------------------------------------------|--------------------------|
| [Bugs fixed in 2020.02.2](#bugs-fixed-in-2020-02-2) | February 26, 2020        |

### Bugs fixed in 2020.02.2

* When the Security Question option wasn't enabled in the password policy, requests to the `/reset_password` endpoint would return a 403 error when the `sendEmail` query parameter was set to `false`. (OKTA-272392)
* Some cross-origin requests to the `/users/me` endpoint didn't return CORS headers if the user had an invalid session. (OKTA-260550)
