---
title: Okta API Products Release Notes
---

## 2019.10.2

| Change                                                                                                            | Expected in Preview Orgs |
|-------------------------------------------------------------------------------------------------------------------|--------------------------|
| [User Types Error Message Change](#user-types-error-message-change)     | October 30, 2019         |
| [Bugs Fixed in 2019.10.2](#bugs-fixed-in-2019-10-2)                                                           | October 30, 2019        |

### User Types Error Message Change

Error messages returned by the `/types/user` [API](/docs/reference/api/user-types/) have changed. Omitting display name or variable name when attempting to create a User Type, or specifying a variable name that is already in use, results in a more specific error message being returned. <!-- OKTA-241017 -->

### Bugs Fixed in 2019.10.2

* A `SameSite=None` attribute sent by Okta caused a bug in cross-site handling of cookies in Chrome on iOS 12.* or earlier. (OKTA-254174)
* In the `/features` [API](/docs/reference/api/features/), when using `mode=force` to enable a feature and its dependencies, email notification was not sent to admins for Beta dependencies that were enabled. (OKTA-249644)
* The length of EL expressions that you could specify for [OAuth 2.0 claim values](/docs/reference/api/authorization-servers/#claim-operations) was previously limited to a shorter length but has now been increased to 1024 characters. (OKTA-237675)
