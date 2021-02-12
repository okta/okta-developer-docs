---
title: Using the Console
---

The Admin Console is the web UI that provides you with a window into your org and lets you configure and manage it. The URL to access your Admin Console consists of your Okta domain plus `-admin`, for example, `https://dev-133337-admin.okta.com`.

#### Dashboard

After signing in to Admin Console, you see the Dashboard, which is a landing page that provides a summary of activity in your org.

You won't yet have much to see if you just created your org, but the Dashboard shows various statistics grouped into several different widgets. These widgets include:

- **Overview:**: Shows totals and other statistics for your org's users, groups, and apps.
- **Status:**: Lists the operation status of the Okta service and any running agents.
- **Tasks:**: Lists issues in your org that require attention. You can filter by active (default) or unsubscribed tasks.
- **Org changes:**: Displays system logs showing all the org changes in the last seven days.
- **Security Monitoring:**: Displays security-related information such as recommended security tasks and suspicious user activity.

A search bar at the top of the Dashboard lets you quickly bring up information on a specific user or app.

#### System Log

Some of the statistics on the Dashboard are derived from the org's system logs. You can access the System Log page either by clicking the  **View all** link in the **Org Changes** widget or the suspicious activity **View** link in the **Security Monitoring** widget. You can also access the System Log by selecting **Reports > System Log** from the side navigation. The System Log records actions taken by you and any other admins, as well as ongoing events that occur for each user, like user creation and authentication attempts. You can click each event to expand it and get full details.

In the global header in the upper-right corner of the page, you can view the Okta domain of the org that you’re in. This can be handy if you manage multiple orgs.

The footer of the dashboard displays the version of the Okta system that you're currently running, e.g., "Version: 2020.06.4". It also displays the Okta cell your org is running in, e.g. "OK11 Cell (US)".

#### Side navigation

The side navigation takes you from the Dashboard to the management screens for various aspects of your org's functionality:

| Menu          | What can you do there?                                                                             |
|---------------|----------------------------------------------------------------------------------------------------|
| Dashboard     | View your notifications, tasks, and get started guides for newbies.                                |
| Directory     | Manage your Okta's orgs people, groups, and related attributes.                                    |
| Applications  | Configure the connection between your Okta org and the apps you want to handle authentication for. |
| Security      | Manage the security aspects of your Okta org.                                                      |
| Workflow      | Augment Okta process flows with your own additions.                                                |
| Reports       | View your Okta org's reports and system logs.                                                      |
| Settings      | Configure org-wide settings.                                                                       |

<NextSectionLink/>
