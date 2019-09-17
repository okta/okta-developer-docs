---
title: Okta API Products Release Notes
---

## 2019.09.2

| Change                                                                             | Expected in Preview Orgs |
|------------------------------------------------------------------------------------|--------------------------|
| [Bugs Fixed in 2019.09.2](#bugs-fixed-in-2019-09-2)                                  | September 18, 2019       |

### Bugs Fixed in 2019.09.2

* When users signed in using IdP Discovery or a Default IdP, any [outgoing Hooks](/docs/reference/token-hook/#sample-json-payload-of-a-request) related to that sign-in event contained an incorrect request URL `value`. (OKTA-243190)
* `GET` requests to the `/users/me` [endpoint](/docs/reference/api/users/#get-current-user) would return hidden standard attributes. (OKTA-243864)
