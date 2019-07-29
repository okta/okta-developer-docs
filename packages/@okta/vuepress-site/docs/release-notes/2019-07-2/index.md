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

* When [API Access Management](/docs/concepts/api-access-management/) consent was enabled, the factor lifetime configured in the App Sign On Rule was ignored. This resulted in the "Do not challenge me on this device for XXX" prompt not appearing to the end user in the [OpenID Connect/OAuth 2.0](/docs/concepts/auth-overview/) flow for Custom Authorization Servers. (OKTA-2233290)