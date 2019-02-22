---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.47
---

## 2016.49

### Feature Enhancements

#### Delete User API in EA

API access to [delete users](/docs/api/resources/users#delete-user) is now in EA. To request the feature, contact [Support](https://support.okta.com/help/open_case).
<!-- OKTA-109291 -->

#### System Query Log Change

System logs are truncated after six months. You may want to revise any system log queries for the new limit.
This change allows us to provide faster, more consistent responses to a wider range of system-log API requests.
Because the system keeps less data in memory, it responds faster.
<!-- OKTA-105346 -->

### Platform Bugs Fixed

* Two users created simultaneously with the same login returned an HTTP 500 error. Now, a validation error is returned. (OKTA-105484)
* If an administrator was reassigned to a User Administrator role that was scoped to a group, requests to the Users API returned fewer records than indicated by the limit parameter. (OKTA-107410)
* Creating users with the Users API failed if a bookmark app was assigned to a group. (OKTA-108185)
* User profiles weren't always updated with social profile changes. (OKTA-108602)
