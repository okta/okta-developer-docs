---
title: Okta API Products Change Log
excerpt: Release Note for 2017.47 Bug fix to partial profile update
---

## 2017.47

### API Bug Fix

The following bug fix will be available on preview orgs starting November 21, and will be available on production orgs starting November 28, 2017:

* A partial profile update (POST `/api/v1/users/ {userId}`) incorrectly required that `login` be specified in the `profile`. (OKTA-145770)
