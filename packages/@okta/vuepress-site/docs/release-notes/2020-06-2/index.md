---
title: Okta API Products Release Notes
---

## 2020.06.2

| Change                                              | Expected in Preview Orgs |
| --------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.06.2](#bug-fixed-in-2020-06-2)    | June 17, 2020            |

### Bug fixed in 2020.06.2

After a user was demastered from Active Directory, calls to the `/users` endpoint did not reflect that change for up to 24 hours. (OKTA-294377)
