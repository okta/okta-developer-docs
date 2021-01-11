---
title: Okta API Products Release Notes
---

## 2021.01.1

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2021.01.1](#bugs-fixed-in-2021-01-1)       | January 13, 2021           |

### Bugs fixed in 2021.01.1

* AD bulk imports and RealTimeSync (RTS) failed when the Microsoft Active Directory user profile contained `tokenGroups`, `tokenGroupsGlobalAndUniversal`, or `tokenGroupsNoGCAcceptable` attributes. (OKTA-354900)

* In the SmartSheet provisioning profile, admins were unable to change the **Group Priority** setting to **Combine values across groups** for the variable `smartsheet.userPermissions`. They received the error “Not allowed to modify property userPermissions from the base schema”. (OKTA-325187)
