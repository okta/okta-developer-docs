---
title: Okta API Products Release Notes
---

## 2020.06.1

| Change                                              | Expected in Preview Orgs |
| --------------------------------------------------- | ------------------------ |
| [Bug fixed in 2020.06.1](#bug-fixed-in-2020-06-1)   | June 10, 2020            |

### Bug fixed in 2020.06.1

For deleted or inactive instances, or instances that don't support CVD, calls to the `/mappings` endpoint incorrectly returned HTTP 500 errors.
