---
title: Burst rate limits
category: rate limits
---

# Burst rate limits

Okta’s burst rate limit feature lets authentication and authorization endpoints temporarily exceed rate limits to reduce end user impact. This ensures that any unplanned spike in usage doesn’t detrimentally affect the end-user experience. By default, burst rate limits are:

* Scoped to organization-wide buckets
* Extended a 5x multiplier
* Conditional on excess capacity available

 When a bucket’s default rate limit is exceeded, Okta sends warning, burst, and violation events to the System Log and through email notification (one per hour). For example, if the default rate limit is 600 requests per minute for the org-wide bucket `/api/v1/authn`. Then at 360 requests per minute, Okta would transmit a warning event (assuming the warning threshold is set at 60%), a burst event at 600 requests per minute and a violation event at 3000 requests per minute all in the same minute.

>**Note**: Email notifications are sent only on initially reaching the defined warning, burst, or violation limit and not for every endpoint call that exceeds these limits.

Burst rate limits can also be viewed on the APIs table on the [Rate Limit Dashboard](/docs/reference/rl2-monitor/#rate-limit-dashboard). Review the rate limit usage for each bucket on this view.

<div >

![This image displays the rate limit dashboard to monitor and browse rate limit usage.](/img/rate-limits/rl_dashboard6.png)

</div>

<div class="three-quarter">

![Displays the line graph, bar graph, and timeline graph](/img/rate-limits/rl_usage_over_time.png)

</div>
