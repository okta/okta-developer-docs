---
title: Okta Identity Governance API release notes 2025
---

# Okta Identity Governance API release notes (2025)

Okta Identity Governance is available for both Okta Classic and Identity Engine.

## February

### Monthly release 2025.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [New system log event](#new-system-log-event) | February 5, 2025 |

#### New system log event

A new system log event, `access.request.settings.update`, now appears in the System Log when a **Request of behalf of** setting is toggled on or off in the Admin Console or when you set or change the `requestOnBehalfOfSettings` object for [Requests Settings](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Settings/#tag/Request-Settings). The event's `changeDetails` property includes the name of the app for which the setting was updated, the previous and new state of the setting, and the user who made the change. <!--OKTA-857992-->
