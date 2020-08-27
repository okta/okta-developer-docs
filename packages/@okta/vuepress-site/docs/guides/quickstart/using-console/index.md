---
title: Using the Developer Console
---

The Developer Console is the web UI that provides you with a window into your org and lets you configure and manage it. The URL to access your Developer Console consists of your Okta domain plus `-admin`, e.g., `https://dev-l33337.okta.com`.

### The Dashboard

On signing in to Developer Console, you see the Dashboard, a landing page that provides a summary of activity in your org.

The Dashboard shows statistics for:
 - Total Users 
 - Authentications
 - Failed Logins

A search bar at the top of the Dashboard lets you quickly bring up information on a specific user or app.

The latest events logged in your org's System Log are displayed in the lower part of the dashboard. The System Log records actions taken by you and any other admins, as well as ongoing events that occur for each user, like user creation, and successful or failed authentication attempts. There will be lots of events in the System Log even if you haven't done anything yet, just created your org. You can click each event to expand it and get full info for it.

In the upper-right corner of the screen, you can see the domain of the org you’re in. This can be handy if you manage multiple orgs.

The footer of the dashboard displays the version of the Okta system that you're currently running, e.g., "Version: 2020.06.4". It also displays the Okta cell your org is running in, e.g. "OK11 Cell (US)".

### Developer Console Screens

Menus take you from the Dashboard to the management screens for various aspects of your org's functionality:

| Menu          | What can I do here?                                                                                |
|---------------|----------------------------------------------------------------------------------------------------|
| Users         | Manager your end users.                                                                            |
| Applications  | Configure the connection between your Okta org and the apps you want to handle authentication for. |
| API           | Get an API token to be able to use the Okta API.                                                   |
| Workflows     | Augment Okta process flows with your own additions.                                                |
| Customization | Change end users' experience of various aspects of Okta process flows.                             |
| Settings      | Configure org-wide settings.  |     
