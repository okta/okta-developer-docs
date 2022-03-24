---
title: Rate limit dashboard
excerpt: >-
  Understand how to use the rate limit dashboard, how to access it, how to use the multiple views using the graphs, and how to investigate a rate limit violation
---

# Rate limit dashboard

The rate limit dashboard is a tool that helps you understand the use of each API and investigate potential [rate limit](/docs/reference/rate-limits/) issues. The dashboard provides:

* The ability to track the rate limit's consumption.
* The ability to change rate limit settings and customize the warning threshold.
* Notification alerts when you're about to hit, have hit the rate limit, or exceeded the rate limit (burst rate limits).
* The ability for you to investigate the issue when an API has reached the rate limit.

The following describes some typical reasons for viewing the dashboard:

* You want to open the rate limits report to proactively monitor rate limit usage, and to manage rate limit settings and the warning threshold. See [Rate limit monitoring](#rate-limit-monitoring).
* You've hit a rate limit violation for an API, and you receive a notification that contains a link to the rate limits dashboard for that API so that you can investigate the violation. See [API rate limits and violations](#API-rate-limits-and-violations).

You can access the rate limit dashboard only if you're assigned one of these admin roles:

* `ROLE_APP_ADMIN`
* `ROLE_MOBILE_ADMIN`
* `ROLE_ORG_ADMIN`
* `ROLE_READ_ONLY_ADMIN`
* `ROLE_SUPER_ORG_ADMIN`
* `ROLE_API_ACCESS_MANAGEMENT_ADMIN`
* `ROLE_REPORT_ADMIN`

## Rate limit monitoring

The overview of the rate limits dashboard enables you to browse and monitor rate limit usage over a period of time whenever you want to check on an API. You can also configure the client rate limit settings and customize the threshold percentage for when a warning notification occurs.

The following describes typical uses of the functions in the Rate limits report:

* If the API had rate limit violations in the past, you can proactively monitor that API by checking its rate limits, any increase in traffic, and any abnormal activity. If you notice an increase in rate limit usage, you can start investigating the issue.
* If you're going to have an event and the API is going to be affected, you can check the current traffic on the API before the event. Then you can plan for traffic on the API during the event and determine the rate limit capacity for it.
* If you want to control the warning threshold on traffic consumption for an API, you can configure the rate limits settings and customize when your org should trigger a warning event. For instance, if you have CIAM and you've configured a [custom threshold](#warning-notification), a warning alert appears if you reach 90% of the rate limit. If you have Workforce, a warning alert appears if you reach 60% of the rate limit.

### Open the rate limits report

In the Admin Console, go to **Reports** > **Rate Limits**. The rate limits report opens in the **Overview** tab.

![Displays the rate limits dashboard to monitor and browse rate limit usage.](/img/rl_dashboard6.png)

The **Overview** tab provides you with graphs that plot the number of events (violations, bursts, and warnings) over a period of time and is based on system log events. Use the **Filters** dropdown menu, to select the time period and events you want to view. It also provides a table that lists your org's APIs and their corresponding current rate limits, violations, bursts, and warnings. See [Browse and monitor rate limit usage](#browse-and-monitor-rate-limit-usage).

The **Settings** tab allows you to change the per client rate limit settings and customize the threshold for warning notifications when the API's rate limit is exceeded. See [Change rate limit settings](#change-rate-limit-settings).

### Browse and monitor rate limit usage

#### Event count graphs

The Event Count graph plots the number of violations, bursts, and warnings over the selected time period, which can be the last 24 hours, last 7 days, last month, or last 3 months. The Events per API bar graph shows the top ten number of events by API over the same time period.

![Displays the events (violations, bursts, and warnings) over a period of time graph and the top 10 endpoint violations bar graph.](/img/rl_dashboard7.png)

You can hover over the line graph or bar graph to get more details. The details also include a link to the system log where you can view filtered events specific to that API and time period.

![Displays details on the violations graph.](/img/rl_dashboard8.png)

#### APIs table

The APIs table shows each API and its corresponding rate limit for your org. The rate limits include all overrides, dynamic scale, or Workforce multipliers. The table also shows the number of violations, bursts, and warnings for each API in the last hour, and includes a trendline of usage in the last hour.

![Displays the APIs table with corresponding rate limits for each API.](/img/rl_dashboard9.png)

You can sort on all the columns. The Trendline is sorted by the current usage.

Each API is a link that navigates you to the [dashboard view of API rate limits and violations](#API-rate-limits-and-violations) where you can obtain more details on the API.

You can perform a search or filter your table list by making an entry in the Search textbox. You can also perform a "lookup" with the Search textbox. For example, you're calling Okta with an example `requestURI` and you want to know the rate limit that will be applied to calls that are made against that `requestURI`.

### Change rate limit settings

#### Client-based rate limiting

You can enable per-client rate limiting to prevent a single client from blocking Internet traffic to Okta's `/login/login.htm` and OAuth 2.0 `/authorize` APIs. For each of these APIs, select from these options:

* **Enforce and log per client (recommended)** &mdash; Enables client-based rate limiting for all clients
* **Log per client** &mdash; Enables client-based rate limiting in log-only mode. Rate limiting is based on org-wide rate-limit values, but the client-specific rate limiting information is recorded as System Log events. By analyzing these events, you can determine if client-based rate limiting is effective for you.
* **Do nothing (not recommended)** &mdash; Disables client-based rate limiting

#### Warning notification

Warnings, which appear if the threshold for the rate limit is reached, generate a system log event, an entry in the Rate Limit Monitoring widget, and issue email notifications. Before your API hits its rate limit, you can change the threshold for when you want to be notified that your API has consumed a high amount of traffic.

For example, you may want to customize the rate limit threshold when an API normally has high traffic. In such a case, the threshold if set too low at 60% would generate too many warning notifications. If you customize the threshold to a higher percentage, such as 90%, the warning notifications wouldn't start until the API's rate limit is at 90%.

#### Burst rate notification

Bursts, or unexpected API calls that hit and exceed the rate limit, generate a system log event, an entry in the Rate Limit Monitoring widget, and issue email notifications. Your org receives a notification when the default rate limit is hit. See [Burst rate limits](/docs/reference/rate-limits/#burst-rate-limits).

## API rate limits and violations

The dashboard enables you to view an API, the current rate limit for each API, and usage of the API over a period of time. You can select the API of interest and get additional details such as the API's average usage and the top 10 IPs that are consuming the most traffic for the API.

You can investigate high usage of a rate limit, bursts, or a rate limit violation. After you know the issue, you can take the appropriate corrective action. For example, if the issue is high traffic, you may want to increase the rate limits. In cases where the issue is a rogue app or bad script, you can disable the app, or block that traffic. Whatever the issue is, you can remediate the issue through self-service. In cases where a higher rate limit is required, you can create a support case, by sending a request to the correct team for a rate limit increase.

### Open the dashboard to investigate warnings and violations

The dashboard is an optimized tool that helps you investigate warnings and violations, and therefore, access to the dashboard is available when you receive a rate limit violation for an API.

When a rate limit violation occurs, you're notified in the following ways and can access the rate limits dashboard from the link in the notification:

* You receive a rate limit email that informs you that you've hit a rate limit for an API. Click **View usage** in the email to navigate to the rate limits dashboard and System Log for that particular API.

![Displays the email notification of a rate limit violation with the link to the API's rate limit dashboard](/img/rl_dashboard1.png)

* You've hit a rate limit when you're in the Admin Console and the Rate Limit Monitoring widget informs you. Click **View** in the widget to open the rate limits dashboard or select the particular API in the widget, which opens to the rate limits dashboard with usage details for that API.

* You've hit a rate limit warning, burst, or violation, and a rate limit event (violation, burst, or warning) is created in the System Log from where you can click **View Usage** under **Event info** to go to the rate limits dashboard. All the rate limit events in the System Log (violations, bursts, and warnings) have a link to the rate limit dashboard.

![Displays the event in the System Log that notifies you of a rate limit violation with the link to the API's rate limit dashboard](/img/rl_dashboard3.png)

### Key components of the dashboard

The rate limit dashboard provides data use information for the API based on a set of statistics and shows multiple views of the data use. The dashboard helps you to investigate the rate limit, burst, or violation issue and to prevent subsequent rate limit issues from occurring. To view the most recent data, refresh your screen. There may be a slight delay of two to four minutes in obtaining new data.

#### Usage pane

The Usage pane provides a summary of the data use for the specified API. The following information on data use appears:

* Rate Limit: The rate limit for this API per minute for your org. If the traffic hits the rate limit for your org, the system triggers a rate limit violation.
* Latest Usage: The latest use of the API, which includes the API and its sub-APIs, as of the specified time
* Average Usage: The average use of the API within the last 24 hours and the last hour
* Impact: The amount of time that the org is affected by a rate limit violation on this API. The impact time is the remainder of the one-minute interval after your org hits the rate limit. For example, if your org hits the rate limit 40 seconds into the one-minute interval, then the impact time is 20 seconds for that API.

#### Rate limit multiplier

A customer can additionally purchase the rate limit multiplier, which is an add-on feature that allows the customer to multiply an existing rate limit. For example, three times the current rate limit.

![Displays the line graph, bar graph, and timeline graph in the Rate limit usage over time pane](/img/rl_dashboard4.png)

The key benefit of purchasing the rate limit multiplier, therefore getting an increased rate limit, isn't to stop end users from using an application. The rate limit multiplier is based on the customer's org and what the expected use would be. If a customer has dynamic scale, the info icon beside **Rate Limit** in the Overview pane indicates which tier was purchased, and the graphs in the [Rate limit usage over time pane] reflect the applied rate limit multiplier. To purchase the rate limit multiplier, either create a support ticket or contact your customer support representative.

#### Rate limit usage over time pane

The Rate limit usage over time pane comprises the line graph, bar graph, and timeline graph.

![Displays the line graph, bar graph, and timeline graph](/img/rl_usage_over_time.png)

##### Line graph

The line graph shows the total number of requests and the number of unique IPs over the past hour for the API if the **Total Requests** and **# of Unique IPs** toggle buttons are enabled. If an IP address is selected in the bar graph, the line graph also shows the traffic from that IP address.

Each data point represents how many times the API was called within that one-minute window. You can select a point in the line graph to see which IPs were making requests at that time. If there's a spike in the rate limit use, you can hover over the line graph and view the number of requests and the number of unique IPs in the past hour.

##### Timeline graph

The timeline graph shows use over the last week. When a rate violation occurs, you can select a day from the past week from the dropdown menu on the timeline graph and compare the same point in time with a day from the past week.

##### Bar graph

The **Top Requests by IP** bar graph shows the top 10 IP addresses that are consuming the most traffic for the API. This view enables you to check if there is a single IP or multiple IPs that are creating the spike in traffic.

Click an IP address bar once to view the traffic for that IP address on the line graph. Double-click any IP address bar to view the traffic for all the IP addresses on the line graph.

### Investigate the rate limit violation

Each graph, either by itself or combined, provides you with multiple views that display the information about the rate limit violation. You can also refer to the help information on the dashboard when you are trying to figure out the rate limit violation to see if it fits into one of the common scenarios most likely to happen.

#### Combination of the line graph and bar graph view

The line graph shows usage in the past hour and allows you to focus on a particular point during the hour when an event occurred and caused a spike in the rate limit. The bar graph identifies the top 10 IP addresses that are consuming the most traffic. From there, you can obtain more data, such as observing if there is a sudden spike in the use of one IP while all the other IPs continue to have relatively normal use. You can then identify the offending IP responsible for the spike in traffic for which you should take appropriate action. Alternatively, you can conclude that there is no offending issue and that the API requires a higher rate limit due to high use.

The line graph can show the number of unique IPs that are creating traffic at a given minute. For example, the line graph can show many users are signing in at the same time, perhaps to attend a company-wide meeting. By comparing the number of unique IPs to the number of unique requests, you can see almost the same number of IPs as the number of requests. This means that there are a lot of IPs creating the traffic and not just one IP consuming all the traffic.

#### Combination of the line graph and timeline graph view

The timeline graph gives you an overview of use from the days in the past week so that you can drill in to other time periods from the previous week. You can select one day at a time within the past week from the dropdown menu and view use one hour at a time in the line graph. These views enable you to understand whether this rate limit was an abnormal spike in use compared to fairly regular use up to that point in time.

#### Bar graph view

The bar graph compares a rogue IP or App with other IPs or Apps. For example, the bar graph can show a single rogue IP that is responsible for a spike in traffic that appears in the line graph. It can also show many users that are signing in at the same time, perhaps to attend a company-wide meeting or to check out a special offer that was just delivered in a mass email to a company's clients.

### Potential next steps

If you find that the rate limit usage is generally high, you may want to adjust your rate limit maximums. If your company is planning an upcoming event, such as an upcoming marketing campaign, you may want to figure out the rate limit capacity that you'd need. In both cases, we recommend that you contact Okta support to determine and adjust your rate limits.

If the usage is high over a long period of time, you may need to take action to lower the usage. This means that if high traffic usage points to a particular offender, you would need to inform or block the offender (such as a malfunctioning app, a bad script, or a rogue user) that is causing the traffic. For example, you can either reach out to the team that writes the script or block the user or application that is causing the traffic.
