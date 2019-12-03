---
title: Okta API Products Release Notes
---

## 2019.11.3

| Change                                             | Expected in Preview Orgs |
| -------------------------------------------------- | ------------------------ |
| [Bugs Fixed in 2019.11.3](#bugs-fixed-in-2019-11-3)| December 4, 2019         |

### Bugs Fixed in 2019.11.3

* POST calls to the `/api/v1/apps` endpoint couldn't be used with [OAuth for Okta](/docs/guides/implement-oauth-for-okta/overview/). (OKTA-259867)

* In some situations, ID tokens returned from Okta didn't contain the `idp` claim. (OKTA-253962)