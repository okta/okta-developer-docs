---
title: Okta API Products Release Notes
---

## 2019.06.3

| Change                                                                                                                      | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Token Inline Hook Can Modify Sub-Objects and Array Elements](#token-inline-hook-can-modify-sub-objects-and-array-elements) | June 26, 2019            |
| [Bugs Fixed in 2019.06.3](#bugs-fixed-in-2019-06-3)                                                                         | June 26, 2019            |

### Token Inline Hook Can Modify Sub-Objects and Array Elements

The [Token Inline Hook](/docs/reference/token-hook/) now lets you modify particular sub-objects or array elements within objects contained in claims, without needing to update the rest of the object. <!-- OKTA-227364 -->

### Bugs Fixed in 2019.06.3

* When a customer used a [Token Inline Hook](/docs/reference/token-hook/) and returned an `error` object to Okta, Okta failed to pass the error to the token requester. (OKTA-231397)

* The issuer claim inside JWT tokens was erroneously changing to all lowercase causing JWT verification failure when the application was case-sensitive. (OKTA-235710)