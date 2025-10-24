---
title: Monitoring and troubleshooting rate limits
category: rate limits
---

# Monitoring and troubleshooting rate limits

Use the following sections to monitor and troubleshoot rate limits.

## Alerts and notifications

Okta’s alerting and notification features help you detect, investigate, and respond to critical system and API events. Alerts appear in your Admin Console, Rate Limit Dashboard, System Log, and email---and in many cases, Okta also includes helpful context in HTTP response headers.

>**Note:** Alerts (email and rate limit dashboard) are triggered by the consumption of the overall quota assigned to an org-scoped bucket, rather than an individual API token's or application's allocated capacity.

| Alert Type | What it Means                                               | Triggers                                                                 | Frequency of Email Alerts    | Visibility                                                        |
|------------|-------------------------------------------------------------|-------------------------------------------------------------------------|-----------------------------|-------------------------------------------------------------------|
| Warning    | API usage approaching default rate limit.                   | Custom threshold % defined in Rate Limit dashboard settings.             | Once per day per bucket     | Admin Console Dashboard, Rate Limit Dashboard, System Log, Email  |
| Burst      | Short-lived increase in the rate limit threshold for supported endpoints. | Default rate limit for a bucket is exceeded (authentication and authorization endpoints only). | Once per day per bucket     | Admin Console Dashboard, Rate Limit Dashboard, System Log, Email  |
| Violation  | Default rate limit exceeded and requests were denied with 429 response code. | The default rate limit for a bucket is exceeded.                         | Once per hour per bucket    | Admin Console Dashboard, Rate Limit Dashboard, System Log, Email  |

## Rate limit dashboard

The Rate Limit dashboard helps you monitor, troubleshoot, and optimize API traffic across your Okta organization. It’s built to give real-time insight into rate limit usage so you can prevent disruptions and resolve incidents quickly.

What you can do here:

* Track usage and trends for each organization scoped bucket

* Investigate rate limit warnings, bursts, and violations

* Configure custom warning thresholds

* Enable per-client rate limiting

* Identify traffic patterns by IP, API token, or OAuth2 applications

### Common use-cases

| Use-Case                        | What to Do                                                                                   |
|----------------------------------|---------------------------------------------------------------------------------------------|
| Preparing for a high-traffic event | Check current traffic patterns, plan for expected loads, and/or adjust limits or thresholds  |
| Just received a violation alert   | Jump into the dashboard to inspect which endpoint, IP or client caused it                   |
| Monitoring proactively            | Use event graphs and tables to catch rising trends and respond before violations happens    |
| Tuning warning notifications      | Adjust thresholds to avoid alert fatigue or late detection                                  |

Who has access:

The Rate Limit dashboard can be accessed through the Admin console > **Reports** > **Rate Limits**. Only the following administrative roles can access this dashboard:

* App Admin (`APP_ADMIN`)
* Mobile Admin (`MOBILE_ADMIN`)
* Org Admin (`ORG_ADMIN`)
* Read-only Admin (`READ_ONLY_ADMIN`)
* Super Admin (`SUPER_ADMIN`)
* API Access Management Admin (`API_ACCESS_MANAGEMENT_ADMIN`)
* Report Admin (`REPORT_ADMIN`)

See also: [Standard administrator roles and permissions](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison) and [Roles in Okta](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/).

### Dashboard overview tab

The **Overview** tab is your monitoring hub. Use it to scan for issues or drill into specifics.

* Event graphs: Visualize warnings, bursts, and violations over time
* Top offenders: A bar graph shows the top five APIs with the most rate limit events
* API table: Each API is listed with current rate limits (including overrides and multipliers), recent events, and a usage trend line for the last hour

You can hover to reveal detailed data points, click an API to see deeper metrics and historical usage, or filter by time period, multiplier status, or event type.

<div >

![This image displays the rate limit dashboard to monitor and browse rate limit usage.](/img/rate-limits/rl_dashboard6.png)

</div>

### Events graph

The event count graph plots the number of violations, bursts, and warnings over the selected time period, which can be the last 24 hours, the last seven days, last month, or the last three months. The events by API bar graph shows the top five number of events by API over the same time period.

<div class="three-quarter">

![This image displays the events (violations, bursts, and warnings) over a time period graph and the top five endpoint events bar graph.](/img/rate-limits/rl_dashboard7.png)

</div>

You can hover over the line graph or bar graph to get more details. The details also include a link to the System Log where you can view filtered events specific to that API and time period.

<div class="half">

![Displays details on the violations graph.](/img/rate-limits/rl_dashboard8.png)

</div>

### API Table

This sortable, filterable table shows each API endpoint showing:

* Effective rate limit (including multipliers and overrides)
* Violations, bursts, and warnings for the last hour
* A mini trend line for current traffic and a direct link to detailed API usage

You can also use the search box to look up specific endpoints. For example, you're calling Okta with an example `requestURI` and you want to know the rate limit that's applied to calls that are made against that `requestURI`.

