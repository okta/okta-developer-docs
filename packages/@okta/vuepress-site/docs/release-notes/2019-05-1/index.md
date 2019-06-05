---
title: Okta API Products Release Notes
---

## 2019.05.1

| Change                                                                                                       | Expected in Preview Orgs |
|--------------------------------------------------------------------------------------------------------------|--------------------------|
| [Bugs Fixed in 2019.05.1](#bugs-fixed-in-2019-05-1)                                                          | May 15, 2019              |

### Bugs Fixed in 2019.05.1

* When trusted apps overrode the device token, device fingerprints were lost. This caused unexpected behavior for new sign-on notification emails and device-based behavior detection. (OKTA-226646)
* When a Group admin (who manages more than 1 user group) used the API to fetch users with pagination, the request failed to create a link for the next page of users. (OKTA-222660)
