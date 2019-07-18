---
title: Okta API Products Release Notes
---

## 2019.06.4

| Change                                                                                             | Expected in Preview Orgs |
|----------------------------------------------------------------------------------------------------|--------------------------|
| [Token expiration window increased to five years](#token-expiration-window-increased-to-five-years)| July 3, 2019             |
| [Bug Fixed in 2019.06.4](#bug-fixed-in-2019-06-4)                                                  | July 3, 2019             |

### Token expiration window increased to five years

The [refresh token expiration window](/docs/reference/api/authorization-servers/#rule-properties) has increased to a maximum of five years in custom authorization servers. <!-- OKTA-207202 -->

### Bug Fixed in 2019.06.4

* The SystemLog V1 [event type](/docs/reference/api/event-types/) `security.password_spray.detected` has been deprecated. For threat related information, see `security.threat.detected` events. (OKTA-233958)