<div class="three-quarter">

![Displays the APIs table with corresponding rate limits for each API.](/img/rate-limits/rl_dashboard9.png)

</div>

Unless the endpoint is called out in the dashboard, API endpoints that end with an asterisk (for example, `/api/v1/users*`) refer to calls that use that base schema and count towards that call's limit. It's also important to note the HTTP operation involved with each call, as the same call with different operations can count towards different limits.

### Dashboard settings tab

Customize your org’s client rate limit behavior and warning thresholds in this tab.

#### Client-based rate limiting

Client-based rate limiting provides granular, targeted protection for the unauthenticated endpoints used during an application's access flow By default, per-client rate limiting is enabled. Each client is allocated 60 requests per minute. See [Client-based rate limits](/docs/reference/rl2-client-based) for more details.

| Mode                        | Description                                                                                                                                         |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Enforce and log per client  | (Recommended) This is the default setting. The rate limit is based on client-specific values, and violation information is logged as System Log events. |
| Log per client              | The rate limit is based on the org-wide values, but client-specific violation information is still logged. This allows you to analyze potential impact without actively blocking requests. |
| Do nothing                  | (Not Recommended) Rate limits aren't enforced at the client-specific level; only org-wide limits apply. No client-specific events are logged.         |

#### Warning thresholds

Set the percentage of your limit at which you want to be notified. You can fine-tune these thresholds to match the nature of your traffic so that alerts are timely and relevant.

For example, you may want to customize the rate limit threshold when an API normally has high traffic. In such a case, the threshold if set too low at 60% would generate too many warning notifications.

### Investigating API usage

Clicking an API in the API table takes you to a deep-dive dashboard. Any alerts provided by Okta will also provide a link to the deep-dive dashboard for the impacted endpoint.

<div class="three-quarter">

![Displays the line graph, bar graph, and timeline graph](/img/rate-limits/rl_usage_over_time.png)

</div>

**Overview Pane:**

* Rate limit: The rate limit for this API per minute for your org. If the traffic hits the rate limit for your org, the system triggers a rate limit violation. Hovering over the information icon will also display multipliers applied or purchased.

* Latest usage: this is the current percentage of the rate limit consumed for this API (this includes all endpoints for a given bucket).

* Average usage: this is the percentage of the rate limit consumed for this API within the last 24 hours and the last hour.

* Impact: The amount of time that the org is affected by a rate limit violation on this API. The impact time is the remainder of the one-minute interval after your org hits the rate limit. For example, if your org hits the rate limit 40 seconds into the one-minute interval, then the impact time is 20 seconds for that API.

**Rate Limit Usage over Time Pane:**

* Line Graph: shows the total number of requests within a one-minute window and the number of unique IPs over the past hour for the API if the Total Requests and # of Unique IPs toggle buttons are enabled. If an IP address is selected in the bar graph, the line graph also shows the traffic from that IP address. Hovering over the line graph will show you the number of requests and the number of unique IPs in the past hour.

* Timeline Graph: allows you to compare traffic for the same endpoint across multiple days to spot recurring spikes. Defaults to “Today” but can go back 7 days.

* Bar Graph: shows the top 10 IP addresses, API tokens, or OAuth 2.0 applications that consume the most traffic for that API.

Okta provides several tools to give you real-time visibility into your API usage so that you can prevent disruptions and resolve incidents quickly. The troubleshooting process can be simplified into four steps: Confirm, identify, correlate, and action.

### Confirm you’re hitting a rate limit

* Check for HTTP 429 responses in your application logs or API client
* Alerts in the Rate Limit Dashboard or notifications in your email inbox
* Check the System Log for rate limit violation events
* Look at the response headers Okta provides to view both concurrent and org-wide rate limits.
  * `X-Rate-Limit-Limit`: the rate limit ceiling that’s applicable for the current request.
  * `X-Rate-Limit-Remaining`: the amount of requests left for the current rate-limit window.
  * `X-Rate-Limit-Reset`: the time at which the rate limit resets, specified in UTC epoch time (in seconds).

#### Example rate limit header with org-scoped rate limit

<div class="three-quarter">

![Displays rate limit headers with org-scoped rate limit](/img/rate-limits/rl-headers-org-scoped.png)

</div>

### Example rate limit header with org-scoped rate limit exceeded

<div class="three-quarter">

![Displays rate limit headers with org-scoped rate limit exceeded](/img/rate-limits/rl-headers-org-scoped-exceeded.png)

</div>

### Example rate limit header with concurrent rate limit exceeded

<div class="three-quarter">

![Displays rate limit headers with concurrent rate limit exceeded](/img/rate-limits/rl-headers-concurrent-exceeded.png)

</div>

### Identify the source and check the Rate Limit Dashboard for more information

### Investigate the System Log to correlate events with users, jobs, or integrations

### Action


