---
title: Monitor Okta
meta:
  - name: description
    content: An overview of monitoring and alerting capabilities in Okta. Learn about monitoring tools and integration features available in Okta.
---

# Monitor Okta

Okta offers monitoring and alerting capabilities through Okta's APIs, SDKs, and Admin Console. All [supported eventful](/docs/reference/api/event-types/) activities within your Okta organization (org) are captured and available through system logs and allow you to:

* determine connectivity status from global internet locations to your Okta org
* identify trends related to Users, Apps, Policies, and other Okta entities
* detect tasks that require action, such as unlocking a User or restarting an agent
* detect suspicious activities
* review user-reported suspicious activities
* detect and augment certain events
* avoid exceeding API usage limits
* view and block IP addresses identified by the greater Okta community as threatening
* determine the risk of an anomalous sign-in event
* confirm that validation is working

The Admin Console contains predefined reports, system log filters, and notification tools to achieve most of these tasks. If you have external commercial or custom monitoring tools, you can integrate them with your Okta org. Okta sends the integrated tools a continuous flow of event logs or alerts for specific configured events.

> **NOTE**: Your Okta org maintains a 90-day sliding window of system logs. If you need to retain earlier logs, you can download system logs for external processing or archiving before they pass the 90-day window.

## Use the Admin Console to monitor events
The Okta Admin Console provides a rich set of visuals and tools for you to monitor your Okta org.

