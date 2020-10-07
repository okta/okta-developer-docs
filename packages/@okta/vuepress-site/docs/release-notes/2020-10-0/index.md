---
title: Okta API Products Release Notes
---

## 2020.10.0

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Troubleshooting assistance for app redirect URI](#troubleshooting-assistance-for-app-redirect-uri) | October 7, 2020          |
| [API Access Management enables scope as a claim](#api-access-management-enables-scope-as-a-claim)   | October 7, 2020          |
| [Rate limit changes](#rate-limit-changes)                                                           | October 7, 2020          |
| [Client-based rate limiting](#client-based-rate-limiting)                                           | October 7, 2020          |
| [Groups API enhancements in EA](#groups-api-enhancements-in-ea)                                     | October 7, 2020          |

### Troubleshooting assistance for app redirect URI

When an app redirect URI is either missing or incorrectly configured, Okta returns an HTTP 400 error. Now, the error description provides troubleshooting assistance to debug the expected redirect URI. <!--OKTA-297932-->

### API Access Management enables scope as a claim

You can now name a claim `scope` in API Access Management [custom authorization servers](/docs/guides/customize-authz-server/). Also, you can now use the EL expression `access.scope` in custom claims to return an array of granted scope strings. <!--OKTA-325243-->

### Rate limit changes

Rate limits for paid developer orgs and for one-app orgs have been updated. See the [Rate Limits](/docs/reference/rate-limits/) page. <!--OKTA-332153-->

### Client-based rate limiting

[Client-based rate limiting](/docs/reference/rl-clientbased/) for the `/authorize` endpoint is now available in Preview. It provides granular isolation between requests made to the `/authorize` endpoint by using a combination of the Client ID, user's IP address, and Okta device identifier. This isolates rogue OAuth clients and bad actors, ensuring valid users and applications don't run into rate limit violations. <!--OKTA-328984-->

### Groups API enhancements in EA

The [Groups API](/docs/reference/api/groups/) now supports extended search. Also, source application is now returned in [Group](/docs/reference/api/groups/#group-object) objects.

