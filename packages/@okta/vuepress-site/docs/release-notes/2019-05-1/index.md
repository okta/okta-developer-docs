---
title: Okta API Products Change Log
---

## 2019.05.1

| Change                                                                                                       | Expected in Preview Orgs |
|--------------------------------------------------------------------------------------------------------------|--------------------------|
| [Bug Fixed in 2019.05.1](#bugs-fixed-in-2019-05-1)                                                          | May 15, 2019              |

### Bug Fixed in 2019.05.1

* When trusted apps overrode the device token, device fingerprints were lost. This caused unexpected behavior for new sign-on notification emails and device-based behavior detection. (OKTA-226646)
