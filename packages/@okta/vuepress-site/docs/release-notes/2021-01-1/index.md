---
title: Okta API Products Release Notes
---

## 2021.01.1

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2021.01.1](#bugs-fixed-in-2021-01-1)       | January 13, 2021           |

### Bugs fixed in 2021.01.1

* Active Directory (AD) bulk imports and RealTimeSync (RTS) failed when the Microsoft AD user profile contained `tokenGroups`, `tokenGroupsGlobalAndUniversal`, or `tokenGroupsNoGCAcceptable` attributes. (OKTA-354900)

* In the SmartSheet provisioning profile, admins were unable to change the **Group Priority** setting to **Combine values across groups** for the `smartsheet.userPermissions` variable. The error message “Not allowed to modify property userPermissions from the base schema” was returned. (OKTA-325187)
