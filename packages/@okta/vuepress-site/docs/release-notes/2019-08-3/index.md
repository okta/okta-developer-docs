---
title: Okta API Products Release Notes
---

## 2019.08.3

| Change                                                                                         | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------|--------------------------|
| [Bugs Fixed in 2019.08.3](#bugs-fixed-in-2019-08-3)                                            | August 29, 2019          |

### Bugs Fixed in 2019.08.3

* The [Update Inline Hook call](/docs/reference/api/inline-hooks/#update-inline-hook) wasn't replacing the whole object. (OKTA-229337)

* IP addresses identified as malicious by Okta ThreatInsight were missing from SystemLog V1 (`security.threat.detected`) event messages. See the [Event Types catalog](/docs/reference/api/event-types/#catalog) for more information on this event message. (OKTA-242795)