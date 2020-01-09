---
title: Okta API Products Release Notes
---

## 2020.01.0

| Change                                                                                  | Expected in Preview Orgs |
| --------------------------------------------------------------------------------------- | ------------------------ |
| [Rate limit warnings for all API customers](#rate-limit-warnings-for-all-api-customers) | January 8, 2020          |
| [Events API endpoint rate limit added](#events-api-endpoint-rate-limit-added)           | January 8, 2020          |
| [System Log Events for user import](#system-log-events-for-user-import)                 | January 8, 2020          |

### Rate limit warnings for all API customers

All Customer Identity orgs will now see an admin console banner and receive an email notification when their org approaches its rate limit. Previously this was only available for One App and Enterprise orgs. <!-- OKTA-266774 -->

### Events API endpoint rate limit added

The `/events` API endpoint now has its own rate limit bucket for Workforce orgs. See the [Rate Limits page](/docs/reference/rate-limits/#okta-api-endpoints-and-per-minute-limits) for more information. <!-- OKTA-268018 -->

### System Log Events for user import

System Log events have been added for the start and end of each phase of the user import process. See the [Event Types catalog](/docs/reference/api/event-types/) for more information. <!-- OKTA-264709 -->
