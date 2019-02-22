---
title: Okta API Products Change Log
excerpt: 2017.46 Release Note HAL link bug fixed
---

## 2017.46

### API Bug Fix

The following bug fix is available now on preview orgs, and will be available on production orgs starting November 28, 2017:

* After updating a user with a POST to `/user/{userId}`, HAL links would not be included in the response body. (OKTA-145195)
