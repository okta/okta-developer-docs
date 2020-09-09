---
title: Okta API Products Release Notes
---

## 2019.07.2

| Change                                                                                             | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------|--------------------------|
| [Deleting App Groups](#deleting-app-groups)                 | July 31, 2019            |
| [Bug Fixed in 2019.07.2](#bug-fixed-in-2019-07-2)           | July 31, 2019            |

### Deleting App Groups

The `DELETE /groups/${groupId}` [endpoint](/docs/reference/api/groups/#remove-group) now supports deleting app groups, in addition to Okta groups. Note, however, that groups configured for group push cannot be deleted. <!-- OKTA-214275 -->

### Bug Fixed in 2019.07.2

* When [API Access Management](/docs/concepts/api-access-management/) Consent was enabled, the factor lifetime configured in the App Sign On Rule was ignored and the "Do not challenge me on this device for XXX" prompt didn't appear to the end user when signing in to an [OpenID application](/docs/concepts/oauth-openid/). (OKTA-2233290)
