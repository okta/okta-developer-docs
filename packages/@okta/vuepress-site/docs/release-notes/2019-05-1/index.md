---
title: Okta API Products Change Log
---

## 2019.05.1

| Change                                                                                                       | Expected in Preview Orgs |
|--------------------------------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.05.1](#bugs-fixed-in-2019-05-1)                                                          | May 15, 2019              |

### Bugs Fixed in 2019.05.1

* In some instances when trusted apps overrode the deviceToken context, device fingerprints were lost . This caused unexpected behavior for New Device Notification Emails and New Device Behaviors. (OKTA-226646)
