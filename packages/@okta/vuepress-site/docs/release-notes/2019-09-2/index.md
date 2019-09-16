---
title: Okta API Products Release Notes
---

## 2019.09.2

| Change                                                                             | Expected in Preview Orgs |
|------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.09.2](#bug-fixed-in-2019-09-2)                                  | September 18, 2019       |

### Bug Fixed in 2019.09.2

* When users signed in using IdP Discovery or a Default IdP, any [outgoing Hooks](/docs/reference/token-hook/#sample-json-payload-of-a-request) related to that sign-in event contained an incorrect request URL `value`. (OKTA-243190)
