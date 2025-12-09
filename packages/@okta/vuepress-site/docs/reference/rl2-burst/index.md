---
title: Burst rate limits
category: rate limits
---

# Burst rate limits

To minimize impact on end users, Okta typically allows usage above the rate limits for any buckets containing authentication or authorization endpoints with burst rate limits. This ensures that any unplanned spike in usage doesn’t detrimentally affect the end-user experience. Burst rate limits are conditional on overall system capacity, meaning that they’re applied only when the system has sufficient available resources to absorb the temporary increase in traffic.

By default, burst rate limits are:

* Scoped to org buckets
* Extended a 5x multiplier
* Conditional on excess capacity available

 When a bucket’s default rate limit is exceeded, Okta sends warning, burst, and violation events to the System Log and through email notification (one per hour). For example, if the default rate limit is 600 requests per minute for the org-scoped bucket `/api/v1/authn`. Then at 360 requests per minute, Okta would transmit a warning event (assuming the warning threshold is set at 60%), a burst event at 601 requests per minute, and a violation event at 3000 requests per minute, all in the same minute.

Burst rate limits can also be viewed on the APIs table on the [Rate limit dashboard](/docs/reference/rl2-monitor/#rate-limit-dashboard). Review the rate limit usage for each bucket on this view.

>**Note**: Email notifications are sent only on initially reaching the defined warning, burst, or violation limit and not for every endpoint call that exceeds these limits.
