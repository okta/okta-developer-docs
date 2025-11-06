---
title: Burst rate limits
category: rate limits
---

# Burst rate limits

To minimize impact on end users, Okta typically allows usage above the rate limits for any buckets containing authentication and/or authorization endpoints with the burst rate limit feature. This ensures any unplanned spike does not detrimentally affect the end user experience. By default, burst rate limits are:

* Scoped to organization wide buckets
* Extended a 5x multiplier
* Conditional on excess capacity available

In a scenario where the default rate limit for a bucket is exceeded, Okta will deliver a warning event, a burst event, and a violation event in the System Log and through an e-mail notification. For example, if the default rate limit is 600 requests per minute for the org-wide bucket `/api/v1/authn`. Then at 360 requests per minute, Okta would transmit a warning event (assuming the warning threshold is set at 60%), a burst event at 600 requests per minute and a violation event at 3000 requests per minute all in the same minute.

Burst rate limits can also be viewed on the APIs table on the [Rate Limit Dashboard](/docs/reference/rl2-monitor/#rate-limit-dashboard) and the rate limit usage view for each bucket.

<div >

![This image displays the rate limit dashboard to monitor and browse rate limit usage.](/img/rate-limits/rl_dashboard6.png)

</div>

<div class="three-quarter">

![Displays the line graph, bar graph, and timeline graph](/img/rate-limits/rl_usage_over_time.png)

</div>
