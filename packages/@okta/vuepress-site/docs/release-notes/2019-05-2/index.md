---
title: Okta API Products Release Notes
---

## 2019.05.2

| Change                                                                                                       | Expected in Preview Orgs |
|--------------------------------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.05.2](#bug-fixed-in-2019-05-2)                                                          | May 22, 2019              |

### Bug Fixed in 2019.05.2

* The response ID of the User Schema API wasn't consistent with the actual server details. When a request was sent to `GET/URL/api/v1/meta/schemas/user/default` from a preview org, the response ID always contained a production org URL. (OKTA-218937)