* Use the [Dashboard](https://help.okta.com/en/prod/Content/Topics/Dashboard/Dashboard.htm) to [view your org at a glance](https://help.okta.com/en/prod/Content/Topics/Dashboard/view-your-org.htm), including the number of active users, active groups, and active SSO apps. You can also view your [org agents' status](https://help.okta.com/en/prod/Content/Topics/Dashboard/view-org-agent-status.htm), [your tasks](https://help.okta.com/en/prod/Content/Topics/Dashboard/monitor-your-tasks.htm) list, recent org changes, as well as security tips.
* Use the [Reports](https://help.okta.com/en/prod/Content/Topics/Reports/report-types.htm) page to view predefined system log reports or visuals
* Use the [System Logs](https://help.okta.com/en/prod/Content/Topics/Reports/Reports_SysLog.htm) page to filter for specific events and to view trends over time
* Use [HealthInsight](https://help.okta.com/en/prod/Content/Topics/Security/healthinsight/healthinsight.htm) to view recommendations from a recent Okta org security audit
* Use [ThreatInsight](https://help.okta.com/en/prod/Content/Topics/Security/threat-insight/ti-index.htm) to view IP addresses identified by the greater Okta community as threatening

## Integrate with external monitoring tools

You can integrate commercial log monitoring tools, such as Splunk, Sumo Logic, or Datadog, with your Okta org to monitor and analyze all your applications and web traffic. The commercial monitoring tools are typically integrated with Okta using the Okta [System Log API](/docs/reference/api/system-log/).
At a high level, the API integration process includes:

1. Obtaining an API token from your Okta org
2. Creating an Okta API service account for external integration (not required for all tools)
3. In the external monitoring tool, configure your integration properties to Okta, along with the following information:
   * Okta org domain
   * Okta API token
   * Okta API service account username and credentials (not required for all integrated tools)

These configuration properties allow the external tool to request system logs from the Okta [System Log API](/docs/reference/api/system-log/).
See [Exporting Okta Log](https://support.okta.com/help/s/article/Exporting-Okta-Log-Data) for details.

For external integration examples, refer to:

* [Splunk Add-on for Okta](https://www.okta.com/integrations/splunk-add-on-for-okta/)
* [Datadog Log Management integration](https://www.okta.com/integrations/datadog/)
* [Sumo Logic integration with Okta](https://www.okta.com/integrations/sumologic/)

> **NOTE**: During the integration setup, use the Admin Console for verification or troubleshooting purposes. Compare the system logs from the Admin Console with the system logs received in your external monitoring tool.

## Send alerts to an external service

Your organization may have an external web service that performs extra processing for specific Okta events, such as creating or deactivating a user lifecycle event. Okta provides a webhook feature called [Event Hooks](/docs/concepts/event-hooks/), where you can set up triggers at specific events in Okta to send event payloads to an external web service. Event Hooks are asynchronous and do not affect existing Okta workflows.

For a working example of an end-to-end Event Hook setup, see the [Event Hooks guide](/docs/guides/event-hook-implementation/nodejs/overview/). For a list of events that support Event Hooks, see [Event Hooks eligible event types](/docs/reference/api/event-types/?q=event-hook-eligible).

## Monitor Okta with your custom tool

You can build custom applications to monitor and analyze events in Okta using Okta SDKs and APIs.

* For a [REST API](https://developer.okta.com/code/rest/) implementation, use the [System Log API](/docs/reference/api/system-log/) to retrieve any of the system logs in your Okta org for the last 90 days
* For an [okta-sdk-nodejs](https://github.com/okta/okta-sdk-nodejs) implementation, use the [getLog()](https://github.com/okta/okta-sdk-nodejs#get-logs) method to retrieve any of the system logs in your Okta org for the last 90 days
* For an [okta-sdk-java](https://github.com/okta/okta-sdk-java) implementation, use the [getLogs()](https://github.com/okta/okta-sdk-java#list-system-logs) method to retrieve any of the system logs in your Okta org for the last 90 days

Refer to the supported [Event Types catalog](/docs/reference/api/event-types/#catalog) for the list of events you can use to filter for the system logs you are interested in.

See [Useful System Log Queries](https://support.okta.com/help/s/article/Useful-System-Log-Queries?language=en_US&_ga=2.122976834.831546547.1618838361-957571954.1617637001) for common system log query use cases.

> **NOTE**: When you test your custom monitoring tool, use the Admin Console for verification or troubleshooting purposes. Compare the system logs from the Admin Console with the system logs received in your custom tool.

## Download system logs for analysis

You can use the Admin Console to manually download CSV files of system log query results for analysis or to be sent to a data warehouse or lake. See [System Logs](https://help.okta.com/en/prod/Content/Topics/Reports/Reports_SysLog.htm).

## Enable and configure Okta ThreatInsight

The [Okta ThreatInsight](https://help.okta.com/en/prod/Content/Topics/Security/threat-insight/ti-index.htm)  feature aggregates data across Okta customers to detect malicious IP addresses that attempt credential-based attacks. You can enable ThreatInsight through the [Okta ThreatInsight Settings](https://help.okta.com/en/prod/Content/Topics/Security/threat-insight/configure-threatinsight.htm) in the Admin Console, or through the [ThreatInsight configuration API](/docs/reference/api/threat-insight/).

After ThreadInsight is enabled, Okta captures access attempts from malicious IPs in the system logs. You can also configure to block access from the malicious IPs to your Okta org.

## Monitor rate limit warnings and violations

To mitigate denial-of-service attacks and abusive actions, Okta enforces rate limits on API requests as well as other end-user inbound and outbound operations. See [Rate limit overview](/docs/reference/rate-limits/) for details.

Monitor and review the [system log events for rate limits](/docs/reference/rl-system-log-events/) to detect rate limit warnings or violations. Use the information in these event logs to investigate access spikes, abusive actions, or traffic trends. You can set up rate limit notification emails or rate limit notifications displayed in the Admin Console banner for admins. See [Set up rate limit notifications](https://help.okta.com/en/prod/Content/Topics/Settings/set-up-rate-limit-notifs.htm) for details.

## Review Okta system status

Okta provides real-time performance updates and service availability of all Okta service features at [status.okta.com](http://status.okta.com). Sign in as an administrator at this site to review system status reports specific to your Okta org. Subscribe to the [Okta Status RSS](http://feeds.feedburner.com/OktaTrustRSS) feed to receive the latest updates on service degradation and disruptions.
