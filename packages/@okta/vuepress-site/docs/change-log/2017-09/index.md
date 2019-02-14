---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.05
---

## 2017.09

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions
separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting
another. Treating authenticated end-user interactions separately will lessen the chances of one user's
impacting another. We're also providing a transition period so you can see what these changes will
look like in your Okta system log before enforcing them:

1. Shortly after February 28, 2017, we'll provide system log alerts to let you know that you
would have exceeded any of these new API rate limits.
2. Sometime in March, 2017, we'll treat authenticated end-user interactions on a per-user basis.
Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Shortly after March 31, 2017, we will enforce the new, more granular rate limits. At that
point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

### Feature Improvement

For a collection of Users, the Links object contains only the self
link. This feature will be in preview for at least a month.
<!-- (OKTA-115269) -->

### Platform Bugs Fixed

 * The OpenID Connect and API Access Management ID Tokens contained an extraneous attribute. (OKTA-95042)
 * Some users created with the API were not activated automatically. (OKTA-112833)
