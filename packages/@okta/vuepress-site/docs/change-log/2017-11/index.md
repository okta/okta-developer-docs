---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.10
---

## 2017.11

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

### Feature Improvements

 * Sample code to demonstrate OIDC authorization flows is available from the following locations:
   * [https://github.com/okta/samples-js-angular-1](https://github.com/okta/samples-js-angular-1)
   * [https://github.com/okta/samples-nodejs-express-4](https://github.com/okta/samples-nodejs-express-4)
   * [https://github.com/okta/samples-js-react](https://github.com/okta/samples-js-react)
   * [https://github.com/okta/samples-java-spring-mvc](https://github.com/okta/samples-java-spring-mvc)
<!-- (OKTA-118575) -->

 * System log now records the result of applying the Okta sign-on policy to determine whether
 to use multi-factor authentication for a user trying to log in. This log entry includes
 the user's zone.

![Log screen](/assets/img/graphics/SysLogMFA.png "Log screen")
<!-- (OKTA-114417) -->

### Platform Bug Fixed

For a user mastered from Active Directory and in password reset mode, the /api/v1/users API
returned the user's status as ACTIVE rather than RECOVERY. (OKTA-109772)
