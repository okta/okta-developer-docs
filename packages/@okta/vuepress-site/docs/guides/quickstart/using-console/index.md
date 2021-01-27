---
title: Using the Console
---

The Developer Console is the web UI that provides you with a window into your org and lets you configure and manage it. The URL to access your Developer Console consists of your Okta domain plus `-admin`, for example, `https://dev-133337-admin.okta.com`.

#### Dashboard

On signing in to Developer Console, you see the Dashboard, a landing page that provides a summary of activity in your org.

You won't yet have much to see if you just created your org, but the Dashboard shows statistics for:
 - Total Users
 - Authentications
 - Failed Logins

A search bar at the top of the Dashboard lets you quickly bring up information on a specific user or app.

#### System Log

The latest events logged in your org's System Log are displayed in the lower part of the dashboard. The System Log records actions taken by you and any other admins, as well as ongoing events that occur for each user, like user creation and authentication attempts. You can click each event to expand it and get full details.

In the upper-right corner of the screen, you can see the Okta domain of the org you’re in. This can be handy if you manage multiple orgs.

The footer of the dashboard displays the version of the Okta system that you're currently running, e.g., "Version: 2020.06.4". It also displays the Okta cell your org is running in, e.g. "OK11 Cell (US)".

#### Menus

Menus take you from the Dashboard to the management screens for various aspects of your org's functionality:

| Menu          | What can you do there?                                                                                 |
|---------------|----------------------------------------------------------------------------------------------------|
| Users         | Manage your end users.                                                                             |
| Applications  | Configure the connection between your Okta org and the apps you want to handle authentication for. |
| API           | Get an API token to be able to use the Okta API.                                                   |
| Workflows     | Augment Okta process flows with your own additions.                                                |
| Customization | Change end users' experience of various aspects of Okta process flows.                             |
| Settings      | Configure org-wide settings.  |

<NextSectionLink/>

