---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.09
---

## 2017.10

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions
separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting
another. Treating authenticated end-user interactions separately will lessen the chances of one user's
impacting another. We're also providing a transition period so you can see what these changes will
look like in your Okta system log before enforcing them:

1. Starting in early April, 2017, we'll provide system log alerts to let you know that you
would have exceeded any of these new API rate limits.
2. Starting in mid-April, 2017, we'll treat authenticated end-user interactions on a per-user basis.
Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Early in May, 2017, we will enforce the new, more granular rate limits. At that
point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

### Platform Bugs Fixed

 * Request to [`/api/v1/authn/factors/<factorId>/verify`](/docs/api/resources/authn#enroll-factor) responded with a valid `stateToken` after user status
 became `LOCKED_OUT`, causing user interface errors. (OKTA-115153)
 * The AuthSJ SDK produced a debug log message with some browsers. (OKTA-115460)
