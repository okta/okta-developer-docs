---
title: Okta API Products Release Notes
---

## 2019.07.2

| Change                                                                                             | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------|--------------------------|
| [Deleting App Groups](#deleting-app-groups) | July 31, 2019             |

### Deleting App Groups

The `DELETE /groups/${groupId}` [endpoint](/docs/reference/api/groups/#remove-group) now supports deleting app groups, in addition to Okta groups. Note, however, that groups configured for group push cannot be deleted. <!-- OKTA-214275 -->

