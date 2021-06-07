---
title: Rate limit dashboard
excerpt: >-
  Understand how to use the rate limit dashboard, how to access it, how to use the multiple views using the graphs, and how to investigate a rate limit violation
---

# Rate limit dashboard

The rate limit dashboard is a tool that helps you understand the use of each endpoint and investigate potential [rate limit](/docs/reference/rate-limits/) issues. The dashboard provides:

* The ability to track the endpoint's use
* Alerts when you are about to hit or have hit the rate limit
* The ability for you to investigate the issue when an endpoint has reached the rate limit

You can find out more about the rate limit dashboard in these sections:

 Section                                                                          | Description                                                                                     |
| --------------------------------------------------------------------------------  | -------------------------------------------------------------------------               |
| [About the rate limit dashboard](#about-the-rate-limit-dashboard)                                                          | A summary of the rate limit dashboard                     |
| [Access the dashboard](#access-the-dashboard)                                                                  | The different types of notifications that provide access to the dashboard |
| [Key components of the dashboard](#key-components-of-the-dashboard)                                                        | A description of the key components on the dashboard                                                      |
| [Investigate the rate limit violation](#investigate-the-rate-limit-violation)                                                                | How to use the key components on the dashboard to investigate the rate limit violation                                                     |
| [Potential next steps](#potential-next-steps)                                                                | The recommended next steps you can take to resolve your rate limit issues                                    |

## About the rate limit dashboard

The dashboard enables you to view an endpoint, the current rate limit for each endpoint, and use of the endpoint over a period of time in the Admin Console. You can select the endpoint of interest and get additional details such as the endpoint's average use and the top 10 IPs that are consuming the most traffic for the endpoint. A warning appears if the threshold for the rate limit is reached. For instance, if you have CIAM, a warning alert appears if you reach 90% of the rate limit. If you have Workforce, a warning alert appears if you reach 60% of the rate limit.

You can investigate high use of a rate limit or a rate limit violation. After you know the issue, you can take the appropriate corrective action. For example, if the issue is high traffic, you may want to increase the rate limits. In cases where the issue is a rogue app or bad script, you can disable the app, or block that traffic. Whatever the issue is, you can remediate the issue through self-service. In cases where a higher rate limit is required, you can create a support case, by sending a request to the correct team for a rate limit increase.

## Access the dashboard

When a rate limit violation occurs, you're notified in the following ways and can access the rate limits dashboard from the link in the notification:

* You receive a rate limit email that informs you that you've hit a rate limit for an endpoint. Click **View utilization history** in the email to navigate to the rate limits dashboard and System Log for that particular endpoint.

![Access the dashboard by email notification](/img/RLDashboard1.png "Displays the email notification of a rate limit violation with the link to the endpoint's rate limit dashboard")

* You've hit a rate limit when you're in the Admin Console, and a banner appears to inform you. Click **utilization history** in the banner to open the rate limits dashboard for that particular endpoint or **syslog** to open the System Log.

![Access the dashboard by link in the banner](/img/RLDashboard2.png "Displays the banner in the dashboard that notifies you of a rate limit violation with the link to the endpoint's rate limit dashboard")

* You've hit a rate limit warning or violation, and a rate limit event (violation or warning) is created in the System Log from where you can click **View Utilization** under **Event info** to go to the rate limits dashboard. All the rate limit events in the System Log (violations and warnings) have a link to the rate limit dashboard.

![Access the dashboard by link in the System Log](/img/RLDashboard3.png "Displays the event in the System Log that notifies you of a rate limit violation with the link to the endpoint's rate limit dashboard")

## Key components of the dashboard

The rate limit dashboard provides data use information for the endpoint based on a set of statistics and shows multiple views of the data use. The dashboard helps you to investigate the rate limit or violation issue and to prevent subsequent rate limit issues from occurring. To view the most recent data, refresh your screen. There may be a slight delay of two to four minutes in obtaining new data.

### Overview pane

The Overview pane provides a summary of the data use for the specified endpoint. The following information on data use appears:

* Rate Limit: The rate limit for this endpoint per minute for your org. If the traffic hits the rate limit for your org, the system triggers a rate limit violation.
* Latest Utilization: The latest use of the endpoint, which includes the endpoint and its sub-endpoints, as of the specified time
* Average Utilization: The average use of the endpoint within the last 24 hours and the last hour
* Downtime: The amount of time that the org is affected by a rate limit violation on this endpoint

### Rate limit multiplier

A customer can additionally purchase the rate limit multiplier, which is an add-on feature that allows the customer to multiply an existing rate limit. For example, three times the current rate limit.

![Summary of the rate limit utilization over time pane](/img/RLDashboard4.png "Displays the line graph, bar graph, and timeline graph")

The key benefit of purchasing the rate limit multiplier, therefore getting an increased rate limit, isn't to stop end users from using an application. The rate limit multiplier is based on the customer's org and what the expected use would be. If a customer has dynamic scale, the info icon beside **Rate Limit** in the Overview pane indicates which tier was purchased, and the graphs in the [Rate limit utilization over time pane] reflect the applied rate limit multiplier. To purchase the rate limit multiplier, either create a support ticket or contact your customer support representative.

### Rate limit utilization over time pane

The Rate limit utilization over time pane comprises the line graph, bar graph, and timeline graph.

![Summary of the rate limit utilization over time pane](/img/RLDashboard5.png "Displays the line graph, bar graph, and timeline graph")

#### Line graph

The line graph shows the total number of requests and the number of unique IPs over the past hour for the endpoint if the **Total Requests** and **# of Unique IPs** toggle buttons are enabled. If an IP address is selected in the bar graph, the line graph also shows the traffic from that IP address.

Each data point represents how many times the endpoint was called within that one-minute window. You can select a point in the line graph to see which IPs were making requests at that time. If there's a spike in the rate limit use, you can hover over the line graph and view the number of requests and the number of unique IPs in the past hour.

#### Timeline graph

The timeline graph shows use over the last week. When a rate violation occurs, you can select a day from the past week from the drop-down menu on the timeline graph and compare the same point in time with a day from the past week.

#### Bar graph

The **Top Requests by IP** bar graph shows the top 10 IP addresses that are consuming the most traffic for the endpoint. This view enables you to check if there is a single IP or multiple IPs that are creating the spike in traffic.

Click an IP address bar once to view the traffic for that IP address on the line graph. Double-click any IP address bar to view the traffic for all the IP addresses on the line graph.

## Investigate the rate limit violation

Each graph, either by itself or combined, provides you with multiple views that display the information about the rate limit violation. You can also refer to the help information on the dashboard when you are trying to figure out the rate limit violation to see if it fits into one of the common scenarios most likely to happen.

### Combination of the line graph and bar graph view

The line graph shows usage in the past hour and allows you to focus on a particular point during the hour when an event occurred and caused a spike in the rate limit. The bar graph identifies the top 10 IP addresses that are consuming the most traffic. From there, you can obtain more data, such as observing if there is a sudden spike in the use of one IP while all the other IPs continue to have relatively normal use. You can then identify the offending IP responsible for the spike in traffic for which you should take appropriate action. Alternatively, you can conclude that there is no offending issue and that the endpoint requires a higher rate limit due to high use.

The line graph can show the number of unique IPs that are creating traffic at a given minute. For example, the line graph can show many users are signing in at the same time, perhaps to attend a company-wide meeting. By comparing the number of unique IPs to the number of unique requests, you can see almost the same number of IPs as the number of requests. This means that there are a lot of IPs creating the traffic and not just one IP consuming all the traffic.

### Combination of the line graph and timeline graph view

The timeline graph gives you an overview of use from the days in the past week so that you can drill in to other time periods from the previous week. You can select one day at a time within the past week from the drop-down menu and view use one hour at a time in the line graph. These views enable you to understand whether this rate limit was an abnormal spike in use compared to fairly regular use up to that point in time.

### Bar graph view

The bar graph compares a rogue IP or App with other IPs or Apps. For example, the bar graph can show a single rogue IP that is responsible for a spike in traffic that appears in the line graph. It can also show many users that are signing in at the same time, perhaps to attend a company-wide meeting or to check out a special offer that was just delivered in a mass email to a company's clients.

## Potential next steps

If you find that the rate limit usage is generally high, you may want to adjust your rate limit maximums. If your company is planning an upcoming event, such as an upcoming marketing campaign, you may want to figure out the rate limit capacity that you'd need. In both cases, we recommend that you contact Okta support to determine and adjust your rate limits.

If the usage is high over a long period of time, you may need to take action to lower the usage. This means that if high traffic usage points to a particular offender, you would need to inform or block the offender (such as a malfunctioning app, a bad script, or a rogue user) that is causing the traffic. For example, you can either reach out to the team that writes the script or block the user or application that is causing the traffic.
