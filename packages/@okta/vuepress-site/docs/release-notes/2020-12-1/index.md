---
title: Okta API Products Release Notes
---

## 2020.12.1

| Change                                            | Expected in Preview Orgs |
| ------------------------------------------------- | ------------------------ |
| [Bugs Fixed in 2020.12.1](#bugs-fixed-in-2020-12-1) | December 17, 2020         |

### Bugs fixed in 2020.12.1

* The Update User API incorrectly allowed the [credentials object](/docs/reference/api/users/#credentials-object) of an ACTIVE user to be updated to [password hook](/docs/reference/api/users/#password-object). (OKTA-350956)
* The `illegal_post_logout_redirect_uri` error message, which was enhanced to help clients using the app client configuration wizard, incorrectly appeared for OIN clients. (OKTA-343082)
