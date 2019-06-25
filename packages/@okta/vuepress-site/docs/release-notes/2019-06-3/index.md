---
title: Okta API Products Release Notes
---

## 2019.06.3

| Change                                                                                                                      | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Token Inline Hook Can Modify Sub-Objects and Array Elements](#token-inline-hook-can-modify-sub-objects-and-array-elements) | June 26, 2019            |
| [Bug Fixed in 2019.06.3](#bug-fixed-in-2019-06-3)                                                                           | June 26, 2019            |

### Token Inline Hook Can Modify Sub-Objects and Array Elements

The [Token Inline Hook](/docs/reference/token-hook/) now lets you modify particular sub-objects or array elements within objects contained in claims, without needing to update the rest of the object. <!-- OKTA-227364 -->

### Bug Fixed in 2019.06.3

* When using the [Token Inline Hook](/docs/reference/token-hook/), if you returned an `error` object to Okta, Okta did not pass the error through to the requester of the token. (OKTA-231397)

