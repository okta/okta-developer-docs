---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.11
---

## 2017.12

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions
separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting
another. Treating authenticated end-user interactions separately will lessen the chances of one user's
impacting another. We're also providing a transition period so you can see what these changes will
look like in your Okta system log before enforcing them:

1. Starting in early April, 2017, we'll provide system log alerts to let you know that you
would have exceeded any of these new API rate limits.
2. Starting in early April, 2017, we'll treat authenticated end-user interactions on a per-user basis.
Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Early in May, 2017, we will enforce the new, more granular rate limits. At that
point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

### Platform Bugs Fixed
 * The `/api/v1/apps` API sometimes incorrectly returned `null` for the `realm` or `groupName`
 attribute for a Template WS-Fed application. (OKTA-117274)
 * PUT to the `/api/v1/idps/{idpId}` API sometimes incorrectly returned an HTTP response code of 500
 rather than 400. (OKTA-117691)
 * The `/api/v1/idps` API improperly allowed social identity providers to be created
 when the administrator did not have sufficient permissions. Those providers could not be used. (OKTA-118067)
 * The `/api/v1/apps` API returned an incorrect number of app instances when pagination and permissions
 filtering were both in effect. (OKTA-113411)
